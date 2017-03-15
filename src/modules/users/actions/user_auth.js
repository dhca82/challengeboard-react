import database from '../../database.js';
import { hashHistory } from 'react-router';

const signInSuccessAction = (user) => {
  return {
    type:'SIGN_IN_SUCCESS',
    user
  }
}

const signInFailAction = (message) => {
  return {
    type:'SIGN_IN_FAIL',
    message
  }
}


const receiveApplicationError = (message) => {
  return {
    type: 'RECEIVE_ERROR',
    payload: message
  }
}

export const clearApplicationError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

export const authenticateUser = (email, password) => (dispatch, getState) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    dispatch(signInSuccessAction(user));
    //TODO: Check if trying to push to same url
    hashHistory.push(`/${getState().board.boardKey}/${user.uid}`)
  }).catch((error) => {
    dispatch(signInFailAction(error));
  });
}
