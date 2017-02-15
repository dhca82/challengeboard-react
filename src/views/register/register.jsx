import React from 'react';
import FormItem from '../../components/form/form-item.jsx';

import '../../assets/styles/dialog.scss';
import '../../assets/styles/form.scss';
import '../../assets/styles/button.scss';

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <a href="/" className="button button--outline button--inverted home__sign-in-button">Logga in</a>
        <div className="dialog">
            <div className="dialog__inner">
                <strong className="dialog__lead">Ange dina uppgifter för att skapa brädan</strong>
                <form className="dialog__form form" action="/board/register" method="POST" onSubmit={this.handleSubmit}>
                    <FormItem label="Användarnamn" name="username" type="text" />
                    <FormItem label="Lösenord" name="password" type="password" />
                    <FormItem label="För och efternamn" name="fullname" type="text" />
                    <FormItem label="E-post" name="email" type="text" />
                    <div className="form__error">

                    </div>
                    <button type="submit" className="form__submit form__submit--wide button">Lets do this</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var username = form.elements['username'].value;
  }
}

export default RegisterView;
