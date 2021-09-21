import React from 'react'

import {SET_DAILY_CALORIES} from './actions'

/**
 * restDataReducer
 * Returns data from rest endpoint
 */
export const dailyCaloriesReducer = (state = null, action) => {
  switch (action.type) {
    case SET_DAILY_CALORIES:
      return action.payload;
      break;
    default:
      return state;
  }
}
