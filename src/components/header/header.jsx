import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../icon/icon.jsx';
import { connect } from 'react-redux';
import { toggleLeaderboard } from '../../actions/leaderboardActions.js';
import { authenticateUser } from '../../actions/authActions.js';

import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header">
          <div className="header__title">
              <h1 className="header__title__board">
                {this.props.boardName}
              </h1>
              <a href="#" className="header__title__user" onClick={this.props.toggleLeaderboard}>
                {this.props.boardUserFullName}
                <Icon visible={true} name="chevron" />
              </a>
          </div>
          <strong className="header__score" id="intro-score">{this.props.score}</strong>
            {this.props.isAuthenticated &&
              <div className="header__actions header__actions--authenticated">
                <button className="header__actions__icon">
                  <Icon visible={true} name="bell" />
                </button>
                <img className="header__actions__profile" src="/images/profile.png" width="34" height="34" />
              </div>
            }
            {!this.props.isAuthenticated &&
              <div className="header__actions">
                <button className="button button--outline button--small" onClick={this.props.authenticateUser}>Logga in</button>
              </div>
            }
      </header>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    boardName: store.board.boardName,
    boardUserFullName: store.board.boardUserFullName || '10 medlemmar',
    score: store.board.score,
    isAuthenticated: store.auth.authenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleLeaderboard: (e) => {
      e.preventDefault();
      dispatch(toggleLeaderboard())
    },
    authenticateUser: (email, password) => {
      dispatch(authenticateUser('dhca82@gmail.com', 'hallon'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
