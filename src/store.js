import reducers from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    reducers, 
    {}, 
    composeWithDevTools(compose(applyMiddleware(thunkMiddleware, loggingMiddleware)))
);
export default store;