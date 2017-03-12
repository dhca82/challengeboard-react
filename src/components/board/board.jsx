import React from 'react';
import ReactDOM from 'react-dom';
import Cards from '../cards/cards.jsx';
import Tray from '../../views/tray/tray.jsx';
import Header from '../../components/header/header.jsx';
import Leaderboard from '../leaderboard/leaderboard.jsx';
import { connect } from 'react-redux';
import { fetchBoard, clearBoardUserDetails } from '../../actions/boardActions.js';

import './board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchBoard(this.props.params.boardName, this.props.params.userId)
  }
  componentWillReceiveProps(nextProps) {
    if(this.shouldFetchBoard(nextProps)) {
      this.props.fetchBoard(nextProps.params.boardName, nextProps.params.userId);
    }
  }
  render() {
      return(
        <div>          
          <Header />
          <Cards />
          <Leaderboard />
          <Tray />
        </div>
      );
  }
  shouldFetchBoard(nextProps) {
    return (
      this.props.params.boardName != nextProps.params.boardName ||
      this.props.params.userId != nextProps.params.userId
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoard: (boardName, userId) => {
      dispatch(fetchBoard(boardName, userId));
    }
  }
}

export default connect(null, mapDispatchToProps)(Board);
