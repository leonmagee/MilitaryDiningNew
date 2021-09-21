import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import api from '../Utils/api';
import Footer from './Footer';

let { width, height } = Dimensions.get('window');
height = height - 50; // make space for bottom menu bar

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //width: null, // allows centering of content with image - otherwise image width is imported
    //height: null,
  },
  logoImageWrap: {
    //flex: 1,
    width: width,
    height: height,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 4000,
  },
  logoImage: {
    width: width - 50,
    height: width - 50,
  },
  mainOuterWrap: {
    flex: 1,
    width: width,
    //backgroundColor: 'transparent',
  },
  homeWrapOuter: {
    flex: 1,
  },
  homeWrap: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  // modalWrap: {
  //   backgroundColor: '#222',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flex: 1
  // },
  // modalText: {
  //   color: '#FFF'
  // }
});

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  // openDrawer() {
  //   console.log('OPENZZZZZZZZ')
  //   this.props.navigation.openDrawer()
  // }

  render() {
    return (
      <View style={styles.mainOuterWrap}>
        <View style={styles.homeWrapOuter}>
          <View style={styles.homeWrap}>
            <Image
              source={require('../Assets/Images/justin-tacos.png')}
              style={styles.imageContainer}
            />
            <View style={styles.logoImageWrap}>
              <Image
                source={require('../Assets/Images/military-dining-logo-new.png')}
                style={styles.logoImage}
              />
            </View>
          </View>
        </View>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

module.exports = Homepage;
