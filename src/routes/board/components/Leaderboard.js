import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './styles/leaderboard.scss';

function Leaderboard({items, isFetching, isExpanded}) {
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionName="leaderboard-transition"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={200}>
      {renderLeaderboard()}
    </ReactCSSTransitionGroup>
  );

  function renderLeaderboard() {
    if(isExpanded) {
      return [
        <div key="leaderboard" className={isFetching && items.length == 0 ? 'leaderboard leaderboard--loading' : 'leaderboard'}>
          <table className="leaderboard__result">
            <tbody>
              {renderItems()}
            </tbody>
          </table>
        </div>
      ];
    }
    return [];
  }

  function renderItems() {
    return items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{item.fullName}</td>
          <td>{item.score}</td>
        </tr>
      )
    });
  }
}

export default Leaderboard;
