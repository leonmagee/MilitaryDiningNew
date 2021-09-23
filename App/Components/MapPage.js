import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import SvgElement from './SvgElement';
import { ForkIcon } from '../SVG/SvgIcons';
import { variables } from '../Styles/Variables';
import Footer from './Footer';
import SampleData from '../Data/Data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: variables.brandPrimary,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: variables.brandPrimary,
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
    overflow: 'hidden',
  },
  marker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: variables.brandSixth,
    borderWidth: 1,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  indicatorWrap: {
    flex: 1,
    backgroundColor: variables.brandPrimary,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initalPosition: {
        latitude: 32.759143,
        longitude: -117.146394,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        locationWorking: false,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
      isLoading: true,
    };
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       /**
  //        * Then the inital position should be for the maps
  //        */
  //       this.setState({
  //         locationWorking: true,
  //       });

  //       let lat = parseFloat(position.coords.latitude);
  //       let long = parseFloat(position.coords.longitude);

  //       let initialRegion = {
  //         latitude: lat,
  //         longitude: long,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       };
  //       this.setState({
  //         initalPosition: initialRegion,
  //         markerPosition: {
  //           latitude: lat,
  //           longitude: long,
  //         },
  //         isLoading: false,
  //       });
  //     },
  //     error => {
  //       /**
  //        * Set default location if no geolocation
  //        */
  //       let initialRegion = {
  //         latitude: 33.230148,
  //         longitude: -117.381126,
  //         latitudeDelta: LATITUDE_DELTA,
  //         longitudeDelta: LONGITUDE_DELTA,
  //       };
  //       this.setState({
  //         initalPosition: initialRegion,
  //         isLoading: false,
  //       });
  //     },
  //   );

  //   // (error) => alert(JSON.stringify(error)), { // error callback
  //   //   enableHighAccuracy: true,
  //   //   timeout: 20000,
  //   //   maximumAge: 1000,
  //   //   accuracy: 1
  //   // }

  //   this.watchID = navigator.geolocation.watchPosition(
  //     position => {
  //       let lat = parseFloat(position.coords.latitude);
  //       let long = parseFloat(position.coords.longitude);

  //       this.setState({
  //         markerPosition: {
  //           latitude: lat,
  //           longitude: long,
  //         },
  //       });
  //     },
  //     null,
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 35000,
  //       maximumAge: 1000,
  //       accuracy: 1,
  //     },
  //   );
  // }

  //(error) => alert(JSON.stringify(error)) replaced with null

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }

  render() {
    if (SampleData) {
      var mess_hall_markers = SampleData.map((item, index) => {
        if (item.coordinates.latitude && item.coordinates.longitude) {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: parseFloat(item.coordinates.latitude),
                longitude: parseFloat(item.coordinates.longitude),
              }}
              title={item.name}
              description={item.address}>
              <SvgElement svg_data={ForkIcon} />
            </MapView.Marker>
          );
        }
      });
    } else {
      var mess_hall_markers = <View />;
    }
    // if (this.props.restData) {
    //   var mess_hall_markers = this.props.restData.map((item, index) => {
    //     if (item.coordinates.latitude && item.coordinates.longitude) {
    //       return (
    //         <MapView.Marker
    //           key={index}
    //           coordinate={{
    //             latitude: parseFloat(item.coordinates.latitude),
    //             longitude: parseFloat(item.coordinates.longitude),
    //           }}
    //           title={item.name}
    //           description={item.address}>
    //           <SvgElement svg_data={ForkIcon} />
    //         </MapView.Marker>
    //       );
    //     }
    //   });
    // } else {
    //   var mess_hall_markers = <View />;
    // }

    if (this.state.locationWorking) {
      var user_location_marker = (
        <MapView.Marker coordinate={this.state.markerPosition}>
          <View style={styles.radius}>
            <View style={styles.marker} />
          </View>
        </MapView.Marker>
      );
    } else {
      var user_location_marker = <View />;
    }

    if (this.state.initalPosition.latitude > 0) {
      var FinalMapArea = (
        <View style={styles.container}>
          <MapView style={styles.map} initialRegion={this.state.initalPosition}>
            {user_location_marker}
            {mess_hall_markers}
          </MapView>
        </View>
      );
    } else {
      var FinalMapArea = (
        <View style={styles.container}>
          <View style={styles.indicatorWrap}>
            <ActivityIndicator
              animating={this.state.isLoading}
              color="#FFF"
              size="large"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {FinalMapArea}
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({ restData: state.restData });

module.exports = connect(mapStateToProps)(MapPage);
