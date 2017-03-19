import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'
import { boardRoutes } from './routes/board';
import { signInRoutes } from './routes/signin';
import { authInit } from './modules/users/actions/user_auth.js';
import store from './store/store.js';

import './assets/styles/common.scss';
import './assets/styles/button.scss';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(authInit(user));
  }
});

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {signInRoutes}
      {boardRoutes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
