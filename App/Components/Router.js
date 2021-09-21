import * as React from 'react';
import { Platform, Text, View, Linking } from 'react-native';
//import { createAppContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import {
  createDrawerNavigator,
  // DrawerContentScrollView,
  // DrawerItemList,
  // DrawerItem,
} from '@react-navigation/drawer';
import Homepage from './Homepage';
import Settings from './Settings';
import MessHalls from './MessHalls';
import MapPage from './MapPage';
import MenuPage from './MenuPage';
import FavoriteFoods from './FavoriteFoods';
import DailyCalories from './DailyCalories';
import TestPage from './TestPage';
import RankStats from './RankStats';
import ManagerLogin from './ManagerLogin';
import HealthVideos from './HealthVideos';
import { variables } from '../Styles/Variables';
import TestComponent from './TestComponent';

/**
 * @info Use this to add custom header and footer to drawer
 */
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList
//         inactiveTintColor="red"
//         inactiveBackgroundColor="#fff"
//         labelStyle={{ color: 'red' }}
//         {...props}
//       />
//       <DrawerItem
//         label="Help"
//         inactiveTintColor="#fff"
//         inactiveBackgroundColor="transparent"
//         onPress={() => Linking.openURL('https://mywebsite.com/help')}
//       />
//     </DrawerContentScrollView>
//   );
// }

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from 'src/screens/Home';
// import Profile from 'src/screens/Profile';
// import Contacts from 'src/screens/Contacts';

const Stack = createNativeStackNavigator();

const navTheme = {
  colors: {
    background: 'transparent',
  },
};

// const navigationOptions = ({ navigation }) => ({
//   title: `${navigation.state.params.name}`,
// });

const MessHallStack = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        //headerMode="screen"
        screenOptions={
          {
            //cardStyle: { backgroundColor: 'transparent' },
          }
        }>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Test Page"
          component={TestPage}
        />
        <Stack.Screen name="Calories" component={DailyCalories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Drawer.Navigator
        //initialRouteName="Area Map"
        initialRouteName="Home"
        //drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerActiveBackgroundColor: 'rgba(0,0,0,0.4)',
          drawerInactiveBackgroundColor: 'transparent',
          headerShown: false,
          drawerStyle: {
            //backgroundColor: 'tomato',
            //width: 170,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={Homepage}
          //options={{ headerShown: false }}
        />
        {/* <Drawer.Screen name="Mess Halls" component={MessHallStack} /> */}
        <Drawer.Screen
          name="Settings"
          component={Settings}
          // icon={({ tintColor }) => (
          //   <Icon name="directions-run" size={26} color={tintColor} />
          // )}
        />
        <Drawer.Screen name="Daily Calories" component={DailyCalories} />
        <Drawer.Screen name="Favorites" component={FavoriteFoods} />
        <Drawer.Screen name="Your Stats" component={RankStats} />
        <Drawer.Screen name="Manager Access" component={ManagerLogin} />
        <Drawer.Screen name="Health Videos" component={HealthVideos} />
        <Drawer.Screen name="Area Map" component={MapPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

//export default App;
//jexport default StackNav;
export default DrawerNav;

// const navigationOptions = ({ navigation }) => ({
//   title: `${navigation.state.params.name}`,
// });

// const MessHallStack = createStackNavigator(
//   {
//     MessHalls: {
//       screen: MessHalls,
//       // headerMode: 'none',
//       navigationOptions: {
//         // transparentCard: true,
//         title: 'Mess Halls',
//         headerTitleStyle: {
//           color: '#FFF',
//           padding: 0,
//           margin: 0,
//           fontFamily: 'BlackOpsOne-Regular',
//           fontSize: 30,
//           fontWeight: 'normal',
//         },
//       },
//     },
//     MenuPage: {
//       screen: MenuPage,
//       navigationOptions,
//     },
//   },
//   {
//     // mode: 'modal',
//     transitionConfig: () => ({
//       containerStyle: {
//         backgroundColor: 'transparent',
//       },
//     }),
//     transparentCard: true,
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: 'transparent',
//         // headerTransparent: true,
//         // height: 57,
//         // paddingTop: 0,
//         // paddingBottom: 15,
//         height: 60,
//       },
//       // headerTransparent: true,
//       headerTitleStyle: {
//         color: '#FFF',
//         fontFamily: 'BlackOpsOne-Regular',
//       },
//       headerTintColor: '#FFF',
//       //     cardStyle: {
//       //   backgroundColor: 'transparent',
//       //   opacity: 1,
//       // },
//       // transitionConfig: () => ({
//       //   containerStyle: {
//       //     backgroundColor: 'transparent',
//       //   },
//       // })
//     },
//   },
// );

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: Homepage,
//       navigationOptions: {
//         drawerLabel: 'HOME',
//         drawerIcon: ({ tintColor }) => (
//           <Icon
//             name="home"
//             type="material-community"
//             size={26}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//     MessHalls: {
//       screen: MessHallStack,
//       navigationOptions: {
//         drawerLabel: 'MESS HALLS',
//         drawerIcon: ({ tintColor }) => (
//           <Icon name="restaurant" size={26} color={tintColor} />
//         ),
//       },
//     },
//     Settings: {
//       screen: Settings,
//       navigationOptions: {
//         drawerLabel: 'PROFILE SETTINGS',
//         drawerIcon: ({ tintColor }) => (
//           <Icon name="directions-run" size={26} color={tintColor} />
//         ),
//       },
//     },
//     DailyIntake: {
//       screen: DailyCalories,
//       navigationOptions: {
//         drawerLabel: 'CALORIE TRACKER',
//         drawerIcon: ({ tintColor }) => (
//           <Icon
//             name="calendar-check"
//             type="material-community"
//             size={26}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//     Favorites: {
//       screen: FavoriteFoods,
//       navigationOptions: {
//         drawerLabel: 'FAVORITES',
//         drawerIcon: ({ tintColor }) => (
//           <Icon
//             name="heart-outline"
//             type="material-community"
//             size={26}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//     Stats: {
//       screen: RankStats,
//       navigationOptions: {
//         drawerLabel: 'YOUR STATS',
//         drawerIcon: ({ tintColor }) => (
//           <Icon
//             name="chart-bar"
//             type="material-community"
//             size={26}
//             color={tintColor}
//           />
//         ),
//       },
//     },
//     MessHallLogin: {
//       screen: ManagerLogin,
//       // screen: TestComponent,
//       navigationOptions: {
//         drawerLabel: 'MANAGER ACCESS',
//         drawerIcon: ({ tintColor }) => (
//           <Icon name="account-circle" size={26} color={tintColor} />
//         ),
//       },
//     },
//     HealthVideos: {
//       screen: HealthVideos,
//       navigationOptions: {
//         drawerLabel: 'HEALTH VIDEOS',
//         drawerIcon: ({ tintColor }) => (
//           <Icon name="youtube" type="entypo" size={26} color={tintColor} />
//         ),
//       },
//     },
//     Map: {
//       screen: MapPage,
//       navigationOptions: {
//         drawerLabel: 'AREA MAP',
//         drawerIcon: ({ tintColor }) => (
//           <Icon name="person-pin-circle" size={26} color={tintColor} />
//         ),
//       },
//     },
//   },
//   {
//     intialRouteName: 'Home',
//     drawerPosition: 'right',
//     drawerBackgroundColor: '#EEE',
//     drawerWidth: 275,
//     contentOptions: {
//       activeTintColor: variables.brandPrimary,
//       activeBackgroundColor: '#FFF',
//       inactiveTintColor: '#777',
//       iconContainerStyle: {
//         opacity: 0.9,
//         width: 35,
//       },
//     },
//   },
// );

// export const Drawer = createAppContainer(DrawerNavigator);

// export const GroupedStack = createStackNavigator({
//     Main: DrawerNavigator,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Home',  // Title to appear in status bar
//       headerLeft: <Icon color={'red'} name="person-pin-circle" size={35} onPress={ () => navigation.navigate.drawerOpen() } />
//     })
// })

// export const Drawer = createAppContainer(GroupedStack)
