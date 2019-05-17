/* eslint-disable max-params */
/* eslint-disable react/jsx-no-bind */

// Реализуйте компонент формы логина.
// Используйте `/contexts/Auth` для получения метода authorize
// и статуса isAuthorized.

// Когда пользователь авторизован - перенаправьте его на роут /app

import React, { createRef, Component } from 'react';
import style from './LoginForm.module.css';
import { withAuth } from '../../context/Auth';
import {
  withPropsAndForwardedRef,
  getInputAndRefresh
} from '../../shared/utils';

const emailInputSpec = {
  name: 'email',
  type: 'text',
  className: `${style.input} t-input-email`,
  text: 'Почта'
};

const passwordInputSpec = {
  name: 'password',
  type: 'password',
  className: `${style.input} t-input-password`,
  text: 'Пароль'
};

const FormInput = ({ name, type, className, text, forwardedRef }) => (
  <p>
    <label htmlFor={name}>
      <span className={style.labelText}>{text}</span>
    </label>
    <input type={type} name={name} className={className} ref={forwardedRef} />
  </p>
);

const EmailInput = withPropsAndForwardedRef(emailInputSpec)(FormInput);
const PasswordInput = withPropsAndForwardedRef(passwordInputSpec)(FormInput);

const SubmitButton = ({ onClick }) => (
  <div className={style.buttons}>
    <button className={`${style.button} t-login`} onClick={onClick}>
      Войти
    </button>
  </div>
);

class LoginForm extends Component {
  emailInputRef = createRef();
  pswdInputRef = createRef();

  redirect = () => {
    const { history, location, defaultPath } = this.props;
    history.push(
      location.state && location.state.from ? location.state.from : defaultPath
    );
  };

  onSubmit = () => {
    const { authorize } = this.props;
    getInputAndRefresh(
      {
        email: this.emailInputRef,
        password: this.pswdInputRef
      },
      ({ email, password }, onSuccess) =>
        authorize(email, password, () => {
          onSuccess();
          this.redirect();
        })
    );
  };

  render() {
    const { authError } = this.props;
    return (
      <div className={style.bg}>
        <div className={`${style.form} t-form`}>
          <EmailInput ref={this.emailInputRef} />
          <PasswordInput ref={this.pswdInputRef} />
          {authError ? <p className={style.error}>{authError}</p> : ''}
          <SubmitButton onClick={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default withAuth(LoginForm);
