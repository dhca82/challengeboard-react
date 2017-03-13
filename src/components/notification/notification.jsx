import React from 'react';

import './notification.scss';

class Notification extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="notification" onClick={this.props.clearHandler}>
        <div>{this.props.message}</div>
      </div>
    )
  }
}

export default Notification;
