import React from 'react';
import ReactDOM from 'react-dom';

import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
          <div className="header__user">
              {this.props.currentUser.fullName}
              <span className="header__user__signedin"></span>
          </div>
          <strong className="header__score" id="intro-score">{this.props.currentUser.score}</strong>
          <div className="header__actions">
              <button className="header__actions__icon" id="leaderboard-toggle">
                  <span className="icon icon-star"></span>
              </button>
              <button className="header__actions__icon" id="notifications-toggle">
                  <span className="icon icon-bell"></span>
              </button>
          </div>
      </header>
    );
  }
}

export default Header;
