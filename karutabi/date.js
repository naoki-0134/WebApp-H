import React from 'react';
import { Marker } from 'react-native-maps';

export default class Date extends React.Component {
    state = {markers: []};
    componentWillMount(){
        return fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dfe12033ab09e4fffbdd8133116d2195&text=%E5%B5%AF%E5%B3%A8%E9%87%8E%E3%83%88%E3%83%AD%E3%83%83%E3%82%B3&sort=relevance&content_type=1&has_geo=true&extras=geo&per_page=50&format=json&nojsoncallback=1').then(response=>{return response.text()}).then(text=>{
            const date = JSON.parse(text).photos.photo;
            this.setState({
                key: date.id,
                latlng: {latitude: date.latitude, longitude: date.longitude},
                img: "<Image style={{height: 50, width: 100}} resizeMode='contain' source='http://farm"+date.farm+".staticflickr.com/"+date.server+"/"+date.id+"_"+date.secret+".jpg' />"
            })
        })
    }
    render(){
        return (
            <>
            {this.state.markers.map(marker => (
                <>
                <Marker
                  key={marker.key}
                  coordinate={{latitude: marker.latitude,longitude: marker.longitude}}
                  onPress={( e ) => {
                    e.stopPropagation();
                    //Alert.alert("success")
                  }}
                />
                </>
              ))}
            </>
        )
    }
}