import React from 'react';

import './form.scss';

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'form__item__textbox',
      value: ''
    }
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  render() {
    return (
      <div className={this.props.inline ? "form__item form__item--inline" : "form__item"}>
          <input
            type={this.props.type}
            className={this.state.className}
            autoComplete="off"
            autoFocus={this.props.autoFocus}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onChange={this.handleOnChange}
            id={this.props.name}
          />
          <label className="form__item__textbox-placeholder" htmlFor={this.props.name}>
              <span>{this.props.label}</span>
            </label>
      </div>
    )
  }
  handleOnChange(e) {
    this.setState({
      value: e.target.value,
      className: e.target.value.length > 0 ? 'form__item__textbox form__item__textbox--hasvalue' : 'form__item__textbox form__item__textbox--hasvalue fixed'
    });
  }
  handleOnFocus(e) {
    this.setState({
      className: e.target.value.length > 0 ? 'form__item__textbox form__item__textbox--hasvalue' : 'form__item__textbox form__item__textbox--hasvalue fixed'
    });
  }
  handleOnBlur() {
    if(this.state.value.length > 0) return;
    this.setState({
      className: 'form__item__textbox',
    });
  }
}

export default FormItem;
