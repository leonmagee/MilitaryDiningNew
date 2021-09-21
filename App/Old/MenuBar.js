import React, {Component} from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import {View, Text, TouchableHighlight, StyleSheet, Dimensions} from 'react-native'
import {variables} from '../Styles/Variables'
let {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  menuBarWrap: {
    position: 'absolute',
    //height: 45,
    //paddingTop: 10,
    //paddingBottom: 5,
    paddingVertical: 10,
    //backgroundColor: 'rgba(0,0,0,0.6)',
    //backgroundColor: 'red',
    bottom: 0,
    width: width
  },
  menuBarInner: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  hideThis: {
    display: 'none'
  }
})

class MenuBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    if (this.props.menuLinks.settings) {
      var settingsLink = <LinkButton buttonText="Settings" handleClick={() => this.props.goToSettingsPage()}/>
    } else {
      var settingsLink = <View style={styles.hideThis}></View>
    }

    if (this.props.menuLinks.mess_halls) {
      var messHallsLink = <LinkButton buttonText="Mess Halls" handleClick={() => this.props.goToMessHallsPage()}/>
    } else {
      var messHallsLink = <View style={styles.hideThis}></View>
    }

    if (this.props.menuLinks.home) {
      var homeLink = <LinkButton buttonText="Home" handleClick={() => this.props.goToHomePage()}/>
    } else {
      var homeLink = <View style={styles.hideThis}></View>
    }

    if (this.props.menuLinks.map) {
      var mapLink = <LinkButton buttonText="Map" handleClick={() => this.props.goToMapPage()}/>
    } else {
      var mapLink = <View style={styles.hideThis}></View>
    }

    const allButtons = (
      <View style={styles.menuBarInner}>
        {homeLink}
        {settingsLink}
        {messHallsLink}
        {mapLink}
      </View>
    )

    if (!this.props.backgroundStyle) {
      var backgroundStyleColor = variables.brandPrimary
      //var backgroundStyleColor = 'red'
    } else {
      var backgroundStyleColor = this.props.backgroundStyle
    }

    return (
      <View style={[
        styles.menuBarWrap, {
          backgroundColor: backgroundStyleColor
        }
      ]}>
        {allButtons}
      </View>
    )
  }
}

mapStateToProps = (state) => ({currentPage: null})

mapActionsToProps = (dispatch) => ({
  goToSettingsPage() {
    dispatch({type: 'SETTINGS_PAGE'})
  },
  goToMessHallsPage() {
    dispatch({type: 'MESS_HALLS_PAGE'})
  },
  goToHomePage() {
    dispatch({type: 'HOME_PAGE'})
  },
  goToMapPage() {
    dispatch({type: 'MAP_PAGE'})
  }
})

module.exports = connect(mapStateToProps, mapActionsToProps)(MenuBar)
