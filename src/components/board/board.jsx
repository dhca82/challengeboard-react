import React from 'react';
import Icon from '../icon/icon.jsx';
import database from '../../api/database.js';

import './board.scss';

class Board extends React.Component {
  render() {
    var items = this.props.items.map((item) => {
      return (
        <li key={item.key} onClick={this.handleCardClick.bind(this, item)}>
          {item.title} {item.completed.toString()} {item.numberOfCompletions}
        </li>
      );
    })
    return (
      <main className="board">
           <ul>
            {items}
           </ul>
      </main>
    );
  }
  handleCardClick(card) {
    var userKey = this.props.currentUser.key;
    var boardKey = this.props.board.key;
    var cardKey = card.key;
    var newScore = this.props.currentUser.score + card.points;
    var updates = {
      [`/users/${userKey}/boards/${boardKey}/completedCards/${cardKey}`]: card.numberOfCompletions + 1,
      [`/users/${userKey}/boards/${boardKey}/score`]: newScore
    };
    return database.ref().update(updates);
  }
}

export default Board;
