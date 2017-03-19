import React from 'react';
import SignInContainer from './containers/SignInContainer.js';
import { Route, Router } from 'react-router';

export const signInRoutes = (
  <Router>
    <Route path="/signin" component={SignInContainer} />
    <Route path="/(:boardName)/signin" component={SignInContainer} />
  </Router>
);
