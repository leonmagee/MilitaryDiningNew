import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
	elementWrap: {
		//backgroundColor: '#F9F9F9',
		//backgroundColor: variables.brandPrimary,
		//borderWidth: 1,
		//borderColor: '#222',
		padding: 7,
		display: 'flex',
		flexDirection: 'row',
		margin: 5,
		flexGrow: 1,
	},
	textLabel: {
		color: '#FFF',
	},
	textValue: {
		color: '#FFF',
		marginLeft: 5,
		fontWeight: 'bold',
	}
})


class FoodDetail extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		if (this.props.value) {
			return(
			<View style={[styles.elementWrap, {backgroundColor: this.props.bg}]}>
				<Text style={styles.textLabel}>{this.props.label}:</Text>
				<Text style={styles.textValue}>{this.props.value}</Text>
			</View>
			)
		} else {
			return(
			<View></View>
			)
		}
	}
}

module.exports = FoodDetail