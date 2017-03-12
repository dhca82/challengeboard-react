import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers'
import thunkMiddleware from 'redux-thunk';

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware
  ),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

var store = createStore(
  reducer,
  {},
  enhancer
);

export default store;
