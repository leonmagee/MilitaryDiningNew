import React from 'react'

import {SET_MENU_ITEMS_DATA_VALUE} from './actions'

/**
 * restDataReducer
 * Returns data from rest endpoint
 */
export const restMenuItemDataReducer = (state = null, action) => {
  switch (action.type) {
    case SET_MENU_ITEMS_DATA_VALUE:
      return action.payload;
      break;
    default:
      return state;
  }
}
