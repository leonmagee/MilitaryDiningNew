import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	AsyncStorage,
	Animated,
	Easing,
	Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {defaults} from '../Styles/Defaults'
import {variables} from '../Styles/Variables'
import api from '../Utils/api'
import uniqueId from 'react-native-unique-id'

let {width, height} = Dimensions.get('window')
let boxHeight = (height/23)
let barHeight = (boxHeight * 10)
console.log(boxHeight)
//height = height - 50; // make space for bottom menu bar?


const styles = StyleSheet.create({
	innerWrap: {
		backgroundColor: variables.backgroundWhite,
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	gradientWrap: {
		flex: 1,
		backgroundColor: 'transparent',
		//alignItems: 'center',
	},
	gradientElement: {
		flex: 1,
		flexDirection: 'row'
	},
	sidebar: {
		//width: 300,
		width: 60,
		alignItems: 'center',
		justifyContent: 'flex-end',
		//paddingVertical: 30,
		//backgroundColor: 'blue',
	},
	sidebarBox: {
		height: boxHeight,
		width: 40,
		marginLeft: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 2,
		borderTopColor: 'rgba(255,255,255,0.7)',
	},
	sidebarText: {
		color: '#FFF',
		fontWeight: 'bold',
		//marginVertical: 10,
	},
	barWrap: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	barItem: {
		width: 80,
		//height: 300,
		backgroundColor: 'rgba(255,22,255,0.7)',
		marginHorizontal: 15,	
	},
	buttonWrap: {
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'tomato'
	},
	buttonText: {
		fontSize: 35,
		fontWeight: 'bold',
		color: '#FFF'
	}
})

class RankStats extends Component {

	constructor() {
		super()

		this.state = {
			//rankStats: [],
			barHeight: new Animated.Value(0)
		}
	}

	// componentWillMount() {
	// 	api.getRankStats().then(response => {
	// 		console.log('will mount', response)
	// 		this.setState({
	// 			rankStats: response
	// 		})
	// 	})
	// }

	// componentDidMount() {

	// 	Animated.timing(this.state.barHeight, {
	//       toValue: 300,
	//       duration: 1300, // use timing for animation
	//       easing: Easing.linear
	//     }).start()
	// }

	// triggerAnimation() {

	// }

	// getUserRank() {

	// 	AsyncStorage.getItem('@UserRank').then((rank) => {
	// 		if (rank) {
	// 			uniqueId((error, id) => {
	// 				if (error) return console.error(error)
	// 					console.log(id)
	// 				api.createNewUser(id, rank)
	// 			})
	// 		}
	// 	}).done()
	// }

	callAnimation() {
		console.log('button pressed')
		Animated.timing(this.state.barHeight, {
	      toValue: barHeight,
	      duration: 500, // use timing for animation
	      easing: Easing.linear
	    }).start()
	}

	render() {

		let {barHeight} = this.state

		// const rankStats = this.state.rankStats.map((item, key) => {
		// 	return(
		// 		<Text key={key}>Rank: {item.rank} - Average: {item.average}</Text>
		// 		)
		// })

		return(

			<View style={defaults.defaultMainWrap}>
				<View style={defaults.defaultTitleWrap}>
					<Text style={defaults.defaultTitle}>Ranked Stats</Text>
				</View>
				<View style={styles.buttonWrap}>
					<TouchableHighlight onPress={() => this.callAnimation()}>
						<Text>Press Me</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.innerWrap}>
{/*					<Text style={styles.textItem}>Rank Stats</Text>
					<TouchableHighlight onPress={() => this.testMethod()}>
						<Text>Button Name</Text>
					</TouchableHighlight>
					<View>
					{rankStats}
					</View>*/}
					<View style={styles.gradientWrap}>
						<LinearGradient 
						start={{x: 0.0, y: 0.10}} end={{x: 0.6, y: 1.0}}
						colors={[variables.brandSecond, variables.brandEighth]} 
						style={styles.gradientElement}
						>
						<View style={styles.sidebar}>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>100%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>90%</Text>
							</View>
							<View style={styles.sidebarBox}>								
								<Text style={styles.sidebarText}>80%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>70%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>60%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>50%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>40%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>30%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>20%</Text>
							</View>
							<View style={styles.sidebarBox}>
								<Text style={styles.sidebarText}>10%</Text>
							</View>
						</View>
						<View style={styles.barWrap}>
							<Animated.View style={[styles.barItem, {height: barHeight}]}></Animated.View>
							<Animated.View style={styles.barItem}></Animated.View>
							<Animated.View style={styles.barItem}></Animated.View>
						</View>
						</LinearGradient>
					</View>
				</View>
			</View>
			)
	}
}

module.exports = RankStats