const leaderboard = (state = {
  isLeaderboardExpanded: false,
  isLeaderboardFetching: false,
  items: []
 }, action) => {
  switch(action.type) {
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
        items: Object.keys(action.leaderboard).map((key) => {
          const item = action.leaderboard[key];
          return {
            key: key,
            score: item.score,
            fullName: item.fullName,
            slug: item.username
          }
        })
      }
    default: return state;
  }
}

export default leaderboard;
