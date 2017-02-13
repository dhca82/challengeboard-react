import React from 'react';
import Icon from '../icon/icon.jsx';
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
                  <Icon name={this.props.card.category.toLowerCase()} />
                  <Icon name="check" />
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
    let newScore;
    let count;
    let updates = {};
    if(this.props.card.isIncremental || this.props.card.completed == false) {
      newScore = this.props.currentUser.score + this.props.card.points;
      count = this.props.card.numberOfCompletions + 1;
    }
    else {
      newScore = this.props.currentUser.score - this.props.card.points;
      count = null;
    }
    updates[`/users/${this.props.currentUser.key}/boards/${this.props.boardKey}/completedCards/${this.props.card.key}`] = count;
    updates[`/users/${this.props.currentUser.key}/boards/${this.props.boardKey}/score`] = newScore;
    updates[`/board-users/${this.props.boardKey}/${this.props.currentUser.key}`] = {
      score: newScore,
      username: this.props.currentUser.username
    };
    return database.ref().update(updates);
  }
}

export default Card;
