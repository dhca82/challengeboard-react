import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import BoardView from '../../views/board/board.jsx';
import AdminView from '../../views/admin/admin.jsx';

import '../../assets/styles/common.scss';

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={BoardView} />
        <Route path="/admin" component={AdminView} />
      </Router>
    );
  }
}
export default App
