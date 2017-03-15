import React from 'react';
import FormItem from '../../components/form/form-item.jsx';
import { createUserAndAddToBoard } from '../../actions/authActions.js';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

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
    this.props.createUserAndAddToBoard(this.props.boardKey, email, password, fullName);
  }
}

const mapStateToProps = (state) => {
  return {
    boardKey: state.board.boardKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUserAndAddToBoard: (board, email, password, fullName) => {
      dispatch(createUserAndAddToBoard(board, email, password, fullName));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
