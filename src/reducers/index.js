import { combineReducers } from 'redux'
import item from './item'
import wardrobe from './wardrobe'
import auth from './auth'

export default combineReducers({
    item,
    wardrobe,
    auth
})

