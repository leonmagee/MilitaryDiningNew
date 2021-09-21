console.log('this is being loaded?????')

import React from 'react'
import {
    Dimensions,
    AsyncStorage
} from 'react-native'

let {width, height} = Dimensions.get('window')

const units = {
    vw: width/100,
    vh: height/100
}

export const {vw, vh} = units
