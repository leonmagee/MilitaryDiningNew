import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
	View, 
	Text, 
	StyleSheet,
	TextInput,
	TouchableHighlight,
	AsyncStorage,
	Animated
} from 'react-native'
import {variables} from '../Styles/Variables'
import {defaults} from '../Styles/Defaults'
import Footer from './Footer'
import api from '../Utils/api'

const styles = StyleSheet.create({
	mainWrap: {
		paddingTop: 30,
		backgroundColor: variables.backgroundWhite,
		flex: 1,
	},
	headerText: {
		fontSize: 25,
		fontFamily: 'BlackOpsOne-Regular',
		color: '#222',
		marginBottom: 20,
		paddingHorizontal: 30,
		textAlign: 'center',
	},
	messHallName: {
		fontSize: 20,
		paddingHorizontal: 20,
		textAlign: 'center',
		marginBottom: 20,
		fontWeight: 'bold',
		color: variables.brandSecond
	},
	inputWrap: {
	    paddingHorizontal: 60,
	    marginBottom: 40,
	},
	inputLabel: {
	    color: 'rgba(0, 0, 0, .38)',
	    fontSize: 12
  	},
	textInput: {
	    borderBottomWidth: 0.5,
	    fontSize: 16,
	    borderBottomColor: 'rgba(0, 0, 0, .38)',
	    paddingVertical: 7,
    },
    textAreaInput: {
    	borderWidth: 0.5,
	    fontSize: 16,
	    borderColor: 'rgba(0, 0, 0, .38)',
	    paddingVertical: 5,
	    paddingHorizontal: 9,
	    marginTop: 7,
	    height: 100,
    },
    updateButton: {
	    backgroundColor: variables.brandPrimary,
	    paddingVertical: 8,
	    paddingHorizontal: 15,
	    alignItems: 'center',
	    borderRadius: 8,
	    marginHorizontal: 80,
	    marginTop: 20,
  	},
  	logOut: {
  		backgroundColor: variables.brandSecond,
  	},
  	updateButtonText: {
	    fontFamily: 'BlackOpsOne-Regular',
	    color: '#FFF',
	    fontSize: 20
    },
    badCredsWrap: {
    	backgroundColor: variables.brandSecond,
    	padding: 10,
    	marginHorizontal: 50,
    	marginVertical: 20,
    	borderWidth: 1,
    	borderColor: 'rgba(0,0,0,0.2)'
    },
    badCredsText: {
    	color: '#FFF',
    	textAlign: 'center',
		fontFamily: 'BlackOpsOne-Regular',
		fontSize: 21
    }
})

class ManagerLogin extends Component {

	constructor(props) {
		super(props)

		this.state = {
			email:'',
			password: '',
			isLoggedIn: false,
			messHallId: '',
			messHallName: '',
			message: '',
			//messageArray: false,
			managerData: false,
			badCredentialsOpacity: new Animated.Value(0)
		}

		//AsyncStorage.clear()
	}

	saveLoginUserInfo(id, name) {
    	//AsyncStorage.setItem('@LoginUserEmail', email)
    	//AsyncStorage.setItem('@LoginUserPassword', password)
    	const mess_hall_id = id.toString()
    	AsyncStorage.setItem('@LoginUserMessHallId', mess_hall_id)
    	AsyncStorage.setItem('@LoginUserMessHallName', name)
  	}

  	credentialsDontMatch() {
  		    Animated.timing(this.state.badCredentialsOpacity, {
		      toValue: 1,
		      duration: 500, // use timing for animation
		    }).start(() => {
		      setTimeout(() => {
		        Animated.timing(this.state.badCredentialsOpacity, {
		          toValue: 0,
		          duration: 500, // use timing for animation
		        }).start()
		      }, 1300)
		    })
  	}

	loginManager() {
		
		if (this.state.managerData) {
			let loginFailed = true
			this.state.managerData.map((item) => {
				if((item.manager_email == this.state.email) && (item.manager_password == this.state.password) ) {
					
					loginFailed = false
					this.saveLoginUserInfo(item.mess_hall, item.mess_hall_name)
					this.setState({
						isLoggedIn: true, 
						messHallId: item.mess_hall, 
						message: '',
						messHallName: item.mess_hall_name
					})
				if (this.props.restData) {
					this.props.restData.map((rest_item) => {
						if(rest_item.id == item.mess_hall) {
							this.setState({
								message: rest_item.message
							})
						}
					})
				}
				}
				if (loginFailed) {
					this.credentialsDontMatch()
				}
			})
		}
	}

	logOutManager() {
    	AsyncStorage.setItem('@LoginUserMessHallId', '')
    	this.setState({
    		isLoggedIn: false,
    	})
	}

	updateSpecial() {

		api.setMessHallMessage(this.state.messHallId, this.state.message).then((response) => {
    		console.log(response)
    	})

		// if (this.state.messageArray) {
		// 	let existingEntry = false
		// 	console.log('workingzzzzz', this.state.messageArray)
		// 	this.state.messageArray.map((item) => {
		// 		if (item.messHallId === this.state.messHallId) {
	 //    			item.message = this.state.message
	 //    			existingEntry = true
	 //    		}
		// 	})
		// 	if (!existingEntry) {
		// 		this.state.messageArray.push({
		// 			messHallId: this.state.messHallId,
		// 			message: this.state.message
		// 		})
		// 	}
		// 	//console.log('aaa', this.state.messageArray)
		// 	const newMessageSave = JSON.stringify(this.state.messageArray)

		// 	AsyncStorage.setItem('@CurrentSpecialMessage', newMessageSave)

		// } else {
		// 	console.log('mo message array?')
		// 	const messageArray = [
		// 		{
		// 			messHallId: this.state.messHallId,
		// 			message: this.state.message
		// 		}
		// 	]
		// 	const messageArraySave = JSON.stringify(messageArray)
		// 	AsyncStorage.setItem('@CurrentSpecialMessage', messageArraySave)
		// }



	}

	componentDidMount() {

        api.getManagers().then(response => {
			this.setState({
				managerData: response
			})
		}).done()

		AsyncStorage.getItem('@LoginUserMessHallId').then((id) => {
			if (id) {
				AsyncStorage.getItem('@LoginUserMessHallName').then((name) => {
						this.setState({
							messHallId: id,
							messHallName: name,
							isLoggedIn: true,
						})
				}).done()
				if (this.props.restData) {
					this.props.restData.map((item) => {
						if(item.id == id) {
							this.setState({
								message: item.message
							})
						}
					})
				}
			}
		}).done()

	    // AsyncStorage.getItem('@CurrentSpecialMessage').then((messageArray) => {

	    // 	if(messageArray) {
		   //  	const messages = JSON.parse(messageArray)
		   //  	this.setState({messageArray: messages})

		   //  	messages.map((item) => {
		   //  		if (item.messHallId === this.state.messHallId) {
		   //  			this.setState({message: item.message})
		   //  		}
		   //  	})
		   //  }

	    // }).done()
	}

	render() {

		if(this.state.isLoggedIn) {
			var pageContent = 
			<View style={styles.mainWrap}>
		  		<Text style={styles.headerText}>Set Message for Current Manager's Special</Text>
				
		  		<Text style={styles.messHallName}>Mess Hall: {this.state.messHallName}</Text>
				<View style={styles.inputWrap}>
	            	<Text style={styles.inputLabel}>Current Special</Text>
			  		<TextInput
			  			style={styles.textAreaInput}
					    multiline={true}
					    numberOfLines={5}
					    underlineColorAndroid='transparent'
					    onChangeText={(message) => this.setState({message})}
					    value={this.state.message} />
				</View>
				<TouchableHighlight 
	  				style={styles.updateButton} 
	  				underlayColor={variables.brandPrimary} 
	  				onPress={() => this.updateSpecial()}>
	  				<Text style={styles.updateButtonText}>UPDATE</Text>
				</TouchableHighlight>
	  			<TouchableHighlight 
	  				style={[styles.updateButton, styles.logOut]} 
	  				underlayColor={variables.brandPrimary} 
	  				onPress={() => this.logOutManager()}>
	  				<Text style={styles.updateButtonText}>LOG OUT</Text>
				</TouchableHighlight>
			</View>
		} else {
			var pageContent = <View style={styles.mainWrap}>
					<View style={styles.inputWrap}>
            			<Text style={styles.inputLabel}>Email</Text>
            			<TextInput 
            			textContentType="emailAddress" 
            			autoCapitalize='none' 
            			underlineColorAndroid='transparent' 
            			style={styles.textInput} 
            			value={this.state.email} 
            			onChangeText={(email) => this.setState({email})}
            			/>
          			</View>
          			<View style={styles.inputWrap}>
            			<Text style={styles.inputLabel}>Password</Text>
            			<TextInput 
            			secureTextEntry={true} 
            			textContentType="password" 
            			autoCapitalize='none' 
            			underlineColorAndroid='transparent' 
            			style={styles.textInput} 
            			value={this.state.password} 
            			onChangeText={(password) => this.setState({password})}/>
          			</View>
          			<TouchableHighlight 
          				style={styles.updateButton} 
          				underlayColor={variables.brandPrimary} 
          				onPress={() => this.loginManager()}>
          				<Text style={styles.updateButtonText}>LOG IN</Text>
        			</TouchableHighlight>
        			<Animated.View style={[styles.badCredsWrap, {opacity: this.state.badCredentialsOpacity}]}>
        				<Text style={styles.badCredsText}>Wrong Login Info</Text>
        			</Animated.View>
				</View>
		}
		return(
			<View style={defaults.defaultMainWrap}>
				<View style={defaults.defaultTitleWrap}>
		          <Text style={defaults.defaultTitle}>Manager Login</Text>
		        </View>
		        {pageContent}
				<Footer navigation={this.props.navigation} />
			</View>
			)
	}
}

module.exports = ManagerLogin

mapStateToProps = (state) => ({restData: state.restData})

// mapActionsToProps = (dispatch) => ({
//   goToMenuPage(data) {
//     dispatch({type: 'MESS_HALL_MENU', payload: data})
//    }
// })

module.exports = connect(mapStateToProps)(ManagerLogin)