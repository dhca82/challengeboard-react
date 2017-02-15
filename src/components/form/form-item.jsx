import React from 'react';

import './form.scss';

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevateLabel: false,
      value: ''
    }
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  render() {
    return (
      <div className="form__item">
          <input
            type={this.props.type}
            className={this.state.elevateLabel ? "form__item__textbox form__item__textbox--hasvalue" : "form__item__textbox"}
            autoComplete="off"
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
      value: e.target.value
    });
  }
  handleOnFocus() {
    this.setState({
      elevateLabel: true
    });
  }
  handleOnBlur() {
    if(this.state.value.length > 0) return;
    this.setState({
      elevateLabel: false
    });
  }
}

export default FormItem;
