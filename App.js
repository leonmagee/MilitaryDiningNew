import React from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  StyleSheet,
  LogBox,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './App/Redux/store';
import Drawer from './App/Components/Router';

LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  const backgroundStyle = {
    width: '100%',
    height: '100%',
  };

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
  });

  return (
    <Provider store={store}>
      <View style={styles.wrapper}>
        <StatusBar hidden />
        <ImageBackground
          style={backgroundStyle}
          resizeMode="cover"
          source={require('./App/Assets/Images/camo_2.png')}>
          <Drawer />
        </ImageBackground>
        {/* <BackgroundGeofences /> */}
      </View>
    </Provider>
  );
};

export default App;
