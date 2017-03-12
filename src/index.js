import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board/board.jsx';
import Start from './views/start/index.jsx';
import SignIn from './views/signin/signin.jsx';
import Register from './views/register/register.jsx';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router'
import store from './store/store.js';

import './assets/styles/common.scss';
import './assets/styles/button.scss';

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Start} />
    <Route path="/signin" component={SignIn} />
    <Route path="/register" component={Register} />
    <Route path="/(:boardName)/(:userId)" component={Board} />
    <Route path="/(:boardName)" component={Board} />
  </Router>
  /*<Router history={hashHistory}>
     <Route path="/" component={Board}>
       <Route path=":boardName" component={Board}>
         <Route path=":userId" component={Board} />
       </Route>
     </Route>
   </Router>*/
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
  );
}

store.subscribe(render);
render();
