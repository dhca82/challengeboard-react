import React from 'react';
import database from '../../api/database.js';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleAddBoard = this.handleAddBoard.bind(this);
    this.handleAddUserToBoard = this.handleAddUserToBoard.bind(this);
  }
  render() {
    return (
      <div>
        <h2>Add card</h2>
        <form onSubmit={this.handleAddCard}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={(input) => this.title = input } />
          <br />
          <label htmlFor="category">Category</label>
          <input type="text" id="category" ref={(input) => this.category = input } />
          <br />
          <label htmlFor="points">Points</label>
          <input type="number" id="points" ref={(input) => this.points = input } />
          <br/>
          <label htmlFor="cardboard">Board</label>
          <input type="text" id="cardboard" ref={(input) => this.cardBoard = input } />
          <br />
          <input type="submit" value="Add" />
        </form>

        <h2>Add user</h2>
        <form onSubmit={this.handleAddUser}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={(input) => this.username = input } />
          <br />
          <label htmlFor="fullname">Full name</label>
          <input type="text" id="fullname" ref={(input) => this.fullname = input } />
          <input type="submit" value="Add" />
        </form>

        <h2>Add board</h2>
        <form onSubmit={this.handleAddBoard}>
          <label htmlFor="username">Board name</label>
          <input type="text" id="boardname" ref={(input) => this.boardname = input } />
          <br />
          <input type="submit" value="Add" />
        </form>

        <h2>Add user to board</h2>
        <form onSubmit={this.handleAddUserToBoard}>
          <label htmlFor="username">Username</label>
          <input type="text" id="boardname" ref={(input) => this.boardUser = input } />
          <label htmlFor="username">Board name</label>
          <input type="text" id="boardname" ref={(input) => this.userBoard = input } />
          <br />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
  handleAddCard(e) {
    e.preventDefault();
    var boardId = this.cardBoard.value;
    var card =  {
      title: this.title.value,
      category: this.category.value,
      points: parseInt(this.points.value)
    }

    var cardKey = firebase.database().ref().child(`boards/${boardId}/cards`).push().key;
    var updates = {
      [`boards/${boardId}/cards/${cardKey}`]: card
    };
    database.ref().update(updates).then(()=> {
      this.title.value = this.category.value = this.points.value = '';
      this.title.focus();
    });
  }
  handleAddUser(e) {
    e.preventDefault();
    var newUser =  {
      fullName: this.fullname.value,
      isAdmin: false
    }
    var cardKey = firebase.database().ref().child(`users/${this.username.value}`).set(newUser);
  }
  handleAddBoard(e) {
    e.preventDefault();
    var newUser =  {
      isPublic: true
    }
    var cardKey = firebase.database().ref().child(`boards/${this.boardname.value}`).set(newUser);
  }
  handleAddUserToBoard(e) {
    e.preventDefault();

    database.ref(`users/${this.boardUser.value}`).once('value').then((snap) => {
      var user = snap.val();
      var boardUser = {
        fullName: user.fullName,
        score:0
      }
      var userBoard = {
        score:0
      }
      var updates = {
        [`board-users/${this.userBoard.value}/${this.boardUser.value}`]: boardUser,
        [`users/${this.boardUser.value}/boards/${this.userBoard.value}`]: userBoard
      };
      database.ref().update(updates).then(()=> {
        this.boardUser.value = this.userBoard.value =  '';
      });
    })
  }
}

export default AdminView
