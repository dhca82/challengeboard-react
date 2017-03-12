import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import BoardView from '../../views/board/board.jsx';
import AdminView from '../../views/admin/admin.jsx';
import RegisterView from '../../views/register/register.jsx';

import '../../assets/styles/common.scss';

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/admin" component={AdminView} />
        <Route path="/(:boardName)/(:userId)" component={BoardView} />
        <Route path="/(:boardName)" component={BoardView} />
        <Route path="/" component={RegisterView} />
      </Router>
    );
  }
}
export default App
