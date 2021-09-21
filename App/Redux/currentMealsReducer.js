import React from 'react'

import {SET_MEALS} from './actions'

/**
 * Sets the current meals
 */
export const currentMealsReducer = (state = null, action) => {
  switch (action.type) {
    case SET_MEALS:
      return action.payload;
      break;
    default:
      return state;
  }
}
