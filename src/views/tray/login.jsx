import React from 'react';
import FormItem from '../../components/form/form-item.jsx';
import database from '../../api/database.js';
import { hashHistory } from 'react-router';

class Login extends React.Component {
  constructor(props) {
      super(props);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h2 className="tray__heading">Logga in med en befintlig användare</h2>
        <FormItem type="text" name="email" id="email" label="E-postadress" inline="true" />
        <FormItem type="text" name="password" id="password" label="Lösenord" inline="true" /><br />
        <button className="button join-tray__button" >Logga in</button>
      </form>
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var email = form.elements['email'].value;
    var password = form.elements['password'].value;
    var boardName = this.props.currentBoard.name;

    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      this.checkIfUserIsMember(boardName, user.uid).then((isMember) => {
        if(isMember) {
          this.redirectUserToBoard(user.uid, boardName);
        }
        else {
          this.addUserToBoard(user.uid, boardName).then(() => this.redirectUserToBoard(user.uid, boardName));
        }
      });
    }).catch((error) => {
      this.handleLoginError(error);
    });
  }

  redirectUserToBoard(userId, boardName) {
      //hashHistory.push(`/${boardName}`);
  }

  checkIfUserIsMember(boardName, userId) {
    return new Promise((resolve, reject) => {
      return database.ref(`board-users/${boardName}/${userId}`).once('value').then((snap) => {
        resolve(snap.val() != null);
      });
    });
  }

  addUserToBoard(userId, boardName) {
    return new Promise((resolve, reject) => {
      database.ref(`users/${userId}`).once('value').then((snap) => {
        var user = snap.val();
        var updates = {
          [`board-users/${boardName}/${userId}`]: { fullName: user.fullName, score:0 },
          [`users/${userId}/boards/${boardName}`]: { score:0 }
        };
        database.ref().update(updates).then(() => resolve());
      });
    })
  }

  handleLoginError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  }
}

export default Login;
