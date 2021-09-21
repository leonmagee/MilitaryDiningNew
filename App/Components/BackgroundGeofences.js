import React, {Component} from 'react'
import {connect} from 'react-redux'
import api from '../Utils/api'
import bgGeo from 'react-native-background-geolocation'
import PushController from './PushController'
import PushNotification from 'react-native-push-notification'

import {View, AsyncStorage} from 'react-native';


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
      //debug: true,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,
      maxDaysToPersist: 0
    }

    bgGeo.configure(myConfig, (state) => {
      if (!state.enabled) {
        bgGeo.startGeofences();
      }

      api.getMenus().then((res) => {
        this.props.setRestData(res)
  
        res.map((item, index) => {
          if (item.coordinates.latitude && item.coordinates.longitude) {

            bgGeo.addGeofence({
              identifier: item.name,
              radius: 150,
              latitude: item.coordinates.latitude,
              longitude: item.coordinates.longitude,
              notifyOnEntry: true,
              notifyOnExit: true
            });

          }
        })
      })


      api.getMenuItems().then((res) => {
        this.props.setRestMenuItemData(res)
      })

    })

    //bgGeo.removeGeofence("Lestats On Park");

    // bgGeo.getGeofences(function(geofences) {
    //   //const testdump = JSON.stringify(geofences)
    //   //console.dir(testdump);
    //   console.log('- Geofences: ', geofences);
    // });



    // get initia favorite menu items
    AsyncStorage.getItem('@FavoritesArray').then((value) => {

      if (value) {

        var currentArray = JSON.parse(value)

      } else {

        var currentArray = []
      }

      this.props.setCurrentFavorites(currentArray)

    })


    // get initia favorite menu items
    AsyncStorage.getItem('@CurrentEatsArray').then((value) => {

      if (value) {

        var currentArray = JSON.parse(value)

      } else {

        var currentArray = []
      }

      this.props.setCurrentMeals(currentArray)

    })


    AsyncStorage.getItem('@UserDailyCalories').then((value) => {

      if (value) {

        var currentValue = parseInt(value)

      } else {

        var currentValue = '. . .'
      }

      this.props.setDailyCalories(currentValue)

    })


    





  }

  componentWillUnmount() {
    bgGeo.un('geofenceschange', this.onGeoFenceChange)
  }

  onGeoFenceChange(event) {
    if (event.on.length) {

      event.on.map((event) => {

      /**
       * 1. check to see if a recent notificaion was sent (records kept in storage)
       * 2. if there was, do nothing
       * 3. if not, save to asyncstorage and send notification
       */
        const event_name = event.identifier.replace( / /g, '_')
        const storage_name = '@' + event_name
        //console.log( 'store name', storage_name)

        AsyncStorage.getItem(storage_name).then((value) => {
          const current_date = Date.now()
          const current_date_string = current_date.toString()
          const value_number = parseInt(value)
          const time_difference = (60 * 5 * 1000)
          if (!value || (current_date > (value_number + time_difference))) {
            // console.log( 'lets save data and send notification...')
            // console.log('current time', current_date)
            // console.log('saved value time', value_number)
            // console.log('event name', storage_name)
            AsyncStorage.setItem(storage_name, current_date_string)
            PushNotification.localNotificationSchedule({
              message: `Your are now close to ${event.identifier}. Use Military Dining to see menu details`, // (required)
              date: new Date(Date.now()), // send notification now
            });
            
          } 
          // else {
          //   console.log( 'we do nothing...')
          //   console.log('current time', current_date)
          //   console.log('saved value time', value_number)
          //   console.log('event name', storage_name)
          // }
        }).done()



      })

    }
    // if (event.off.length) {

    //   event.off.map((event) => {
    //     PushNotification.localNotificationSchedule({
    //       message: `Your are now outside the radius of ${event}`, // (required)
    //       date: new Date(Date.now()), // send notification now
    //     });
    //   })
    // }
  }

  render() {
    return (
      <View>
        <PushController />
      </View>
    )
  }
}

mapActionsToProps = (dispatch) => ({
  setRestData(results) {
    dispatch({type: 'SET_DATA_VALUE', payload: results})
  },
  setRestMenuItemData(results) {
    dispatch({type: 'SET_MENU_ITEMS_DATA_VALUE', payload: results})
  },
  setCurrentFavorites(results) {
    dispatch({type: 'SET_FAVORITES', payload: results})
  },
  setCurrentMeals(results) {
    dispatch({type: 'SET_MEALS', payload: results})
  },
  setDailyCalories(results) {
    dispatch({type: 'SET_DAILY_CALORIES', payload: results})
  },
})

module.exports = connect(null, mapActionsToProps)(BackgroundGeofences)
