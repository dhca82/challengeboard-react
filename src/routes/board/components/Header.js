import React from 'react';
import Icon from '../../../components/icon/icon.jsx';

import './styles/header.scss';

function Header({
  boardTitle,
  activeMemberTitle,
  score,
  isAuthenticated,
  loginHandler,
  toggleLeaderboardHandler
}) {
  return (
    <header className="header">
        <div className="header__title">
            <h1 className="header__title__board">
              {boardTitle}
            </h1>
            <a href="#" className="header__title__user" onClick={toggleLeaderboardHandler}>
              {activeMemberTitle}
              <Icon visible={true} name="chevron" />
            </a>
        </div>
        <strong className="header__score" id="intro-score">{score}</strong>
          {isAuthenticated &&
            <div className="header__actions header__actions--authenticated">
              <button className="header__actions__icon">
                <Icon visible={true} name="bell" />
              </button>
              <img className="header__actions__profile" src="/images/profile.png" width="34" height="34" />
            </div>
          }
          {!isAuthenticated &&
            <div className="header__actions">
              <button className="button button--outline button--small" onClick={loginHandler}>Logga in</button>
            </div>
          }
    </header>
  );
}

export default Header;
