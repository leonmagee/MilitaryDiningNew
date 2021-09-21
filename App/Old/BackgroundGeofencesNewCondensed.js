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

     bgGeo.addGeofences(myGeoFences);
    })
  }

  componentWillUnmount() {
    bgGeo.un('geofenceschange', this.onGeoFenceChange)
  }

  onGeoFenceChange(event) {
    if (event.on.length) {

      event.on.map((event) => {
        PushNotification.localNotificationSchedule({
          message: `Your are now inside the radius of ${event.identifier}`, // (required)
          date: new Date(Date.now()), // send notification now
        });
      })

    }
    if (event.off.length) {

      event.off.map((event) => {
        PushNotification.localNotificationSchedule({
          message: `Your are now outside the radius of ${event}`, // (required)
          date: new Date(Date.now()), // send notification now
        });
      })
    }
  }

  render() {
    return (
      <View></View>
    )
  }
}

mapActionsToProps = (dispatch) => ({
  setRestData(results) {
    dispatch({type: 'SET_DATA_VALUE', payload: results})
  }
})

module.exports = connect(null, mapActionsToProps)(BackgroundGeofences)
