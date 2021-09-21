import React, {Component} from 'react'
import {AppRegistry, View} from 'react-native'
import {Provider} from 'react-redux'
import store from './App/Redux/store'
//import Homepage from './App/Components/Homepage'
import {Tabs} from './App/Components/Router'
//import PushTester from './App/Components/BackgroundGeoTester'
//import BackgroundGeoTesterNew from './App/Components/BackgroundGeoTesterNew'
//import Foo from './App/Components/BackgroundGeolocationTest' //testing react-native-background-geolocation
//import MessHalls from './App/Components/MessHalls'
//import GeolocationExample from './App/Components/GeolocationTest'
//import MapPage from './App/Components/MapPage'
//import TestPage from './App/Components/TestPage'

export default class MilitaryDining extends Component {

  render() {
    return (
      <Provider store={store}>
        <Tabs/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('MilitaryDining', () => MilitaryDining);
