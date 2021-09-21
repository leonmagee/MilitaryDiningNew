import React, {Component} from 'react'
import {View, Text, Animated, StyleSheet, ActivityIndicator} from 'react-native'
import MapView from 'react-native-maps'
import SvgElement from './SvgElement'
import {ForkIcon, CurrentMarker} from '../SVG/SvgIcons'
import {variables} from '../Styles/Variables'
import SampleData from '../Data/Data'

const messHallCoordinates = []
SampleData.map((item) => {
  item.coordinates.svg_key = ForkIcon
  messHallCoordinates.push(item.coordinates)
})

console.log('ZZZ',messHallCoordinates)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  indicatorWrap: {
    flex: 1,
    backgroundColor: variables.brandPrimary,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class MapSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coords_ready: false,
      is_loading: true,
      map_wrapper: (
        <View></View>
      ),
      region: {
        latitude: 32.759143,
        longitude: -117.146394,
        //latitudeDelta: 0.0922,
        //longitudeDelta: 0.0421
        latitudeDelta: 0.005,
        longitudeDelta: 0.0021
      }
    }
  }

/**
* not getting state here/??
**/
  onRegionChange(region, gpsAccuracy) {
    console.log('region has changed')
    /**
    * Not sure if anything needs to happen here...
    **/
    this.setState({
      region: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
      //gpsAccuracy: gpsAccuracy
  });
  }

  componentDidMount() {
    // console.log('component did mount?')
    //
    // this.WatchID = navigator.geolocation.watchPosition((position) => {
    //   let region = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421
    //   }
    //   //this.onRegionChange(region, position.coords.accuracy)
    // })

    this.WatchID = navigator.geolocation.getCurrentPosition((position) => {
      /**
      * the region might do the centering here... so that would actually be good?
      **/
      let new_region = this.state.region
      new_region.latitude = position.coords.latitude
      new_region.longitude = position.coords.longitude
      let local_coords = {latitude: position.coords.latitude, longitude: position.coords.longitude, svg_key: CurrentMarker}
      messHallCoordinates.push(local_coords)
      //this.setState({region: new_region, coords_ready: true, error: null, is_loading: false});
      this.setState({region: new_region, coords_ready: true, is_loading: false});
      //console.log(this.state)

      /**
* Here I need to do multiple markers - several for mess halls, and one for the current user location.
* The notifications will then be triggered based on proximity to a certain location.
**/

      // marker based on actuall user coordinates - these will be combined into an array
      // with the mess hall marker coordinates - I will need some dat in the array to define them as differnet...

      // <MapView.Marker coordinate={{
      //   latitude: this.state.region.latitude,
      //   longitude: this.state.region.longitude
      // }} title='Mess Hall Title' description='Mess Hall description'>
      //   <SvgElement svg_data={ForkIcon}/>
      // </MapView.Marker>

      /**
      * this will need to re-render as we move around...
      **/

      let map_wrapper_new = (
        <MapView.Animated style={styles.map} region={this.state.region} onRegionChange={this.onRegionChange}>
          {messHallCoordinates.map((item, index) => (
            <MapView.Marker key={index} coordinate={{
              latitude: item.latitude,
              longitude: item.longitude
            }} title='Mess Hall Title' description='Mess Hall description'>
              <SvgElement svg_data={item.svg_key}/>
            </MapView.Marker>
          ))}
        </MapView.Animated>
      )

      // let map_reagion_tester = (
      //   <View>
      //     <Text>Lat: {position.coords.latitude}
      //       - Long: {position.coords.longitude}</Text>
      //   </View>
      // )
      this.setState({stateMapWrapper: map_wrapper_new})
      this.onRegionChange(new_region, position.coords.accuracy)

    }, (error) => this.setState({error: error.message}), {
      enableHighAccuracy: true,
      //enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000
    },);

    // console.log('coords ready?', this.state.coords_ready)
    // if (this.state.coords_ready) {
    //   let map_wrapper_new = (
    //     <MapView style={styles.map} region={this.state.region} onRegionChange={this.onRegionChange}>
    //       <MapView.Marker coordinate={{
    //         latitude: this.state.region.latitude,
    //         longitude: this.state.region.longitude
    //       }} title='Mess Hall Title' description='Mess Hall description'>
    //         <SvgElement svg_data={ForkIcon}/>
    //       </MapView.Marker>
    //     </MapView>
    //   )
    //   this.setState({
    //     stateMapWrapper: map_wrapper_new
    //   })
    // }
    //if (!this.state.coords_ready) {
    let map_wrapper_waiting = (
      <View style={styles.indicatorWrap}>
        <ActivityIndicator animating={this.state.isLoading} color="#FFF" size="large"></ActivityIndicator>
      </View>
    )
    this.setState({stateMapWrapper: map_wrapper_waiting})
  }

  //}

  render() {
    // console.log('coords ready?', this.state.coords_ready)
    // if (this.state.coords_ready) {
    //   let map_wrapper = (
    //     <MapView style={styles.map} region={this.state.region} onRegionChange={this.onRegionChange}>
    //       <MapView.Marker coordinate={{
    //         latitude: this.state.region.latitude,
    //         longitude: this.state.region.longitude
    //       }} title='Mess Hall Title' description='Mess Hall description'>
    //         <SvgElement svg_data={ForkIcon}/>
    //       </MapView.Marker>
    //     </MapView>
    //   )
    // }
    // else if (!this.state.coords_ready) {
    //   map_wrapper = (
    //     <View style={styles.indicatorWrap}>
    //       <ActivityIndicator animating={this.state.isLoading} color="#FFF" size="large"></ActivityIndicator>
    //     </View>
    //   )
    // }
    return (
      <View style={styles.container}>
        {this.state.stateMapWrapper}
      </View>
    )
  }
}

module.exports = MapSearch;
