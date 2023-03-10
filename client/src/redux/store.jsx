import {createStore, compose,applyMiddleware } from 'redux'
import thunkMiddleware  from 'redux-thunk'
import rootReducer from './reducer'

const conposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,
    conposeEnhancer(applyMiddleware(thunkMiddleware)) 
    )

export default store