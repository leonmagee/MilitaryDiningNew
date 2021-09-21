import React, {Component} from 'react'
import {connect} from 'react-redux'
import {variables} from '../Styles/Variables'
import {defaults} from '../Styles/Defaults'
import {Icon} from 'react-native-elements'
import {removeQuotes} from './HelperFunctions'
import FoodDetail from './FoodDetail'
import Footer from './Footer'
import Svg, {
	Path,
} from 'react-native-svg';

import {
	View,
	Text,
	Image,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableHighlight,
	AsyncStorage,
	Animated
} from 'react-native'

const styles = StyleSheet.create({
	scrollWrap: {
		backgroundColor: variables.backgroundWhite,
		padding: 15,
	},
	foodWrap: {
		backgroundColor: '#FDFDFD',
		borderColor: '#E5E5E5',
		borderWidth: 1,
		borderRadius: 15,
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 12,
		marginBottom: 20,
	},
	headerWrap: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	imageWrap: {
		width: 17,
		height: 40,
		marginRight: 8,
	},
	imageElement: {
		width: 17,
		height: 40,
	},
	foodNameWrap: {
		flex: 1,
	},
	foodName: {
		fontSize: 16,
		fontFamily: 'BlackOpsOne-Regular',
	},
	subHeaderWrap: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	moreInfoWrap: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	moreInfoText: {
		fontWeight: 'bold',
		marginLeft: 3,
		color: '#333'
	},
	foodDetais: {
		marginTop: 10,
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	noFavWrap: {
		alignItems: 'center',
	},
	noFavText: {
		fontSize: 18,
	}
})

class FavoriteFoods extends Component {

	constructor(props) {
		super(props)

		this.state = {
			detailsToggle: [],
			currentFavorites: false,
		}
	}

	// componentDidMount() {

	// 	if(this.props.currentFavorites) {

	// 		this.setState({
	// 			currentFavorites: this.props.currentFavorites
	// 		})
	// 	}
	// }

	toggleDetails(index) {
		let currentArray = this.state.detailsToggle
		if(currentArray[index]) {
			currentArray[index] = false
		} else {
			currentArray[index] = true
		}
		this.setState({
			detailsToggle:  currentArray
		})
	}

	checkVisibility(index) {
		let currentArray = this.state.detailsToggle
		if (currentArray[index]) {
			return true
		} else {
			return false
		}
	}

	removeFavorite(id) {

		//console.log('remove this item: ', id)

		AsyncStorage.getItem('@FavoritesArray').then((value) => {

			if (value) {

				let currentArray = JSON.parse(value)

				if (currentArray.indexOf(id) > -1) {

					currentArray.splice(currentArray.indexOf(id), 1);

					var reduxArray = currentArray
					let finalArray = JSON.stringify(currentArray)

					// update storage
					AsyncStorage.setItem('@FavoritesArray', finalArray)

					// remove current item - update redux
					this.props.setCurrentFavorites(reduxArray)
				}
			}
		})
	}

	render() {

		var favFoodList = <View></View>

		var justOneFavorite = false

		if (this.props.currentFavorites) {

			if (this.props.restData) {

				let toggleArray = this.props.restData.length

				var favFoodList = this.props.restData.map((food, key) => {

					if (this.props.currentFavorites.indexOf(food.id) > -1) {

						justOneFavorite = true

						if (this.checkVisibility(key)) {

							var detailSection = 
							<View style={styles.foodDetais}>
							<FoodDetail label="Calories" value={food.cal} bg={variables.brandPrimary}/>
							<FoodDetail label="Carbs" value={food.carb} bg={variables.brandPrimary}/>
							<FoodDetail label="Fat" value={food.fat} bg={variables.brandPrimary}/>
							<FoodDetail label="Protein" value={food.pro} bg={variables.brandPrimary}/>
							<FoodDetail label="Ref" value={food.ref} bg={variables.brandPrimary}/>
							<FoodDetail label="Portion" value={food.portion} bg={variables.brandPrimary}/>
							</View>

							var more_less_info = 'LESS INFO'
							var icon_name = 'circle-with-minus'

						} else {

							var detailSection = <View></View>
							var more_less_info = 'MORE INFO'
							var icon_name = 'circle-with-plus'
						}

						if ( food.chart === 'red' ) {
							var image_url = require('../Assets/Images/red-light.png')
						} else if (food.chart === 'yellow') {
							var image_url = require('../Assets/Images/yellow-light.png')
						} else {
							var image_url = require('../Assets/Images/green-light.png')
						}

						return (
							<View style={styles.foodWrap} key={key}>

							<View style={styles.headerWrap}>

							<View style={styles.imageWrap}>
							<Image source={image_url} style={styles.imageElement} />
							</View>

							<View style={styles.foodNameWrap}>
							<Text style={styles.foodName}>{removeQuotes(food.name)}</Text>
							</View>

							</View>

							<View style={styles.subHeaderWrap}>

							<TouchableHighlight onPress={() => {this.toggleDetails(key)}} underlayColor="transparent">
							<View style={styles.moreInfoWrap}>
							<Icon name={icon_name} type='entypo' size={16} color="#333"/>
							<Text style={styles.moreInfoText}>{more_less_info}</Text>
							</View>
							</TouchableHighlight>

							<TouchableHighlight onPress={() => {this.removeFavorite(food.id)}} underlayColor="transparent">
							<View style={styles.moreInfoWrap}>
							<Icon name="circle-with-cross" type='entypo' size={16} color="#333"/>
							<Text style={styles.moreInfoText}>REMOVE</Text>
							</View>
							</TouchableHighlight>

							</View>

							{detailSection}

							</View>
							)

					}
				})

			} 
		}

		if(! justOneFavorite) {
			favFoodList = <View style={styles.noFavWrap}><Text style={styles.noFavText}>You have no favorites saved.</Text></View>
		}

		return(

			<View style={defaults.defaultMainWrap}>

			<View style={defaults.defaultTitleWrap}>

			<Text style={defaults.defaultTitle}>Favorite Foods</Text>

			</View>

			<ScrollView style={styles.scrollWrap}>

			{favFoodList}

			</ScrollView>

        	<Footer navigation={this.props.navigation} />

			</View>

			)
	}
}

mapActionsToProps = (dispatch) => ({
  setCurrentFavorites(results) {
    dispatch({type: 'SET_FAVORITES', payload: results})
  }
})

mapStateToProps = (state) => ({restData: state.restMenuItemData, currentFavorites: state.currentFavorites})

module.exports = connect(mapStateToProps, mapActionsToProps)(FavoriteFoods)