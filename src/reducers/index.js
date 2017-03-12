import board from './board.js';
import leaderboard from './leaderboard.js';
import auth from './auth.js';
import { combineReducers } from 'redux'

const application = (state = {}, {type, payload}) => {
  switch(type) {
    case 'RECEIVE_ERROR':
      return {
        ...state,
        errorMessage: payload
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
