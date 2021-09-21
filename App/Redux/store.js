import {createStore, applyMiddleware} from 'redux'
import {reducer} from './reducers'

const store = createStore(reducer)

module.exports = store
