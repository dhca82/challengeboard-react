import React from 'react';
import Header from '../../components/header/header.jsx';
import Board from '../../components/board/board.jsx';
import database from '../../api/database.js';

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      items:[],
      currentUser: {}
    };
  }
  componentDidMount() {
    var userId = '-KcACniavRnb5WMBgVZq';
    var boardId = '-KcACo-fYZ52HlnT7KDV';

    database.ref('/users/' + userId).on('value', (userSnapshot) => {
      database.ref('/boards/' + boardId).once('value').then((boardSnapshot) => {
        var user = userSnapshot.val();
        var board = boardSnapshot.val();
        var userBoard = user.boards[boardId];

        this.setState({
          currentUser: {
            key: userId,
            username: user.username,
            score: userBoard.score
          },
          board : {
            key: boardId,
            slug: board.slug,
            name: board.name
          },
          items: Object.keys(board.cards).map((key) => {
            var card = board.cards[key];
            return {
              key: key,
              title: card.title,
              category: card.category,
              points: card.points || 0,
              completed: true,
              numberOfCompletions: userBoard.completedCards[key] || 0
            }
          })
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Board items={this.state.items} board={this.state.board} currentUser={this.state.currentUser} handleCardClick={this.updateCard} />
      </div>
    );
  }
}

export default BoardView;
