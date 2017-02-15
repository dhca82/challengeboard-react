import React from 'react';
import Header from '../../components/header/header.jsx';
import Board from '../../components/board/board.jsx';
import Leaderboard from '../leaderboard/leaderboard.jsx';
import database from '../../api/database.js';

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      items:[],
      currentUser: {},
      leaderboardItems: [],
      showLeaderboard: false
    };
    this.toggleLeaderboard = this.toggleLeaderboard.bind(this);
  }
  componentDidMount() {
    var userId = '-KcACniavRnb5WMBgVZq';
    var boardId = '-KcACo-fYZ52HlnT7KDV';

    database.ref('/users/' + userId).on('value', (userSnapshot) => {
      database.ref('/boards/' + boardId).once('value').then((boardSnapshot) => {
        var user = userSnapshot.val();
        var board = boardSnapshot.val();
        var userBoard = user.boards[boardId];
        var completedCards = userBoard.completedCards || [];

        this.setState({
          currentUser: {
            key: userId,
            username: user.username,
            fullName: user.fullName,
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
              completed: completedCards[key] ? true : false,
              isIncremental: card.isIncremental || false,
              numberOfCompletions: completedCards[key] || 0
            }
          })
        });
      });
    });
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} handleToggleLeaderboard={this.toggleLeaderboard} isLeaderboardExpanded={this.state.showLeaderboard} />
        <Board items={this.state.items} board={this.state.board} currentUser={this.state.currentUser} handleCardClick={this.updateCard} />
        <Leaderboard isVisible={this.state.showLeaderboard} items={this.state.leaderboardItems} />
      </div>
    );
  }
  toggleLeaderboard(e) {
    e.preventDefault();
    if(this.state.showLeaderboard) {
      this.setState({ showLeaderboard: false });
      database.ref('board-users/' + this.state.board.key).off();
    }
    else {
      this.setState({ showLeaderboard: true });
      this.fetchLeaderboardItemsAndAttachListener();
    }
  }
  fetchLeaderboardItemsAndAttachListener() {
    database.ref('board-users/' + this.state.board.key).orderByChild('score').limitToLast(10).on('value', (snapshot) => {
      var leadboardSnapshot = snapshot.val();
      var items = Object.keys(leadboardSnapshot).map((key) => {
        var item = leadboardSnapshot[key];
        return {
          key: key,
          score: item.score,
          fullName: item.fullName,
          slug: item.username
        }
      });
      this.setState({
        leaderboardItems: items
      });
    });
  }
}

export default BoardView;
