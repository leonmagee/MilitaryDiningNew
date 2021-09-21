import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
//import {Provider} from 'react-redux';
//import store from './App/Redux/store';
//import Homepage from './App/Components/Homepage'
//import MessHalls from './App/Components/MessHalls'
//import GeolocationExample from './App/Components/GeolocationTest'
import MapSearchNew from './App/Components/MapSearchNew'
import Foo from './App/Components/BackgroundGeolocationTest'
//import TestPage from './App/Components/TestPage'

export default class MilitaryDining extends Component {

  render() {
    return (<MapSearchNew/>)
  }
}

AppRegistry.registerComponent('MilitaryDining', () => MilitaryDining);
