import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import store from './App/Redux/store';
import Homepage from './App/Components/Homepage'
//import MessHalls from './App/Components/MessHalls'
import GeolocationExample from './App/Components/GeolocationTest'
import MapSearch from './App/Components/MapSearch'
//import TestPage from './App/Components/TestPage'

export default class MilitaryDining extends Component {

  render() {
    return (
      <Provider store={store}>
          <Homepage />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('MilitaryDining', () => MilitaryDining);
