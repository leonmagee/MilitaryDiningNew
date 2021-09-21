import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	AsyncStorage
} from 'react-native'
import api from '../Utils/api'
import uniqueId from 'react-native-unique-id'


const styles = StyleSheet.create({
	mainWrap: {
		backgroundColor: '#FFF',
		alignItems: 'center',
		paddingVertical: 40,
	},
	textItem: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'darkred'
	}
})

class ApiTester extends Component {

	constructor(props) {
		super(props)
	}

	testMethod() {
		// get current user id and rank? From async storage?
		//console.log('button was pressed')
		/**
		* Should we pass rank ID or rank string to api? I suppose I could have the same array of
		* rank values on the WP site and inside the app? Or I could be pulling all possible
		* ranks from the WP site? It probably doesn't matter - I think having matching arrays
		* is fine for now
		*/

		AsyncStorage.getItem('@UserRank').then((rank) => {
			if (rank) {
				uniqueId((error, id) => {
					if (error) return console.error(error)
						console.log(id)
					api.createNewUser(id, rank)
				})
			}
		}).done()

		
	}

	render() {
		return(
			<View style={styles.mainWrap}>
			<Text style={styles.textItem}>Testing Component</Text>
			<TouchableHighlight onPress={() => this.testMethod()}>
			<Text>Button Name</Text>
			</TouchableHighlight>
			</View>
			)
	}
}

module.exports = ApiTester