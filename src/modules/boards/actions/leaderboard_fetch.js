import database from '../../database.js';

const showLeaderboard = () => {
  return {
    type: 'SHOW_LEADERBOARD'
  }
}
const hideLeaderboard = () => {
  return {
    type: 'HIDE_LEADERBOARD'
  }
}

const receiveLeaderboard = (items) => {
  return {
    type: 'RECEIVE_LEADERBOARD',
    payload: items
  }
}

const requestLeaderboard = () => {
  return {
    type: 'REQUEST_LEADERBOARD'
  }
}

export const toggleLeaderboard = () => (dispatch, getState) => {
    var state = getState();
    if(!state.leaderboard.isLeaderboardExpanded) {
      dispatch(showLeaderboard());
      dispatch(startLeaderboardWatcher(state.board.boardKey));
    }
    else {
      dispatch(hideLeaderboard());
      dispatch(stopLeaderboardWatcher(state.board.boardKey));
    }
}

const startLeaderboardWatcher = (board) => (dispatch) => {
  dispatch(requestLeaderboard());
  database.ref(`/leaderboards/${board}`).orderByChild('score').limitToLast(10).on('value', (snap) => {
    let items = [];
    snap.forEach((child) => {
      let item = child.val();
      items.push({
        key: child.key,
        score: item.score,
        fullName: item.fullName,
      });
    });
    dispatch(receiveLeaderboard(items.reverse()));
  });
}

const stopLeaderboardWatcher = (board) => (dispatch) => {
  database.ref(`/leaderboards/${board}`).off();
}
