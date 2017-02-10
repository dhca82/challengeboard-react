import React from 'react';
import ReactDOM from 'react-dom';

import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        Score: {this.props.currentUser.score}
      </header>
    );
  }
}

export default Header;
