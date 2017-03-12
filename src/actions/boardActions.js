import database from './database.js';

const updateBoardWithUserData = (user, board) => {
  return {
    type: 'BOARD_UPDATED_WITH_USER_DATA',
    score: board.score,
    user: user,
    completedCards: board.completedCards
  }
}

const receiveBoard = (key, board) => {
  return {
    type: 'RECEIVE_BOARD',
    key,
    board
  }
}

const receiveBoardUserDetails = (details) => {
  return {
    type: 'RECEIVE_BOARD_USERDETAILS',
    details
  }
}

export const clearBoardUserDetails = () => {
  return {
    type: 'CLEAR_BOARD_USERDETAILS'
  }
}

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

export const fetchBoard = (board, user) => (dispatch) => {
  database.ref(`boards/${board}`).once('value').then((snap) => {
    dispatch(stopCurrentBoardWatcher());
    dispatch(receiveBoard(board, snap.val()));
    if(user) {
      dispatch(startBoardWatcher(board, user));
      dispatch(fetchBoardUserDetails(user));
    }
  });
}

export const fetchBoardUserDetails = (user) => (dispatch) => {
  database.ref(`/userdetails/${user}`).once('value', (snap) => {
    dispatch(receiveBoardUserDetails(snap.val()));
  });
}

const startBoardWatcher = (board, user) => (dispatch) => {
  database.ref(`/userboards/${user}/${board}`).on('value', (snap) => {
    dispatch(updateBoardWithUserData(user, snap.val()));
  });
}

const stopCurrentBoardWatcher = (board, user) => (dispatch, getState) => {
  let state = getState();
  database.ref(`/userboards/${state.board.user}/${state.board.boardKey}`).off();
}
