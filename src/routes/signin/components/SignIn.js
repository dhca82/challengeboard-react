import React from 'react';
import FormItem from '../../../components/form/form-item.jsx';

import '../../../assets/styles/dialog.scss';

function SignIn({authenticateUser}) {
  return (
    <div>
      <div className="dialog dialog--smaller">
          <div className="dialog__inner">
              <strong className="dialog__lead">Logga in</strong>
              <form className="dialog__form form" action="/board/register" method="POST" onSubmit={handleSubmit}>
                  <FormItem label="E-post" name="email" type="text" />
                  <FormItem label="Lösenord" name="password" type="password" />
                  <button type="submit" className="form__submit form__submit--wide button">Logga in</button>
              </form>
          </div>
      </div>
    </div>
  )

  function handleSubmit (e) {
    e.preventDefault();
    var form = e.target;
    var email = form.elements['email'].value;
    var password = form.elements['password'].value;
    authenticateUser(email, password);
  }
}

export default SignIn;
