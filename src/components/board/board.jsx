import React from 'react';
import Icon from '../icon/icon.jsx';
import Card from '../card/card.jsx';
import database from '../../api/database.js';

import './board.scss';

class Board extends React.Component {
  render() {
    var items = this.props.items.map((item) => {
      return <Card
        key={item.key}
        card={item}
        boardKey={this.props.board.key}
        currentUser={this.props.currentUser} />
    })
    return (
      <div className="cards">
        {items}
       </div>
    );
  }
}

export default Board;
