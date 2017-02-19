import React from 'react';
import Header from '../../components/header/header.jsx';
import Board from '../../components/board/board.jsx';
import Leaderboard from '../leaderboard/leaderboard.jsx';
import Tray from '../tray/tray.jsx';
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
  componentWillReceiveProps(nextProps) {
    database.ref('/users/' + this.props.params.userId).off();
    this.initBoard(nextProps);
  }
  componentDidMount() {
    this.initBoard();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} currentBoard={this.state.board} handleToggleLeaderboard={this.toggleLeaderboard} isLeaderboardExpanded={this.state.showLeaderboard} />
        <Board items={this.state.items} board={this.state.board} currentUser={this.state.currentUser} handleCardClick={this.updateCard} />
        <Leaderboard isVisible={this.state.showLeaderboard} items={this.state.leaderboardItems} />
        <Tray isVisible={typeof this.props.params.userId === 'undefined'} currentBoard={this.state.board} />
      </div>
    );
  }

  initBoard(props) {
    props = props || this.props;
    var boardName = props.params.boardName;
    firebase.auth().onAuthStateChanged((currentUser) => {
      if(currentUser != null || typeof props.params.userId !== 'undefined') {
        if(typeof props.params.userId !== 'undefined') {
          console.log('Init board for url', props.params.userId);
          this.initBoardForUser(props.params.userId, boardName);
          return;
        }
        else {
          console.log('Init board for auth');
          this.initBoardForUser(currentUser.uid, boardName);
          return;
        }
      }
      this.initBoardWithoutUser(boardName);
    });
  }

  initBoardWithoutUser(boardName) {
    database.ref('/boards/' + boardName).once('value').then((snapshot) => {
      var board = snapshot.val();
      this.setState({
        currentUser: {},
        board : {
          key: boardName,
          name: boardName
        },
        items: Object.keys(board.cards).map((key) => {
          var card = board.cards[key];
          return {
            key: key,
            title: card.title,
            category: card.category,
            points: card.points || 0,
            completed: false,
            isIncremental: card.isIncremental || false,
            numberOfCompletions: 0
          }
        })
      });
    });
  }

  initBoardForUser(userId, boardName) {
    database.ref('/users/' + userId).on('value', (userSnapshot) => {
      database.ref('/boards/' + boardName).once('value').then((boardSnapshot) => {
        var user = userSnapshot.val();
        var board = boardSnapshot.val();
        var userBoard = user.boards[boardName];
        var completedCards = userBoard.completedCards || [];

        this.setState({
          currentUser: {
            key: userId,
            username: userId,
            fullName: user.fullName,
            score: userBoard.score
          },
          board : {
            key: boardName,
            name: boardName
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
