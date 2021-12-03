import {createStore, applyMiddleware} from 'redux';
import {composedWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const store = createStore(
    rootReducer,
    composedWithDevTools(
    applyMiddleware(thunk))

);
 export default store;