import React from 'react';
import FormItem from '../../components/form/form-item.jsx';
import database from '../../api/database.js';

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h2 className="tray__heading">Ange önskade uppgifter för att joina brädan</h2>
        <FormItem type="text" name="fullname" id="fullname" label="För och efternamn" inline="true" />
        <FormItem type="text" name="email" id="email" label="E-postadress" inline="true" />
        <FormItem type="text" name="password" id="password" label="Lösenord" inline="true" /><br />
        <button className="button join-tray__button" >Lets do this</button>
      </form>
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var email = form.elements['email'].value;
    var fullName = form.elements['fullname'].value;
    var password = form.elements['password'].value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((authUser) => {

      var boardUser = {
        fullName: fullName,
        score:0,
      }

      var updates = {
        [`board-users/${this.props.currentBoard.name}/${authUser.uid}`]: boardUser,
        [`users/${authUser.uid}/fullName`]: fullName,
        [`users/${authUser.uid}/boards/${this.props.currentBoard.name}`]: { score:0 }
      };
      database.ref().update(updates).then(()=> {

      });

    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }
}

export default Register;
