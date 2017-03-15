import database from '../../database.js';

export const decrementNumberOfCompletions = (card) => (dispatch) => {
  dispatch(toggleCard(card, -1));
}

export const toggleCard = (card, increment = 1) => (dispatch, getState) => {
  let state = getState();
  let user = state.board.user;
  let score = state.board.score;
  let board = state.board.boardKey;
  let newScore;
  let count;
  let updates = {};

  if(card.isIncremental || card.completed == false) {
    newScore = score + (card.points * increment);
    count = card.numberOfCompletions + increment;
  }
  else {
    newScore = score - card.points;
    count = null;
  }

  updates[`/userboards/${user}/${board}/completedCards/${card.key}`] = count;
  updates[`/userboards/${user}/${board}/score`] = newScore;
  updates[`/leaderboards/${board}/${user}/score`] = newScore;
  database.ref().update(updates);
}
