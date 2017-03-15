import React from 'react';
import Header from '../components/header.js';
import { connect } from 'react-redux';
import { toggleLeaderboard } from '../../../modules/boards/actions/leaderboard_fetch.js';
import { authenticateUser } from '../../../modules/users/actions/user_auth.js';

const mapStateToProps = (store) => {
  return {
    boardTitle: store.board.boardName,
    activeMemberTitle: store.board.boardUserFullName || '10 medlemmar',
    score: store.board.score,
    isAuthenticated: store.auth.authenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleLeaderboardHandler: (e) => {
      e.preventDefault();
      dispatch(toggleLeaderboard())
    },
    loginHandler: (email, password) => {
      dispatch(authenticateUser('dhca82@gmail.com', 'hallon'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
