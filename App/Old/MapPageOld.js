/**
* @todo remove activity indicator?
* @todo initial background color of map?
* @todo add map marker of known locationl (just one to start?)
* @todo how to make zooming happen smoothly?
* @todo does tracking work now?
* @todo instal geofence package
**/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  View, Text,
  //Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import MapView from 'react-native-maps'
import SvgElement from './SvgElement'
//import {ForkIcon, CurrentMarker} from '../SVG/SvgIcons'
import {ForkIcon} from '../SVG/SvgIcons'
import {variables} from '../Styles/Variables'
//import SampleData from '../Data/Data'

// const messHallCoordinates = []
// SampleData.map((item) => {
//   item.coordinates.svg_key = ForkIcon
//   messHallCoordinates.push(item.coordinates)
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variables.brandPrimary
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: variables.brandPrimary
  },
  radius: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(34,170,161,0.4)',
    backgroundColor: 'rgba(34,170,161,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  marker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: variables.brandSixth,
    borderWidth: 1,
    borderColor: '#FFF',
    overflow: 'hidden'
  },
  indicatorWrap: {
    flex: 1,
    backgroundColor: variables.brandPrimary,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

const {width, height} = Dimensions.get('window')

//const SCREEN_WIDTH = width
//const SCREEN_HEIGHT = height
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class MapPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initalPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      isLoading: true
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)

      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({
        initalPosition: initialRegion,
        markerPosition: {
          latitude: lat,
          longitude: long
        },
        isLoading: false
      })

      // this.setState({initalPosition: initialRegion})
      // this.setState({markerPosition: initialRegion})
      // this.setState({isLoading: false})
    }, (error) => alert(JSON.stringify(error)), {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      accuracy: 1
    })

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)

      // let lastRegion = {
      //   latitude: lat,
      //   longitude: long,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA
      // }

      this.setState({
        markerPosition: {
          latitude: lat,
          longitude: long
        }
      })

      //this.setState({initalPosition: lastRegion})
      //this.setState({markerPosition: lastRegion})
    }, (error) => alert(JSON.stringify(error)), {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      accuracy: 1
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {

    if (this.props.restData) {

      var mess_hall_markers = this.props.restData.map((item, index) => {
        if (item.coordinates.latitude && item.coordinates.longitude) {
          return (
            <MapView.Marker key={index} coordinate={{
              latitude: parseFloat(item.coordinates.latitude),
              longitude: parseFloat(item.coordinates.longitude)
            }} title={item.name} description={item.address}>
              <SvgElement svg_data={ForkIcon}/>
            </MapView.Marker>
          )
        }
      })
    } else {
      var mess_hall_markers = <View></View>
    }

    if (this.state.initalPosition.latitude > 0) {
      return (
        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={this.state.initalPosition}>
            <MapView.Marker coordinate={this.state.markerPosition}>
              <View style={styles.radius}>
                <View style={styles.marker}></View>
              </View>
            </MapView.Marker>
            {mess_hall_markers}
          </MapView>
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

mapStateToProps = (state) => ({restData: state.restData})

module.exports = connect(mapStateToProps)(MapPage)
