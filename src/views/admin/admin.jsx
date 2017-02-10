import React from 'react';
import database from '../../api/database.js';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddCard = this.handleAddCard.bind(this);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddCard}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={(input) => this.title = input } />
          <br />
          <label htmlFor="category">Category</label>
          <input type="text" id="category" ref={(input) => this.category = input } />
          <br />
          <label htmlFor="points">Points</label>
          <input type="number" id="points" ref={(input) => this.points = input } />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
  handleAddCard(e) {
    e.preventDefault();
    var boardId = '-KcACo-fYZ52HlnT7KDV';
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
}

export default AdminView
