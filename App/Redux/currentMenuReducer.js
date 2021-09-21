import React from 'react'

import {MESS_HALL_MENU} from './actions'

/**
 * Sets the current menu
 */
export const currentMenuReducer = (state = null, action) => {
  switch (action.type) {
    case MESS_HALL_MENU:
      return action.payload;
      break;
    default:
      return state;
  }
}
