import React from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import Card from './Card.js';
import LeaderboardContainer from '../containers/LeaderboardContainer.js';

import './styles/board.scss';

function Board({board, notificationMessage, toggleCard, onDecrement, leaderboardItems, leaderboardVisible}) {
  let cards = board.cards.map((card) => {
    return <Card key={card.key}
      card={card}
      toggleCard={toggleCard.bind(this, card)}
      handleDecrement={onDecrement.bind(this, card)} />
  })
  return (
    <div>
      <HeaderContainer />
      <LeaderboardContainer />
      <div className="cards">
        {cards}
      </div>
    </div>
  );
}

export default Board;
