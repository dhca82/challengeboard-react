import database from './database.js';
import { hashHistory } from 'react-router';
import { fetchBoard } from './boardActions';

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

const createUserFailAction = (message) => {
  return {
    type:'CREATE_USER_FAIL',
    message
  }
}

const receiveApplicationError = (message) => {
  return {
    type: 'RECEIVE_ERROR',
    payload: message
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

export const createUserAndAddToBoard = (board, email, password, fullName)  => (dispatch) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then((authUser) => {
    var updates = {
      [`userdetails/${authUser.uid}`]: { fullName },
      [`userboards/${authUser.uid}/${board}`]: { score:0 },
      [`leaderboards/${board}/${authUser.uid}`]: { fullName, score:0 }
    };
    database.ref().update(updates).then(()=> {
      dispatch(authenticateUser(email, password));
    });
  }).catch((error) => {
    let message;
    switch(error.code) {
      case 'auth/email-already-in-use': message = 'Det finns ett konto med samma e-postadress';
      default: message = error.message
    }
    dispatch(receiveApplicationError(message));
  });
};
