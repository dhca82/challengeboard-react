import database from '../../database.js';

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

export const fetchBoard = (boardId, userId) => (dispatch, getState) => {
  if(getState().board.boardKey == boardId && userId) {
    dispatch(switchUser(userId))
    return;
  }
  database.ref(`boards/${boardId}`).once('value').then((snap) => {
    dispatch(stopCurrentBoardWatcher());
    dispatch(receiveBoard(boardId, snap.val()));
    if(userId) {
      dispatch(startBoardWatcher(boardId, userId));
      dispatch(fetchBoardUserDetails(userId));
    }
  });
}

const switchUser = (userId) => (dispatch, getState) => {
  dispatch(stopCurrentBoardWatcher());
  dispatch(startBoardWatcher(getState().board.boardKey, userId));
  dispatch(fetchBoardUserDetails(userId));
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
