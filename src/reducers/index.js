import { combineReducers } from 'redux'
import {albumReducer} from './albumData'

const rootReducer = combineReducers({
  albumData:albumReducer
})

export default rootReducer