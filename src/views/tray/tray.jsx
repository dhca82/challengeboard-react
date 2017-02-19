import React from 'react';
import Register from './register.jsx';
import Login from './login.jsx';

import './tray.scss';

class Join extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        className: 'join-tray',
        showJoinForm: false,
        showLoginForm: false
      }
      this.handleJoinClick = this.handleJoinClick.bind(this);
      this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      className: 'join-tray',
      showJoinForm: false,
      showLoginForm: false
    })
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        className: 'join-tray join-tray--init'
      })
    }, 2000);
  }
  render() {
    if(this.props.isVisible == false) return null;

    let inner;
    if(this.state.showJoinForm) {
      inner = <Register currentBoard={this.props.currentBoard} />
    }
    else if(this.state.showLoginForm) {
      inner = <Login currentBoard={this.props.currentBoard} />
    }
    else {
      inner = (
        <div>
          <h2 className="tray__heading">Vill du gå med i den här brädan?</h2>
          <button className="button button--secondary join-tray__button" onClick={this.handleJoinClick}>Registrera dig</button>
          <button className="button join-tray__button" onClick={this.handleLoginClick}>Logga in</button>
        </div>
      );
    }

    return(
      <div className={this.state.className}>
        <div className="join-tray__inner">
          {inner}
        </div>
      </div>
    );
  }
  handleLoginClick(e) {
    e.preventDefault();
    this.setState({
      className: 'join-tray join-tray--expanding',
    });
    setTimeout(() => {
      this.setState({
        className: 'join-tray join-tray--expanded',
        showLoginForm: true
      });
    }, 200);
  }
  handleJoinClick(e) {
    e.preventDefault();
    this.setState({
      className: 'join-tray join-tray--expanding',
    });
    setTimeout(() => {
      this.setState({
        className: 'join-tray join-tray--expanded',
        showJoinForm: true
      });
    }, 200);
  }
}
export default Join;
