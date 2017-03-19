import React from 'react';
import Header from '../components/header.js';
import { connect } from 'react-redux';
import { toggleLeaderboard } from '../../../modules/boards/actions/leaderboard_fetch.js';
import { authenticateUser, signOut } from '../../../modules/users/actions/user_auth.js';

const mapStateToProps = (store) => {
  return {
    boardTitle: store.board.boardName,
    activeMemberTitle: store.board.boardUserFullName || `${store.board.memberCount} medlemmar`,
    score: store.board.score,
    isAuthenticated: store.auth.authenticated,
    boardSlug: store.board.boardKey,
    profileImage: store.auth.image,
    displayName: store.auth.displayName
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
    },
    signOutHandler: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
