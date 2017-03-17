const leaderboard = (state = {
  isLeaderboardExpanded: false,
  isLeaderboardFetching: false,
  items: []
}, {type, payload}) => {
  switch(type) {
    case 'SHOW_LEADERBOARD':
      return {
        ...state,
        isLeaderboardExpanded: true,
        isLeaderboardFetching: true
      }
    case 'HIDE_LEADERBOARD':
      return {
        ...state,
        isLeaderboardExpanded: false,
        leaderboard: []
      }
    case 'RECEIVE_LEADERBOARD':
      return {
        ...state,
        isLeaderboardFetching: false,
        items: payload
      }
    default: return state;
  }
}

export default leaderboard;
