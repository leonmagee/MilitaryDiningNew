import React, {Component} from 'react'
import {Platform, Text, View} from 'react-native'
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import {Icon} from 'react-native-elements'
import Homepage from './Homepage'
import Settings from './Settings'
import MessHalls from './MessHalls'
import MapPage from './MapPage'
import MenuPage from './MenuPage'
import FavoriteFoods from './FavoriteFoods'
import DailyCalories from './DailyCalories'
import RankStats from './RankStats'
import {variables} from '../Styles/Variables'

const navigationOptions = ({navigation}) => ({title: `${navigation.state.params.name}`})

const MessHallStack = createStackNavigator({
    MessHalls: {
        screen: MessHalls,
        headerMode: 'none',

        // cardStyle: {
        //     backgroundColor: 'transparent',
        // },
        // transitionConfig: (): Object => ({
        //     containerStyle: {
        //         backgroundColor: 'transparent',
        //     },
        // }),

        //transparentCard: true,
        navigationOptions: {
            title: 'Mess Halls',
            headerTitleStyle: {
                color: '#FFF',
                fontFamily: 'BlackOpsOne-Regular',
                fontSize: 30,
                //marginBottom: 15,
                fontWeight: 'normal',
            },
            // headerStyle: {
            //     backgroundColor: 'blue',
            //     height: 300
            // }
        }
    },
    MenuPage: {
        screen: MenuPage,
        navigationOptions: navigationOptions
    }
}, {
    // Default Options
    defaultNavigationOptions: {
        //headerMode: 'float',
        headerTransparent: true,
        headerStyle: {
            backgroundColor: variables.brandPrimary,
            //backgroundColor: 'transparent',
            //backgroundColor: 'red',
            //position: 'absolute', 
            //position: 'relative', 
            //backgroundColor: 'transparent', 
            // zIndex: 100, 
            // top: 0, 
            // left: 0, 
            // right: 0,
            height: 57,
            paddingTop: 0,
            paddingBottom: 15,
        },
        // header: {
        //     style: {
        //         backgroundColor: 'transparent',
        //     }
        // },
        //animationEnabled: false,
        headerTransparent: true,
        headerTitleStyle: {
            color: '#FFF',
            fontFamily: 'BlackOpsOne-Regular'
        },
        headerTintColor: '#FFF'
    }
    //mode: 'modal', headerMode: 'none',
})

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
        screen: Homepage,
        navigationOptions: {
            drawerLabel: 'HOME',
            drawerIcon: ({tintColor}) => <Icon name="home" size={28} color={tintColor}/>,
        }
    },
    MessHalls: {
        screen: MessHallStack,
        navigationOptions: {
            drawerLabel: 'MESS HALLS',
            drawerIcon: ({tintColor}) => <Icon name="restaurant" size={28} color={tintColor}/>
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            drawerLabel: 'PROFILE SETTINGS',
            drawerIcon: ({tintColor}) => <Icon name="directions-run" size={28} color={tintColor}/>
        }
    },
    DailyIntake: {
        screen: DailyCalories,
        navigationOptions: {
            drawerLabel: 'CALORIE TRACKER',
            drawerIcon: ({tintColor}) => <Icon name="calendar-check" type="material-community" size={28} color={tintColor}/>
        }
    },
    Favorites: {
        screen: FavoriteFoods,
        //screen: RankStats,
        navigationOptions: {
            drawerLabel: 'FAVORITES',
            drawerIcon: ({tintColor}) => <Icon name="heart-outline" type="material-community" size={28} color={tintColor}/>
        },
    },
    Stats: {
        screen: RankStats,
        navigationOptions: {
            drawerLabel: 'YOUR STATS',
            drawerIcon: ({tintColor}) => <Icon name="chart-bar" type="material-community" size={28} color={tintColor}/>
        },
    },
    Map: {
        screen: MapPage,
        navigationOptions: {
            drawerLabel: 'AREA MAP',
            drawerIcon: ({tintColor}) => <Icon name="person-pin-circle" size={28} color={tintColor}/>
        },
    }
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
        opacity: 0.9
      }
    }
    // navigationOptions: {
    //   headerStyle : {
    //     backgroundColor: '#f4511e',
    //     height: 300,
    //     width: 300,
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle : {
    //     color: 'white',
    //   },
    // },
  }
);

const Drawer = createAppContainer(DrawerNavigator);


const AppNavigator = createBottomTabNavigator({
    Homepage: {
        screen: Homepage,
    },
    MessHalls: {
        screen: MessHallStack,
        navigationOptions: {
            tabBarLabel: 'MESS HALLS',
            tabBarIcon: ({tintColor}) => <Icon name="restaurant" size={28} color={tintColor}/>
        }
    },
    Settings: {
        screen: Settings,
        //screen: RankStats,
        //screen: App,
        navigationOptions: {
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({tintColor}) => <Icon name="directions-run" size={28} color={tintColor}/>
        }
    },
    DailyIntake: {
        screen: DailyCalories,
        navigationOptions: {
            tabBarLabel: 'TRACKER',
            tabBarIcon: ({tintColor}) => <Icon name="calendar-check" type="material-community" size={28} color={tintColor}/>
        }
    },
    Favorites: {
        //screen: FavoriteFoods,
        screen: RankStats,
        navigationOptions: {
            tabBarLabel: 'FAVORITES',
            tabBarIcon: ({tintColor}) => <Icon name="heart-outline" type="material-community" size={28} color={tintColor}/>
        },
    },
    Map: {
        //screen: MapPage,
        screen: Drawer,
        //screen: DrawerNavigator,
        navigationOptions: {
            tabBarLabel: 'AREA MAP',
            tabBarIcon: ({tintColor}) => <Icon name="person-pin-circle" size={28} color={tintColor}/>
        },
    }
}, {

    //lazy: false,
    tabBarOptions: {
        //tabBarPosition: 'bottom',
        activeTintColor: '#FFF',
        inactiveTintColor: '#CCC',
        indicatorStyle: {
            backgroundColor: variables.brandSecond,
            height: 4,
        },
        // tabBarUnderlineStyle: {
        //     borderColor: 'blue'
        // },
        //pressColor: 'red',
        style: {
            //backgroundColor: variables.brandPrimary,
            backgroundColor: 'transparent',
            height: 75,
            // //paddingTop: 40,
            paddingTop: 15,
            // paddingBottom: 30,
            borderTopColor: '#222',
            borderTopWidth: 1,
            //paddingTop: 65,
        },
        labelStyle: {
            ...Platform.select({
                // ios: {
                //     fontSize: 14,
                // },
                android: {
                    fontSize: 11,
                },
        })
      }
    }
});

export const Tabs = createAppContainer(DrawerNavigator)
//export const Tabs = createAppContainer(AppNavigator)





