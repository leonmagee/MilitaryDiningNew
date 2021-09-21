import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { createAppContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Homepage from './Homepage';
import Settings from './Settings';
import MessHalls from './MessHalls';
import MapPage from './MapPage';
import MenuPage from './MenuPage';
import FavoriteFoods from './FavoriteFoods';
import DailyCalories from './DailyCalories';
import RankStats from './RankStats';
import ManagerLogin from './ManagerLogin';
import HealthVideos from './HealthVideos';
import { variables } from '../Styles/Variables';
import TestComponent from './TestComponent';

const navigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.name}`,
});

const MessHallStack = createStackNavigator(
  {
    MessHalls: {
      screen: MessHalls,
      // headerMode: 'none',
      navigationOptions: {
        // transparentCard: true,
        title: 'Mess Halls',
        headerTitleStyle: {
          color: '#FFF',
          padding: 0,
          margin: 0,
          fontFamily: 'BlackOpsOne-Regular',
          fontSize: 30,
          fontWeight: 'normal',
        },
      },
    },
    MenuPage: {
      screen: MenuPage,
      navigationOptions,
    },
  },
  {
    // mode: 'modal',
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
    }),
    transparentCard: true,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent',
        // headerTransparent: true,
        // height: 57,
        // paddingTop: 0,
        // paddingBottom: 15,
        height: 60,
      },
      // headerTransparent: true,
      headerTitleStyle: {
        color: '#FFF',
        fontFamily: 'BlackOpsOne-Regular',
      },
      headerTintColor: '#FFF',
      //     cardStyle: {
      //   backgroundColor: 'transparent',
      //   opacity: 1,
      // },
      // transitionConfig: () => ({
      //   containerStyle: {
      //     backgroundColor: 'transparent',
      //   },
      // })
    },
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Homepage,
      navigationOptions: {
        drawerLabel: 'HOME',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="home"
            type="material-community"
            size={26}
            color={tintColor}
          />
        ),
      },
    },
    MessHalls: {
      screen: MessHallStack,
      navigationOptions: {
        drawerLabel: 'MESS HALLS',
        drawerIcon: ({ tintColor }) => (
          <Icon name="restaurant" size={26} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        drawerLabel: 'PROFILE SETTINGS',
        drawerIcon: ({ tintColor }) => (
          <Icon name="directions-run" size={26} color={tintColor} />
        ),
      },
    },
    DailyIntake: {
      screen: DailyCalories,
      navigationOptions: {
        drawerLabel: 'CALORIE TRACKER',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="calendar-check"
            type="material-community"
            size={26}
            color={tintColor}
          />
        ),
      },
    },
    Favorites: {
      screen: FavoriteFoods,
      navigationOptions: {
        drawerLabel: 'FAVORITES',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="heart-outline"
            type="material-community"
            size={26}
            color={tintColor}
          />
        ),
      },
    },
    Stats: {
      screen: RankStats,
      navigationOptions: {
        drawerLabel: 'YOUR STATS',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="chart-bar"
            type="material-community"
            size={26}
            color={tintColor}
          />
        ),
      },
    },
    MessHallLogin: {
      screen: ManagerLogin,
      // screen: TestComponent,
      navigationOptions: {
        drawerLabel: 'MANAGER ACCESS',
        drawerIcon: ({ tintColor }) => (
          <Icon name="account-circle" size={26} color={tintColor} />
        ),
      },
    },
    HealthVideos: {
      screen: HealthVideos,
      navigationOptions: {
        drawerLabel: 'HEALTH VIDEOS',
        drawerIcon: ({ tintColor }) => (
          <Icon name="youtube" type="entypo" size={26} color={tintColor} />
        ),
      },
    },
    Map: {
      screen: MapPage,
      navigationOptions: {
        drawerLabel: 'AREA MAP',
        drawerIcon: ({ tintColor }) => (
          <Icon name="person-pin-circle" size={26} color={tintColor} />
        ),
      },
    },
  },
  {
    intialRouteName: 'Home',
    drawerPosition: 'right',
    drawerBackgroundColor: '#EEE',
    drawerWidth: 275,
    contentOptions: {
      activeTintColor: variables.brandPrimary,
      activeBackgroundColor: '#FFF',
      inactiveTintColor: '#777',
      iconContainerStyle: {
        opacity: 0.9,
        width: 35,
      },
    },
  },
);

export const Drawer = createAppContainer(DrawerNavigator);

// export const GroupedStack = createStackNavigator({
//     Main: DrawerNavigator,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Home',  // Title to appear in status bar
//       headerLeft: <Icon color={'red'} name="person-pin-circle" size={35} onPress={ () => navigation.navigate.drawerOpen() } />
//     })
// })

// export const Drawer = createAppContainer(GroupedStack)
