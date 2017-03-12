import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import database from '../../api/database.js';
import './leaderboard.scss';
import { toggleLeaderboard } from '../../actions';

class Leaderboard extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
    let items = this.props.items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{item.fullName}</td>
          <td>{item.score}</td>
        </tr>
      )
    });

    let leaderboardContainer;
    if(this.props.isVisible) {
      leaderboardContainer = [
        <div key="leaderboard" className="leaderboard">
          <table className="leaderboard__result">
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
      ];
    }
    else {
      leaderboardContainer = [];
    }

    return(
      <ReactCSSTransitionGroup
        component="div"
        transitionName="leaderboard-transition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}>
        {leaderboardContainer}
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isVisible: store.isLeaderboardExpanded,
    items: leaderboard
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeaderboard: dispatch(toggleLeaderboard)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
