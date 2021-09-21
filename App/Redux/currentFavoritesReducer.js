import React from 'react'

import {SET_FAVORITES} from './actions'

/**
 * Sets the current favorites
 */
export const currentFavoritesReducer = (state = null, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload;
      break;
    default:
      return state;
  }
}
