import React, {Component} from 'react'
import {View, Text, Animated, StyleSheet, ActivityIndicator} from 'react-native'
import MapView from 'react-native-maps'
import SvgElement from './SvgElement'
import {ForkIcon, CurrentMarker} from '../SVG/SvgIcons'
import {variables} from '../Styles/Variables'
//import SampleData from '../Data/Data'

//const messHallCoordinates = []
// SampleData.map((item) => {
//   item.coordinates.svg_key = ForkIcon
//   messHallCoordinates.push(item.coordinates)
// })

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
  },
  sampleTextWrap: {
    zIndex: 1000000,
    backgroundColor: '#F7F7F7',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 5,
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  sampleText: {
    color: '#333',
    fontWeight: 'bold'
  }
});

class MapSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //coords_ready: false,
      is_loading: true,
      // map_wrapper: (
      //   <View></View>
      // ),
      region: null,
      gpsAccuracy: null,
      //recommendations: [],
      //lookingFor: null,
      //headerLocation: null,
      //last4sqCall: null
      // region: {
      //   latitude: 32.759143,
      //   longitude: -117.146394,
      //   //latitudeDelta: 0.0922,
      //   //longitudeDelta: 0.0421
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.0021
      // }
    }
  }

  onRegionChange(region, gpsAccuracy) {
    console.log('region has changed!', gpsAccuracy)
    this.setState({
      region: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    });
  }

  componentWillMount() {

    this.watchID = navigator.geolocation.watchPosition((position) => {
      //console.log('we made it this far???', position.coords.accuracy)
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 *1.5,
        longitudeDelta: 0.00421 *1.5
      }

      this.onRegionChange(region, position.coords.accuracy);
    }, (error) => alert(error.message), {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000
    })

    // this.WatchID = navigator.geolocation.getCurrentPosition((position) => {
    //   let new_region = this.state.region
    //   new_region.latitude = position.coords.latitude
    //   new_region.longitude = position.coords.longitude
    //
    //   /**
    //   * set current map marker as
    //   **/
    //   let local_coords = {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     svg_key: CurrentMarker
    //   }
    //   //messHallCoordinates.push(local_coords)
    //   this.setState({region: new_region, coords_ready: true, is_loading: false});
    //
    //   let map_wrapper_new = (
    //     <MapView.Animated style={styles.map} region={this.state.region} onRegionChange={() => this.onRegionChange}>
    //     <MapView.Circle center={this.state.region}
    //                     radius={gpsAccuracy*1.5}
    //                     strokeWidth={0.5}
    //                     strokeColor="rgba(66, 180, 230, 1)"
    //                     fillColor="rgba(66, 180, 230, 0.2)"
    //                     />
    //
    //     <MapView.Circle center={this.state.region}
    //                     radius={5}
    //                     strokeWidth={0.5}
    //                     strokeColor="rgba(66, 180, 230, 1)"
    //                     fillColor="rgba(66, 180, 230, 1)"
    //                     />
    //     </MapView.Animated>
    //   )
    //
    //   this.setState({stateMapWrapper: map_wrapper_new})
    //   this.onRegionChange(new_region, position.coords.accuracy)
    //
    // }, (error) => this.setState({error: error.message}), {
    //   //enableHighAccuracy: true,
    //   enableHighAccuracy: false,
    //   timeout: 20000,
    //   maximumAge: 1000
    // },);

    // let map_wrapper_waiting = (
    //   <View style={styles.indicatorWrap}>
    //     <ActivityIndicator animating={this.state.isLoading} color="#FFF" size="large"></ActivityIndicator>
    //   </View>
    // )
    // this.setState({stateMapWrapper: map_wrapper_waiting})
    //        <View style={styles.sampleTextWrap}><Text style={styles.sampleText}>{this.state.region.latitude} / {this.state.region.longitude}</Text></View>

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {

    if (this.state.region) {
      return (
        <View style={styles.container}>
          <View style={styles.sampleTextWrap}>
            <Text style={styles.sampleText}>{this.state.region.latitude}
              / {this.state.region.longitude}</Text>
          </View>

          <MapView.Animated style={styles.map} initialRegion={this.state.region} onRegionChange={() => this.onRegionChange}>
            <MapView.Circle center={this.state.region} radius={this.state.gpsAccuracy * 1.5} strokeWidth={0.5} strokeColor="rgba(66, 180, 230, 1)" fillColor="rgba(66, 180, 230, 0.2)"/>

            <MapView.Circle center={this.state.region} radius={5} strokeWidth={0.5} strokeColor="rgba(66, 180, 230, 1)" fillColor="rgba(66, 180, 230, 1)"/>
          </MapView.Animated>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.indicatorWrap}>
            <ActivityIndicator animating={this.state.isLoading} color="#FFF" size="large"></ActivityIndicator>
          </View>
        </View>
      )
    }

  }
}

module.exports = MapSearch;
