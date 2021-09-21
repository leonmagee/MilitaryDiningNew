import React, {Component} from 'react'
import {
	View, 
	Text, 
	StyleSheet, 
	TouchableHighlight, 
	Modal,
	//AsyncStorage
} from 'react-native'
import {variables} from '../Styles/Variables'
import {Icon} from 'react-native-elements'

const styles = StyleSheet.create({
  modalOuter: {
    margin: 30,
    padding: 20,
    //backgroundColor: variables.backgroundWhite,
    backgroundColor: variables.brandSecond,
    flex: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#222',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'BlackOpsOne-Regular',
    fontSize: 28,
    marginBottom: 20,
  },
  specialsText: {
  	fontSize: 23,
  	paddingVertical: 15,
  	paddingHorizontal: 10,
  	fontWeight: 'bold',
  	color: '#FFF'
  },
  iconWrap: {
  	flexDirection: 'row',
  	justifyContent: 'space-around'
  },
  closeButton: {
  	alignSelf: 'flex-end',
  }
})

const iconSize = 55

class DailySpecialModal extends Component {

	constructor(props) {
		super(props)

		this.state = {
			modalVisible: false,
			message: ''
		}
	}

	componentDidMount() {

		if(this.props.message) {
			this.setState({message: this.props.message, modalVisible: true})
		}

	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible})
	}

	render() {
		return(
			<Modal
	          animationType="slide"
	          transparent={true}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {
	            Alert.alert('Modal has been closed.');
	          }}>
	          <View style={styles.modalOuter}>
	          	<View>
	              <Text style={styles.modalTitle}>Current Specials</Text>
	              <View style={styles.iconWrap}>
	              	<Icon name="food" type="material-community" size={iconSize} color={'#FFF'} />
	              	<Icon name="silverware-variant" type="material-community" size={iconSize} color={'#FFF'} />
	              	<Icon name="food-apple" type="material-community" size={iconSize} color={'#FFF'} />
	              </View>
	              <Text style={styles.specialsText}>{this.state.message}</Text>
	            </View>
	              <TouchableHighlight
	              	style={styles.closeButton}
	                onPress={() => {
	                  this.setModalVisible(!this.state.modalVisible)
	                }}>
	                <Icon name="close-circle" type="material-community" size={40} color={'#FFF'}/>
	              </TouchableHighlight>
	            </View>
	        </Modal>
        )
	}
}

module.exports = DailySpecialModal








