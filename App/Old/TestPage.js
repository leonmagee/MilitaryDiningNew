import React, {Component} from 'react'

import {View, Text, StyleSheet} from 'react-native'

import SvgElement from './SvgElement'
import {ForkIcon} from '../SVG/SvgIcons'

//console.log(SpoonForkSVG)

const styles = StyleSheet.create({
  mainWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
    flex: 1,
  }
})

class TestPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.mainWrap}>
        <SvgElement svg_data={ForkIcon} />
      </View>
    )
  }
}

module.exports = TestPage
