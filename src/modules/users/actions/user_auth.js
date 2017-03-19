import database from '../../database.js';
import { hashHistory } from 'react-router';

const signInSuccessAction = (user) => {
  return {
    type:'SIGN_IN_SUCCESS',
    payload: user
  }
}

export const authInit = (user) => {
  return {
    type:'AUTH_INIT',
    payload: user
  }
}

const signInFailAction = (message) => {
  return {
    type:'SIGN_IN_FAIL',
    payload: message
  }
}

const signOutAction = () => {
  return {
    type:'SIGN_OUT_SUCCESS'
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

export const authenticateUser = (email, password, boardId) => (dispatch, getState) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    dispatch(signInSuccessAction(user));
    hashHistory.push(`/${boardId ? boardId : getState().board.boardKey}/${user.uid}`)
  }).catch((error) => {
    dispatch(signInFailAction(error));
  });
}

export const signOut = () => (dispatch) => {
  firebase.auth().signOut().then(() => {
    dispatch(signOutAction());
  })
}
