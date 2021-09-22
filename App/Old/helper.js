console.log('this is being loaded?????');

import React from 'react';
import { Dimensions } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

let { width, height } = Dimensions.get('window');

const units = {
  vw: width / 100,
  vh: height / 100,
};

export const { vw, vh } = units;
