import React, {Component} from 'react'
import {connect} from 'react-redux'
import api from '../Utils/api'
import bgGeo from 'react-native-background-geolocation'
import PushController from './PushController'
import PushNotification from 'react-native-push-notification'

import {View} from 'react-native';


class BackgroundGeofences extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {


    bgGeo.on('geofenceschange', this.onGeoFenceChange)

    const myConfig = {
      desiredAccuracy: 0,
      distanceFilter: 10,
      stopTimeout: 1,
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,
      maxDaysToPersist: 0
    }

    bgGeo.configure(myConfig, (state) => {
      if (!state.enabled) {
        bgGeo.startGeofences();
      }
    });

    api.getMenus().then((res) => {
      this.props.setRestData(res)

      const myGeoFences = res.map((item, index) => {
        if (item.coordinates.latitude && item.coordinates.longitude) {
          //console.log('lat:', item.coordinates.latitude, 'long:', item.coordinates.longitude)
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


      // this.plugin.addGeofences(geofences, () => {
      //   this.playSound('ADD_GEOFENCE');
      //   callback();
      // }, () => {
      //   callback();
      // });
      //bgGeo.removeGeofence("Fudruckers"); // spelling???
      // bgGeo.removeGeofence("Lestats Normal Heights");
      // bgGeo.removeGeofence("San Fran Driving");
      // bgGeo.removeGeofence("Lestats On Park");
      // bgGeo.removeGeofence("Riverfront");
      // bgGeo.removeGeofence("Coffee Bean and Teal Leaf");
      // bgGeo.removeGeofence("Holsem Coffee");

     bgGeo.addGeofences(myGeoFences);
     //bgGeo.removeGeofences(myGeoFences);


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
      /** maybe cuaseing error */
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
    //console.log('geofenceschange fired! ', event);
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
    return (
      <View></View>
    )
  }
}

//mapStateToProps = (state) => ({currentPage: state.currentPage})

mapActionsToProps = (dispatch) => ({
  setRestData(results) {
    dispatch({type: 'SET_DATA_VALUE', payload: results})
  }
})

module.exports = connect(null, mapActionsToProps)(BackgroundGeofences)
