import React from 'react';
import database from '../../api/database.js';
import './card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  render() {
    var cardClassName = this.props.card.completed ? 'card card--complete' : 'card';
    return (
      <div className={cardClassName} role="button" onClick={this.handleCardClick}>
        <div className="card-background"></div>
        <div className="card-body">
            <div className="card-icon">
              <div className="card-icon-inner">
                <span className="icon icon" aria-hidden="true"></span>
                <span className="icon icon-check" aria-hidden="true"></span>
              </div>
              <span className="card-icon-ring"></span>
            </div>
            <strong className="card-heading">{this.props.card.title}</strong>
            <strong className="card-count">{this.props.card.numberOfCompletions}</strong>
            <footer className="card-meta">{this.props.card.points}</footer>
          </div>
      </div>
    )
  }
  handleCardClick() {
    var userKey = this.props.currentUser.key;
    var boardKey = this.props.boardKey;
    var cardKey = this.props.card.key;
    var newScore;
    var count;
    var updates = {};
    if(this.props.card.isIncremental) {
      newScore = this.props.currentUser.score + this.props.card.points;
      count = this.props.card.numberOfCompletions + 1;
    }
    else {
      if(this.props.card.completed == false) {
        newScore = this.props.currentUser.score + this.props.card.points;
        count = this.props.card.numberOfCompletions + 1;
      }
      else {
        newScore = this.props.currentUser.score - this.props.card.points;
        count = null;
      }
    }
    updates[`/users/${userKey}/boards/${boardKey}/completedCards/${cardKey}`] = count;
    updates[`/users/${userKey}/boards/${boardKey}/score`] = newScore;
    return database.ref().update(updates);
  }
}

export default Card;
