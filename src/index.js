import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'
import store from './store/store.js';
import { boardRoutes } from './routes/board';

import './assets/styles/common.scss';
import './assets/styles/button.scss';

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {boardRoutes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
