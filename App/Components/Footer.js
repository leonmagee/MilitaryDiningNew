import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  footerWrap: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    //backgroundColor: 'green',
    //flex: 1,
  },
  footerText: {
    color: '#FFF',
    fontSize: 23,
  },
});

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  goToHome() {
    this.props.navigation.navigate('Home');
  }

  goToMessHalls() {
    this.props.navigation.navigate('MessHalls');
  }

  goToSettings() {
    this.props.navigation.navigate('Settings');
  }

  openDrawer() {
    this.props.navigation.openDrawer();
  }

  render() {
    return (
      <View style={styles.footerWrap}>
        <TouchableHighlight
          onPress={() => this.goToHome()}
          underlayColor="transparent">
          <Icon
            name="home"
            type="material-community"
            size={30}
            color={'#FFF'}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.goToMessHalls()}
          underlayColor="transparent">
          <Icon name="restaurant" size={30} color={'#FFF'} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.goToSettings()}
          underlayColor="transparent">
          <Icon name="directions-run" size={30} color={'#FFF'} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.openDrawer()}
          underlayColor="transparent">
          <Icon name="menu" size={30} color={'#FFF'} />
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Footer;
