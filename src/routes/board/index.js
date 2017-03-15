import React from 'react';
import BoardContainer from './containers/BoardContainer.js';
import store from '../../store/store.js';
import { Route, Router } from 'react-router';
import { fetchBoard } from '../../modules/boards/actions/board_fetch';

const onLoad = ({params}) => {
  store.dispatch(fetchBoard(params.boardName, params.userId));
}

export const boardRoutes = (
  <Router>
    <Route path="/(:boardName)" component={BoardContainer} onEnter={onLoad} />
    <Route path="/(:boardName)/(:userId)" component={BoardContainer} onEnter={onLoad} />
  </Router>
);
