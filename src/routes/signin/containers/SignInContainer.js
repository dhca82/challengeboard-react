import React from 'react';
import SignIn from '../components/SignIn.js'
import { connect } from 'react-redux';
import { authenticateUser } from '../../../modules/users/actions/user_auth.js';

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticateUser: (email, password) => dispatch(authenticateUser(email, password, ownProps.params.boardName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
