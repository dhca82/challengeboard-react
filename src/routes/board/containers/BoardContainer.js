import React from 'react';
import Board from '../components/board.js';
import { connect } from 'react-redux';
import { fetchBoard } from '../../../modules/boards/actions/board_fetch.js';
import { toggleCard, decrementNumberOfCompletions } from '../../../modules/boards/actions/card_update.js';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoard: (boardName, userId) => {
      dispatch(fetchBoard(boardName, userId));
    },
    onCardClick: (card) => {
      dispatch(toggleCard(card));
    },
    onDecrement: (card) => {
      dispatch(decrementNumberOfCompletions(card));
    }
  }
}
const mapStateToProps = (state) => {
  return {
    notificationMessage: state.application.errorMessage,
    board: state.board,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
