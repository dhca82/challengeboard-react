import React from 'react';

import '../../assets/icons/sprite.scss';
import './icon.scss';

class Icon extends React.Component {
  render() {
    return (
      <span className={this.props.visible ? `icon icon-${this.props.name}` : "icon--hidden"}>
        <svg aria-hidden="true" className={`icon__svg icon-${this.props.name}__svg`} dangerouslySetInnerHTML={this.getIconMarkup()}></svg>
      </span>
    );
  }
  getIconMarkup() {
    return { __html: `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/icons.svg#${this.props.name}"></use>` };
  }
}

export default Icon;
