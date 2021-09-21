import React, {Component} from 'react'
import {vw, vh} from '../Utils/helper'
import {connect} from 'react-redux'
import Settings from './Settings'
import MessHalls from './MessHalls'
import MenuPage from './MenuPage'
import MapPage from './MapPage'
import MenuBar from './MenuBar'
//import LinearGradient from 'react-native-linear-gradient'
import variables from '../Styles/Variables'
import api from '../Utils/api'
import bgGeo from 'react-native-background-geolocation'
import PushController from './PushController'
import PushNotification from 'react-native-push-notification'

//import Foo from './BackgroundGeolocationTest' //testing react-native-background-geolocation

import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';

let {width, height} = Dimensions.get('window')
height = height - 50; // make space for bottom menu bar
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null, // allows centering of content with image - otherwise image width is imported
    height: null
  },
  mainOuterWrap: {
    flex: 1,
    width: width
  },
  homeWrapOuter: {
    flex: 1
  },
  homeWrap: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'transparent'
  },
  homeTextWrap: {
    position: 'absolute',
    zIndex: 333,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 17 * vw,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    fontFamily: 'Black Ops One',
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  menuText: {
    fontSize: 27,
    fontFamily: 'Black Ops One',
    color: '#FFF',
    backgroundColor: 'transparent'
  }
});

class Homepage extends Component {

  constructor(props) {
    super(props)

    console.log('homepage is loading...')

    //     BackgroundGeolocation.on('geofence', function(params) {
    //       console.log('- Geofence event: ', params.identifier);
    //     });
    //     // Add a geofence
    //     BackgroundGeolocation.addGeofences({
    //       identifier: 'HOME',
    //       radius: 200,
    //       latitude: 45.51818958022214,
    //       longitude: -73.61409989192487,
    //       notifyOnEntry: true,
    //       notifyOnExit: true
    //     });
    //     // Remove a geofence
    //     //bgGeo.removeGeofence("HOME");
    //     // Fetch geofences
    //     BackgroundGeolocation.getGeofences(function(geofences) {
    //       console.log('- Geofences: ', geofences);
    //     });
    //
    //     BackgroundGeolocation.configure({
    //   desiredAccuracy: 0,
    //   distanceFilter: 50,
    // }, function(state) {
    //   console.log('- BackgroundGeolocation configured and ready');
    //   if (!state.enabled) {  // <-- current state provided to callback
    //     BackgroundGeolocation.start();
    //   }
    // });

    // Use #setConfig if you need to change options after you've executed #configure

    // BackgroundGeolocation.setConfig({
    //   desiredAccuracy: 10,
    //   distanceFilter: 10
    // }, function() {
    //   console.log('set config success');
    // }, function() {
    //   console.log('failed to setConfig');
    // });

  }

  componentDidMount() {

    //bgGeo.on('location', this.onLocation)

    // bgGeo.on('geofenceschange', function(event) {
    //   console.log('geofenceschange fired! ', event);
    // });

    bgGeo.on('geofenceschange', this.onGeoFenceChange)

    const myConfig = {
      desiredAccuracy: 0,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      // turning debug to false gets rid of the sounds
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      //logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,
      maxDaysToPersist: 0
    }

    bgGeo.configure(myConfig, (state) => {
      console.log('- ready to use');
      if (!state.enabled) {
        bgGeo.startGeofences();
      }
    });

    api.getMenus().then((res) => {
      this.props.setRestData(res)

      const myGeoFences = res.map((item, index) => {
        if (item.coordinates.latitude && item.coordinates.longitude) {
          console.log('lat:', item.coordinates.latitude, 'long:', item.coordinates.longitude)
          return ({
            identifier: item.name,
            radius: 50,
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
            notifyOnEntry: true,
            notifyOnExit: true
          })
        }
      })

      //console.log('mygeobitches?', myGeoFences)

      // Listen for geofence events.
      // bgGeo.on('geofence', function(params) {
      //   console.log('- Geofence event: ', params.identifier);
      // });
      // Add a geofence
      bgGeo.addGeofences(myGeoFences);
      // bgGeo.addGeofences([
      //   {
      //     identifier: 'HOME',
      //     radius: 200,
      //     latitude: 45.51818958022214,
      //     longitude: -73.61409989192487,
      //     notifyOnEntry: true,
      //     notifyOnExit: true
      //   }
      // ]);
      // Remove a geofence
      //bgGeo.removeGeofence("HOME");
      // Fetch geofences
      bgGeo.getGeofences(function(geofences) {
        console.log('- Geofences: ', geofences);
      });
      //
      // console.log('results res is', res)
    })
  }

  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    //bgGeo.un('location', this.onLocation)
    bgGeo.un('geofenceschange', this.onGeoFenceChange)
    // bgGeo.un('error', this.onError);
    // bgGeo.un('motionchange', this.onMotionChange);
    // bgGeo.un('activitychange', this.onActivityChange);
    // bgGeo.un('providerchange', this.onProviderChange);
  }

  // onLocation(location) {
  //   console.log('- [js]location: ', JSON.stringify(location));
  // }

  onGeoFenceChange(event) {
    console.log('geofenceschange fired! ', event);
    if (event.on.length) {

      event.on.map((event) => {
        PushNotification.localNotificationSchedule({
          message: `Your are now inside the radius of ${event.identifier}`, // (required)
          date: new Date(Date.now()), // send notification now
        });
      })

      // const mess_on_name = event.on[0].identifier
      // console.log('you are now close to mess hall', mess_on_name)
      // PushNotification.localNotificationSchedule({
      //   message: `Your are now inside the radius of ${mess_on_name}`, // (required)
      //   date: new Date(Date.now()), // send notification now
      // });
    }
    if (event.off.length) {

      event.off.map((event) => {
        PushNotification.localNotificationSchedule({
          message: `Your are now outside the radius of ${event}`, // (required)
          date: new Date(Date.now()), // send notification now
        });
      })

      // const mess_off_name = event.off[0]
      // console.log('you are now far away from mess hall', mess_off_name)
      // PushNotification.localNotificationSchedule({
      //   message: `Your are now outside the radius of ${mess_off_name}`, // (required)
      //   date: new Date(Date.now()), // send notification now
      // });
    }

  }

  render() {

    if (this.props.currentPage === 'settings') {
      var currentActivePage = (<Settings/>)
    } else if (this.props.currentPage === 'mess_halls') {
      var currentActivePage = (<MessHalls/>)
    } else if (this.props.currentPage === 'map') {
      var currentActivePage = (<MapPage/>)
    } else if (this.props.currentPage === 'menu_page') {
      var currentActivePage = (<MenuPage/>)
    } else {
      var currentActivePage = (
        <View style={styles.homeWrapOuter}>
          <View style={styles.homeWrap}>
            <Image source={require('../Assets/Images/home-image.png')} style={styles.imageContainer}></Image>
            <View style={[
              styles.homeTextWrap, {
                width: width,
                height: height
              }
            ]}>
              <Text style={styles.homeText}>MILITARY</Text>
              <Text style={styles.homeText}>DINING</Text>
            </View>
            <MenuBar menuLinks={{
              home: false,
              settings: true,
              mess_halls: true,
              map: true
            }}/>
          </View>
          <PushController />
        </View>
      )
    }

    return (
      <View style={styles.mainOuterWrap}>
        {currentActivePage}
      </View>
    )
  }
}

mapStateToProps = (state) => ({currentPage: state.currentPage})

mapActionsToProps = (dispatch) => ({
  setRestData(results) {
    dispatch({type: 'SET_DATA_VALUE', payload: results})
  }
})

module.exports = connect(mapStateToProps, mapActionsToProps)(Homepage)
