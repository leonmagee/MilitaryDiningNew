import React, {Component} from 'react'

import {View, Text, Animated, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  menuDetailWrap: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginTop: 13,
    marginBottom: 8,
  },
  menuDetailsItemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  menuDetailsItemWrapFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  menuDetailsItemLabel: {
    color: '#777',
  },
  menuDetailsItem: {
    color: '#333',
    fontWeight: 'bold',
    minWidth: 150,
  }
})

class MenuDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.cal) {
      var calories = <View style={styles.menuDetailsItemWrap}>
          <Text style={styles.menuDetailsItemLabel}>Calories</Text>
          <Text style={styles.menuDetailsItem}>{this.props.cal}</Text>
        </View>
    } else {
      var portionSize = <View></View>
    }
    if (this.props.portion) {
      var portionSize = <View style={styles.menuDetailsItemWrap}>
          <Text style={styles.menuDetailsItemLabel}>Portion Size</Text>
          <Text style={styles.menuDetailsItem}>{this.props.portion}</Text>
        </View>
    } else {
      var portionSize = <View></View>
    }
    if (this.props.fat) {
      var fat = <View style={styles.menuDetailsItemWrap}>
          <Text style={styles.menuDetailsItemLabel}>Fat</Text>
          <Text style={styles.menuDetailsItem}>{this.props.fat}</Text>
        </View>
    } else {
      var fat = <View></View>
    }
    if (this.props.pro) {
      var protein = <View style={styles.menuDetailsItemWrap}>
          <Text style={styles.menuDetailsItemLabel}>Protein</Text>
          <Text style={styles.menuDetailsItem}>{this.props.pro}</Text>
        </View>
    } else {
      var protein = <View></View>
    }
    if (this.props.carb) {
      var carbs = <View style={styles.menuDetailsItemWrap}>
          <Text style={styles.menuDetailsItemLabel}>Carbs</Text>
          <Text style={styles.menuDetailsItem}>{this.props.carb}</Text>
        </View>
    } else {
      var carbs = <View></View>
    }
    if (this.props.reference) {
      var ref = <View style={styles.menuDetailsItemWrap}>
          <Text style={styles.menuDetailsItemLabel}>Recipe Reference</Text>
          <Text style={styles.menuDetailsItem}>{this.props.reference}</Text>
        </View>
    } else {
      var ref = <View></View>
    }

    return (
      <Animated.View style={styles.menuDetailWrap}>
        {calories}
        {portionSize}
        {fat}
        {protein}
        {carbs}
        {ref}
      </Animated.View>
    )
  }
}

module.exports = MenuDetails
