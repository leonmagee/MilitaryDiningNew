import React, {Component} from 'react'
import {connect} from 'react-redux'
import PushController from './PushController'
import Settings from './Settings'
import variables from '../Styles/Variables'
import api from '../Utils/api'
import bgGeo from "react-native-background-geolocation";
import PushNotification from 'react-native-push-notification'

import {StyleSheet, Text, View, Picker, AppState} from 'react-native';

const styles = StyleSheet.create({
  mainOuterWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  testingTitle: {
    color: '#222',
    fontSize: 20
  },
  picker: {
    width: 100
  }
});

class BackgroundGeoTester extends Component {

  constructor(props) {
    super(props)

    this.state = {
      geoFences: [],
      seconds: 5
    }

    this.handleAppStateChange = this.handleAppStateChange.bind(this)

    // const Datez = new Date(Date.now() + 5000)
    // console.log('dater', Datez)
    // //const Datez = new Date(Date.now() + (this.state.seconds * 1000)).toISOString(),
    //


  }

  componentDidMount() {

    AppState.addEventListener('change', this.handleAppStateChange)

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

      const geoState = myGeoFences.map((item) => {
        return item.identifier
      })

      this.setState({geoFences: geoState})

      bgGeo.addGeofences(myGeoFences);
      bgGeo.getGeofences(function(geofences) {
        //console.log('- Geofences: ', geofences);

      });
      //
      // console.log('results res is', res)
    })
  }

  componentWillUnmount() {
    console.log('will unmountz?')

    AppState.removeEventListener('change', this.handleAppStateChange)

  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      PushNotification.localNotificationSchedule({
        message: "My Awesome Notification Message", // (required)
        date: new Date(Date.now() + (this.state.seconds * 1000)), // in 60 secs
      });
      console.log('app is in background', this.state.seconds)
    } else {
      console.log('app is NOT in background', this.state.seconds)
    }


  }

  render() {

    if (this.state.geoFences[0]) {
      var geoDataz = this.state.geoFences.map((item, index) => {
        return (
          <View key={index}>
            <Text>{item}</Text>
          </View>
        )
      })
    } else {
      var geoDataz = <View></View>
    }

    return (
      <View style={styles.mainOuterWrap}>
        <Text style={styles.testingTitle}>Just Testing</Text>
        <View>{geoDataz}</View>
        <Picker style={styles.picker} selectedValue={this.state.seconds} onValueChange={(seconds) => this.setState({seconds})}>
          <Picker.Item label="5" value={5}/>
          <Picker.Item label="10" value={10}/>
          <Picker.Item label="15" value={15}/>
        </Picker>
        <PushController/>
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

module.exports = connect(mapStateToProps, mapActionsToProps)(BackgroundGeoTester)
