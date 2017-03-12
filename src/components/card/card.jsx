import React from 'react';
import Icon from '../icon/icon.jsx';
import ContextNav, { ContextNavItem } from '../contextnav/contextnav.jsx'
import './card.scss';

function Card({card, onCardClick, handleDecrement}) {
  let cardIcon;
  if(card.isIncremental && card.numberOfCompletions > 0) {
    cardIcon = <div className="card__icon__inner card__icon__inner--number">{card.numberOfCompletions}</div>
  }
  else {
    cardIcon = (
      <div className="card__icon__inner">
          <Icon name={card.category.toLowerCase()} visible="true" />
          <Icon name="check" visible="true" />
      </div>
    )
  }

  return (
    <div className={card.completed ? 'card card--complete' : 'card'} role="button" onClick={onCardClick}>
      <div className="card__background"></div>
      <div className="card__body">
          <div className="card__icon">
            {cardIcon}
            <span className="card__icon__ring"></span>
          </div>
          <div className="card__description">
            <div className="card__description__meta">{card.points} poäng</div>
            <strong className="card__description__title">{card.title}</strong>
          </div>
          <ContextNav className="card__context-nav">
            {card.isIncremental && card.numberOfCompletions > 0 &&
              <ContextNavItem text="Minska antal" handler={handleDecrement.bind(card)} />
            }
            <ContextNavItem text="Göm kort" handler={handleDecrement.bind(card)} />
          </ContextNav>
        </div>
    </div>
  )
}

export default Card;
