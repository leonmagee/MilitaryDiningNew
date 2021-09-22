import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuPage from './MenuPage';
import { variables } from '../Styles/Variables';
import MessHall from './MessHall';
import SampleData from '../Data/Data';
//import {defaults} from '../Styles/Defaults'
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import Footer from './Footer';

console.log(SampleData);

const styles = StyleSheet.create({
  mainWrapOuter: {
    display: 'flex',
    flex: 1,
    //marginTop: 75,
  },
  mainWrap: {
    display: 'flex',
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: variables.backgroundWhite,
    //backgroundColor: 'blue',
  },
  messHallWrap: {
    alignSelf: 'stretch',
  },
});

class MessHalls extends Component {
  constructor(props) {
    super(props);
  }

  navigateToPage(data) {
    this.props.goToMenuPage(data);
    //this.props.navigation.navigate('MenuPage', { screen: 'MessHallsMain' });
    this.props.navigation.navigate('MenuPage', data);
    //navigation.navigate('Root', { screen: 'Profile' });
  }

  render() {
    if (SampleData) {
      const MessHallMenus = SampleData.map((data, key) => {
        return (
          <View key={key}>
            <MessHall
              name={data.name}
              data={data}
              navigate={() => this.navigateToPage(data)}
            />
          </View>
        );
      });

      currentActivePage = (
        <View style={styles.mainWrap}>
          <ScrollView style={styles.messHallWrap}>{MessHallMenus}</ScrollView>
        </View>
      );
    } else {
      var currentActivePage = <View />;
    }

    // if (this.props.restData) {
    //   const MessHallMenus = this.props.restData.map((data, key) => {
    //     return (
    //       <View key={key}>
    //         <MessHall
    //           name={data.name}
    //           data={data}
    //           navigate={() => this.navigateToPage(data)}
    //         />
    //       </View>
    //     );
    //   });

    //   currentActivePage = (
    //     <View style={styles.mainWrap}>
    //       <ScrollView style={styles.messHallWrap}>{MessHallMenus}</ScrollView>
    //     </View>
    //   );
    // } else {
    //   var currentActivePage = <View />;
    // }

    return (
      <View style={styles.mainWrapOuter}>
        {currentActivePage}
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentPage: state.currentPage,
  restData: state.restData,
});

const mapActionsToProps = dispatch => ({
  goToMenuPage(data) {
    dispatch({ type: 'MESS_HALL_MENU', payload: data });
  },
});

module.exports = connect(mapStateToProps, mapActionsToProps)(MessHalls);
