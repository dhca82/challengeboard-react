import React from 'react';
import FormItem from '../../components/form/form-item.jsx';

const SignIn = (props) => {
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
  function handleSubmit(e) {

  }
}

export default SignIn;
