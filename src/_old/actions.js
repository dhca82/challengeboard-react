
/*

checkIfUserIsMember(boardName, userId) {
  return new Promise((resolve, reject) => {
    return database.ref(`board-users/${boardName}/${userId}`).once('value').then((snap) => {
      resolve(snap.val() != null);
    });
  });
}

export const toggleCard = (id) => {
  return (dispatch) => {
    //dispatch(requestToggle(id))

    let newScore;
    let count;
    let updates = {};
    if(this.props.card.isIncremental || this.props.card.completed == false) {
      newScore = this.props.currentUser.score + this.props.card.points;
      count = this.props.card.numberOfCompletions + 1;
    }
    else {
      newScore = this.props.currentUser.score - this.props.card.points;
      count = null;
    }
    updates[`/users/${this.props.currentUser.key}/boards/${this.props.boardKey}/completedCards/${this.props.card.key}`] = count;
    updates[`/users/${this.props.currentUser.key}/boards/${this.props.boardKey}/score`] = newScore;
    updates[`/board-users/${this.props.boardKey}/${this.props.currentUser.key}`] = {
      score: newScore,
      username: this.props.currentUser.username,
      fullName: this.props.currentUser.fullName
    };
    database.ref().update(updates);

  }
}

export const authenticateUser = (boardName, email, password) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    checkIfUserIsMember(boardName, user.uid).then((isMember) => {
      if(isMember) {
        this.redirectUserToBoard(user.uid, boardName);
      }
      else {
        this.addUserToBoard(user.uid, boardName).then(() => this.redirectUserToBoard(user.uid, boardName));
      }
    });
  }).catch((error) => {
    console.log(error);
  });
}*/
