import React from 'react';
import Icon from '../icon/icon.jsx';
import Card from '../card/card.jsx';
import { connect } from 'react-redux';
import { toggleCard, decrementNumberOfCompletions } from '../../actions/boardActions.js';

import './cards.scss';

function Cards({user, items, onCardClick, onDecrement}) {
  var items = items.map((item) => {
    return <Card key={item.key} card={item} onCardClick={onCardClick.bind(this, item)} handleDecrement={onDecrement.bind(this, item)} />
  })
  return (
    <div className="cards">
      {items}
     </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClick: (card) => {
      dispatch(toggleCard(card));
    },
    onDecrement: (card) => {
      dispatch(decrementNumberOfCompletions(card));
    }
  }
}

const mapStateToProps = (store) => {
  return {
    items: store.board.items,
    user: store.board.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
