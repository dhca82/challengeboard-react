import React from 'react';
import BoardContainer from './containers/BoardContainer.js';
import store from '../../store/store.js';
import { Route, Router } from 'react-router';
import { fetchBoard } from '../../modules/boards/actions/board_fetch';
import { hashHistory } from 'react-router';

const fetch = ({params}) => {
  store.dispatch(fetchBoard(params.boardName, params.userId));
}

const fetchDefault = () => {
  hashHistory.push('/meridium');
}

export const boardRoutes = (
  <Router>
    <Route path="/" component={BoardContainer} onEnter={fetchDefault} />
    <Route path="/(:boardName)" component={BoardContainer} onEnter={fetch} />
    <Route path="/(:boardName)/(:userId)" component={BoardContainer} onEnter={fetch} />
  </Router>
);
