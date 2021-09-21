import React, {Component} from 'react'
import {
	View,
	TouchableHighlight
} from 'react-native'
import {variables} from '../Styles/Variables'
import {Icon} from 'react-native-elements'

class FavoriteButton extends Component {


	render() {

		if(this.props.currentFavorites) {
			if (this.props.currentFavorites.indexOf(this.props.itemId) > -1) {
				var iconColor = variables.brandSecond
			} else {
				var iconColor = '#CCC'
			} 
		} else {
			var iconColor = '#CCC'
		}

		return(
			<TouchableHighlight onPress={(id) => this.props.fav()} underlayColor="transparent">
			<View>
			<Icon name="favorite" size={23} color={iconColor} />
			</View>
			</TouchableHighlight>
			)
	}

}

module.exports = FavoriteButton