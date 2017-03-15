import board from './boards/reducers/board.js';
import leaderboard from './boards/reducers/leaderboard.js';
import auth from './users/reducers/user.js';
import { combineReducers } from 'redux'

const application = (state = {}, {type, payload}) => {
  switch(type) {
    case 'RECEIVE_ERROR':
      return {
        ...state,
        errorMessage: payload
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        errorMessage: null
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  application,
  board,
  leaderboard,
  auth
})

export default rootReducer;
