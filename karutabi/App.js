import React, {useState} from 'react';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { StyleSheet, Button, View, Text, Image, Dimensions, Alert, Modal } from 'react-native';

const Map = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const state = {
    region: {
      latitude: 35.020313,
      longitude: 135.641039,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    urlTemplate: 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.jpg',
    stationMarkers: [
      {
        key: 'kameoka',
        latlng: {
          latitude: 35.01347848079564,
          longitude: 135.6067642423317,
        },
        title: 'トロッコ亀岡駅',
      },{
        key: 'hodukyou',
        latlng: {
          latitude: 35.02616425694208,
          longitude: 135.64593657892797,
        },
        title: 'トロッコ保津峡駅',
      },{
        key: 'arasiyama',
        latlng: {
          latitude: 35.01743215517192,
          longitude: 135.67021796431797,
        },
        title: 'トロッコ嵐山駅',
      },{
        key: 'sagaarasiyama',
        latlng: {
          latitude: 35.01925934961129,
          longitude:  135.6811521629396,
        },
        title: '嵯峨嵐山駅',
      },
    ],
    dmyMarkers: [
      {
        key: 'img1',
        latlng: {
          latitude: 35.018863,
          longitude: 135.680444,
        },
        title: 'img1',
      },{
        key: 'img2',
        latlng: {
          latitude: 35.020183,
          longitude: 135.622272,
        },
        title: 'img2',
      },{
        key: 'img3',
        latlng: {
          latitude: 35.013552,
          longitude: 135.607080,
        },
        title: 'img3',
      },
    ]}
  return (
    <View style={styles.display}>
      <View style={styles.header}>
        <Image source={require('./img/logo.png')} style={{height: 35, width: 120}} />
      </View>
      <View style={styles.container}>
        <View style={styles.title}>
            <Text style={{color: '#572E12'}}>関西地方 京都府</Text>
            <Text style={styles.large}>嵯峨野トロッコ列車</Text>
        </View>
      </View>
      <MapView
      style={styles.map}
      region={state.region}
      >
      <UrlTile
          urlTemplate={state.urlTemplate}
          maximumZ={19}
          mapType={'none'}
        />

        {state.stationMarkers.map((marker) => (
          <>
          <Marker
            key={marker.key}
            coordinate={marker.latlng}
            title={marker.title}
          >
          </Marker>
          </>
        ))}
        {
        state.dmyMarkers.map((marker) => (
          <>
          <Marker
            key={marker.key}
            coordinate={marker.latlng}
            title={marker.title}
            pinColor={"blue"}
            onPress={() => setModalVisible(true)}
          >
          </Marker>
          </>
        ))
        
        /*
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dfe12033ab09e4fffbdd8133116d2195&text=%E5%B5%AF%E5%B3%A8%E9%87%8E%E3%83%88%E3%83%AD%E3%83%83%E3%82%B3&sort=relevance&content_type=1&has_geo=true&extras=geo&per_page=50&format=json&nojsoncallback=1').then((response)=>{return response.text()}).then((text)=>{
          const date = JSON.parse(text).photos.photo;
          console.log(text,date);
          /*
          date.map((marker)=>{
            <>
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.title}
              pinColor={"blue"}
              onPress={() => setModalVisible(true)}
            >
            </Marker>
            </>
          })
          
        })
        */
        }
      </MapView>

      <View>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={require('./img/sampleImage.jpg')} style={{height: 166, width: 249}} />
              <Button title="閉じる" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={{color: '#572E12'}}>保津川沿いの自然や渓谷美が、春の桜、夏の新緑、秋の紅葉、冬の枯野や時には雪景色と、四季それぞれに違った風景を楽しめます。</Text>
        </View>
        <View style={styles.buttom}>
          <Text style={{color: '#572E12'}}>公式サイトで詳しく見る</Text>
          <Button title="嵯峨野観光鉄道: トロッコ列車"/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  display: {
    backgroundColor: '#FEFBF5',
    height: "100%",
    width: "100%",
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  container: {
    width: "90%",
    marginStart: "auto",
    marginEnd: "auto",
  },
  title:{
    fontSize: 16,
  },
  large: {
    fontSize: 24,
    color: '#572E12',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 485,
    alignItems: 'center',
    marginTop: 25,
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    marginTop: -32,
  },
  text: {
    fontSize: 16,
    marginTop: 25,
  },
  buttom: {
    alignItems: 'flex-end',
    marginTop: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width:300,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Map;
