import React from 'react';
import { View, Text, StatusBar, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import store from './App/Redux/store';
import Drawer from './App/Components/Router';

// const App = () => {
//   return (
//     <View>
//       <Text>Hello World</Text>
//     </View>
//   );
// };

const AppNew = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, backgroundColor: '#222' }}>
        <StatusBar hidden />
        <ImageBackground
          style={{ width: '100%', height: '100%' }}
          source={require('./App/Assets/Images/camo_2.png')}>
          <Drawer />
        </ImageBackground>
        {/* <BackgroundGeofences /> */}
      </View>
    </Provider>
  );
};

export default AppNew;
