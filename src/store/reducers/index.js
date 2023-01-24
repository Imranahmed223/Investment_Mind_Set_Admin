import {combineReducers} from 'redux';
import authReducer from './auth.reducer'
import newsReducer from './news.reducers'
import analysicReducer from './analysics.reducers'
import stockReducer from './stock.reducers'


const rootReducer=combineReducers({
    authReducer,
    newsReducer,
    analysicReducer,
    stockReducer

})

export default rootReducer;