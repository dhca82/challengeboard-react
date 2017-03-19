import React from 'react';
import onClickOutside from 'react-onclickoutside';

import './contextnav.scss';

class ContextNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedToDom: false,
      animationStarted: false
    }
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  render() {
    if(this.props.children.length == 0) return null;

    let nav;
    if(this.state.addedToDom) {
      nav = this.props.children.map((item) => {
        return item;
      });
    }

    let trigger;
    if(this.props.customTrigger) {
      trigger =(
        <button className="context-nav__custom-trigger" onClick={this.handleTriggerClick}>
          {this.props.customTrigger}
        </button>
      )
    }
    else {
      trigger = (
        <button className="context-nav__trigger" onClick={this.handleTriggerClick}>
          <svg width="18px" height="18px" viewBox="0 0 76 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10"/>
            <circle cx="38" cy="10" r="10"/>
            <circle cx="66" cy="10" r="10"/>
          </svg>
        </button>
      )
    }

    let alignmentClass = this.props.align ? `context-nav--${this.props.align}` : null;

    return (
      <div className={`${this.props.className} context-nav ${alignmentClass}`}>
        {trigger}
        {this.state.addedToDom &&
          <nav className={this.state.animationStarted ? "context-nav__pop context-nav__pop--init" : "context-nav__pop"}>
            <ul className="context-nav__items">
              {nav}
            </ul>
          </nav>
        }
      </div>
    );
  }
  handleClickOutside(e) {
    if(this.state.addedToDom) {
      this.hide();
    }
  }
  handleTriggerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if(!this.state.addedToDom) {
      this.show();
    }
    else {
      this.hide();
    }
  }

  show() {
    this.setState({
      addedToDom: true,
    });
    setTimeout(() => {
      this.setState({
        animationStarted: true
      });
    }, 20);
  }

  hide() {
    this.setState({
      animationStarted: false,
    });
    setTimeout(() => {
      this.setState({
        addedToDom: false
      });
    }, 200);
  }

}
export default onClickOutside(ContextNav);


export function ContextNavItem({handler, text}) {
  function handleActionClick(e,) {
    e.preventDefault();
    e.stopPropagation();
    handler();
  }
  return(
    <li className="context-nav__item">
      <button className="context-nav__item__action" onClick={handleActionClick}>{text}</button>
    </li>
  )
}
