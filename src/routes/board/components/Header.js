import React from 'react';
import Icon from '../../../components/icon/icon.jsx';
import ContextNav, { ContextNavItem } from '../../../components/contextnav/contextnav.jsx'

import './styles/header.scss';

function Header({
  boardTitle,
  activeMemberTitle,
  score,
  isAuthenticated,
  loginHandler,
  toggleLeaderboardHandler,
  signOutHandler,
  boardSlug,
  profileImage,
  displayName
}) {

  let profileTrigger;
  if(profileImage) {
    profileTrigger = <img className="header__actions__profile" src={profileImage} width="34" height="34" />
  }
  else {
    profileTrigger = (
      <div className="header__actions__profile-initials">
        {displayName.substring(0,2)}
      </div>
    )
  }


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
              <ContextNav className="header__actions__profile" customTrigger={profileTrigger} align="right">
                <ContextNavItem text="Inställningar" />
                <ContextNavItem text="Logga ut" handler={signOutHandler} />
              </ContextNav>
            </div>
          }
          {!isAuthenticated &&
            <div className="header__actions">
              <a href={`#/${boardSlug}/signin`} className="button button--outline button--small">Logga in</a>
            </div>
          }
    </header>
  );
}

export default Header;
