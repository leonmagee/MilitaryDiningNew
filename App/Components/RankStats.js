import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { defaults } from '../Styles/Defaults';
import { variables } from '../Styles/Variables';
import api from '../Utils/api';
import uniqueId from 'react-native-unique-id';
import { rank } from '../Data/Data';
import Footer from './Footer';

const LinearAnimate = Animated.createAnimatedComponent(LinearGradient);

let { width, height } = Dimensions.get('window');
let boxHeight = height / 23;
let barHeightOneHundred = boxHeight * 10;

const greenGradient = [variables.brandEighth, variables.brandTwelth];
const redGradient = [variables.brandSixth, variables.brandEleventh];
const tomatoGradient = ['#ff7559', '#FC644D'];
const yellowGradient = [variables.brandSeventh, variables.brandTenth];

const styles = StyleSheet.create({
  innerWrap: {
    backgroundColor: variables.backgroundWhite,
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  mainTextWrap: {
    backgroundColor: variables.backgroundWhite,
    paddingVertical: 30,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 23,
    color: '#333',
    fontFamily: variables.mainFont,
    textAlign: 'center',
  },
  gradientText: {
    color: '#FFF',
    fontFamily: variables.mainFont,
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  sidebar: {
    width: width,
    //backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 30,
  },
  sidebarBox: {
    height: boxHeight,
    flex: 1,
    width: width,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  sidebarText: {
    color: '#777',
    fontWeight: 'bold',
  },
  barWrap: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 7,
  },
  barItem: {
    width: width / 4.2,
    backgroundColor: 'rgba(255,22,255,0.7)',
    marginHorizontal: 7,
    opacity: 0.7,
  },
  graphFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 7,
    //marginLeft: ( width / 20 ),
  },
  graphFooterItem: {
    height: 30,
    justifyContent: 'center',
    width: width / 4.2,
    marginHorizontal: 7,
  },
  graphFooterText: {
    fontFamily: variables.mainFont,
    color: '#333',
    textAlign: 'center',
  },
});

class RankStats extends Component {
  constructor(props) {
    super(props);

    console.log('sdlfjsdlfsjdflsdjfsdfj');

    this.state = {
      rankStats: [],
      barHeightUser: new Animated.Value(0),
      barHeightRank: new Animated.Value(0),
      barHeightAll: new Animated.Value(0),
      rank: '',
      userPercent: 0.88,
      rankPercent: 0,
      allPercent: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@UserRank')
      .then(value => {
        //console.log('VVVVVV', value)
        if (value && value != 'N/A') {
          const newRank = rank[value - 1].label;
          this.setState({ rank: newRank });
          api
            .getRankStatsId(value)
            .then(response => {
              this.setState({
                rankPercent: response,
              });
            })
            .done();
        }
        api
          .getRankStats()
          .then(response => {
            this.setState({
              rankStats: response,
            });

            api
              .getTotalStats()
              .then(response => {
                this.setState({
                  allPercent: response,
                });
                this.callAnimation();
              })
              .done();
          })
          .done();
      })
      .done();
  }

  callAnimation() {
    // we need different animation for each
    Animated.timing(this.state.barHeightUser, {
      toValue: barHeightOneHundred * this.state.userPercent,
      duration: 500, // use timing for animation
      easing: Easing.linear,
    }).start(),
      Animated.timing(this.state.barHeightRank, {
        toValue: barHeightOneHundred * this.state.rankPercent,
        duration: 500, // use timing for animation
        easing: Easing.linear,
      }).start(),
      Animated.timing(this.state.barHeightAll, {
        toValue: barHeightOneHundred * this.state.allPercent,
        duration: 500, // use timing for animation
        easing: Easing.linear,
      }).start();
  }

  render() {
    let { barHeightUser, barHeightRank, barHeightAll } = this.state;

    let RankName = this.state.rank ? this.state.rank + 's' : '';

    return (
      <View style={defaults.defaultMainWrap}>
        <View style={defaults.defaultTitleWrap}>
          <Text style={defaults.defaultTitle}>Ranked Stats</Text>
        </View>
        <View style={styles.mainTextWrap}>
          <Text style={styles.mainText}>
            Percent of Recommended Daily Calorie Intake
          </Text>
        </View>
        <View style={styles.innerWrap}>
          <View style={styles.sidebar}>
            <View style={styles.sidebarBox}>
              <Text style={styles.sidebarText}>130%</Text>
            </View>
            <View style={styles.sidebarBox}>
              <Text style={styles.sidebarText}>120%</Text>
            </View>
            <View style={styles.sidebarBox}>
              <Text style={styles.sidebarText}>110%</Text>
            </View>
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
          <View style={styles.barWrapOuter}>
            <View style={styles.barWrap}>
              <LinearAnimate
                colors={greenGradient}
                style={[styles.barItem, { height: barHeightUser }]}>
                <Text style={styles.gradientText}>
                  {(this.state.userPercent * 100).toFixed(0)}%
                </Text>
              </LinearAnimate>
              <LinearAnimate
                colors={tomatoGradient}
                style={[styles.barItem, { height: barHeightRank }]}>
                <Text style={styles.gradientText}>
                  {(this.state.rankPercent * 100).toFixed(0)}%
                </Text>
              </LinearAnimate>
              <LinearAnimate
                colors={redGradient}
                style={[styles.barItem, { height: barHeightAll }]}>
                <Text style={styles.gradientText}>
                  {(this.state.allPercent * 100).toFixed(0)}%
                </Text>
              </LinearAnimate>
            </View>
            <View style={styles.graphFooter}>
              <View style={styles.graphFooterItem}>
                <Text style={styles.graphFooterText}>Your Data</Text>
              </View>
              <View style={styles.graphFooterItem}>
                <Text style={styles.graphFooterText}>{RankName}</Text>
              </View>
              <View style={styles.graphFooterItem}>
                <Text style={styles.graphFooterText}>Soldiers</Text>
              </View>
            </View>
          </View>
        </View>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

module.exports = RankStats;
