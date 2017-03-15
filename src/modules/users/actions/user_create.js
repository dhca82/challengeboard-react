

const createUserFailAction = (message) => {
  return {
    type:'CREATE_USER_FAIL',
    message
  }
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
