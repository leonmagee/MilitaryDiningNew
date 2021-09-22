import React from 'react';
//import * as React from 'react';
//import { Platform, Text, View, Linking } from 'react-native';
//import { createAppContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createStackNavigator } from '@react-navigation/stack';
//import { Icon } from 'react-native-elements';
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
import RankStats from './RankStats';
import ManagerLogin from './ManagerLogin';
import HealthVideos from './HealthVideos';
//import TestPage from './TestPage';
//import { variables } from '../Styles/Variables';
//import TestComponent from './TestComponent';

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
    <Stack.Navigator
      //headerMode="screen"
      initialRouteName="Mess Halls"
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen
        name="Mess Halls"
        component={MessHalls}
        options={
          {
            //headerShown: false,
          }
        }
      />
      <Stack.Screen name="MenuPage" component={MenuPage} />
    </Stack.Navigator>
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
        <Drawer.Screen name="Mess Hall List" component={MessHallStack} />
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

export default DrawerNav;

// export const Drawer = createAppContainer(DrawerNavigator);
