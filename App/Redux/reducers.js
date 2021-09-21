import React from 'react'
import {combineReducers} from 'redux'

/**
 * Import Reducers
 */
//import {currentPageReducer} from './currentPageReducer'
import {currentMenuReducer} from './currentMenuReducer'
import {restDataReducer} from './restDataReducer'
import {restMenuItemDataReducer} from './restMenuItemDataReducer'
import {currentFavoritesReducer} from './currentFavoritesReducer'
import {currentMealsReducer} from './currentMealsReducer'
import {dailyCaloriesReducer} from './dailyCaloriesReducer'

/**
 * Combine Reducers
 */
export const reducer = combineReducers({
    //currentPage: currentPageReducer,
    currentMenu: currentMenuReducer,
    restData: restDataReducer,
    restMenuItemData: restMenuItemDataReducer,
    currentFavorites: currentFavoritesReducer,
    currentMeals: currentMealsReducer,
    dailyCalories: dailyCaloriesReducer,
})
