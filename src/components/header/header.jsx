import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../icon/icon.jsx';

import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header">
          <div className="header__user">
              {this.props.currentUser.fullName}
              <span className="header__user__signedin"></span>
          </div>
          <strong className="header__score" id="intro-score">{this.props.currentUser.score}</strong>
          <div className="header__actions">
              <button className="header__actions__icon" onClick={this.props.handleToggleLeaderboard}>
                  <Icon visible={!this.props.isLeaderboardExpanded} name="star" />
                  <Icon visible={this.props.isLeaderboardExpanded} name="cross" />
              </button>
              <button className="header__actions__icon">
                <Icon visible={true} name="bell" />
              </button>
          </div>
      </header>
    );
  }
}

export default Header;
