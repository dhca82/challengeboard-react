import React from 'react';
import Leaderboard from '../components/Leaderboard.js';
import { switchUser } from '../../../modules/boards/actions/board_fetch.js';
import { toggleLeaderboard } from '../../../modules/boards/actions/leaderboard_fetch.js';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => {
  return {
    boardKey: state.board.boardKey,
    items: state.leaderboard.items,
    isExpanded: state.leaderboard.isLeaderboardExpanded,
    isFetching: state.leaderboard.isLeaderboardFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeaderboard: () =>  dispatch(toggleLeaderboard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
