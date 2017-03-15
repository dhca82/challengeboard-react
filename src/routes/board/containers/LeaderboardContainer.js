import React from 'react';
import Leaderboard from '../components/Leaderboard.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    items: state.leaderboard.items,
    isExpanded: state.leaderboard.isLeaderboardExpanded,
    isFetching: state.leaderboard.isLeaderboardFetching
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
