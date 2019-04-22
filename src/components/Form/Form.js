import React, { Component } from 'react';
import './Form.css';
import bond from './assets/bond_approve.jpg';

// Spec to create FormIputField components
const fieldSpec = {
  firstname: {
    fieldName: 'firstname',
    label: 'Имя',
    inputClass: 't-input-firstname',
    errorClass: 't-error-firstname'
  },
  lastname: {
    fieldName: 'lastname',
    label: 'Фамилия',
    inputClass: 't-input-lastname',
    errorClass: 't-error-lastname'
  },
  password: {
    fieldName: 'password',
    label: 'Пароль',
    inputClass: 't-input-password',
    errorClass: 't-error-password'
  }
};

// Spec for field validation
const validationSpec = {
  firstname: {
    value: 'James',
    emtpyMessage: 'Нужно указать имя',
    invalidMessage: 'Имя указано не верно'
  },
  lastname: {
    value: 'Bond',
    emtpyMessage: 'Нужно указать фамилию',
    invalidMessage: 'Фамилия указана не верно'
  },
  password: {
    value: '007',
    emtpyMessage: 'Нужно указать пароль',
    invalidMessage: 'Пароль указан не верно'
  }
};

// Helper function
const objectMap = (obj, fun) =>
  Object.assign(
    {},
    ...Object.keys(obj).map(key => ({
      [key]: fun(key)
    }))
  );

// Component for error messages
const FormFieldError = ({ errorClass, errorMsg }) =>
  errorMsg ? (
    <span className={`field__error field-error ${errorClass}`}>{errorMsg}</span>
  ) : (
    ''
  );

// Component for form field label
const FormFieldLabel = ({ fieldName, label }) => (
  <label className="field__label" htmlFor={fieldName}>
    <span className="field-label">{label}</span>
  </label>
);

// Component for the form input field with label and error message
const FormIputField = ({
  fieldName,
  label,
  inputClass,
  errorClass,
  errorMsg,
  ...props
}) => (
  <p className="field">
    <FormFieldLabel {...{ fieldName, label }} />
    <input
      className={`field__input field-input ${inputClass}`}
      type="text"
      name={fieldName}
      {...props}
    />
    <FormFieldError {...{ errorClass, errorMsg }} />
  </p>
);

// HOC to add login logic
const withLogin = BaseComponent =>
  class extends Component {
    state = { sucessfulLogin: false };

    setLoginSuccess = () => {
      this.setState({ sucessfulLogin: true });
    };

    render() {
      return (
        <div className="app-container">
          {this.state.sucessfulLogin ? (
            <img alt="bond approve" className="t-bond-image" src={bond} />
          ) : (
            <BaseComponent setLoginSuccess={this.setLoginSuccess} />
          )}
        </div>
      );
    }
  };

// Main Form component
class Form extends Component {
  state = {
    firstname: { current: '', errorMsg: '' },
    lastname: { current: '', errorMsg: '' },
    password: { current: '', errorMsg: '' }
  };

  // Setter for an error message for a given key and error type.
  // Passing null for <type> resets it to initial value: ''
  setError = (key, type) =>
    this.setState({
      [key]: {
        ...this.state[key],
        errorMsg: type ? validationSpec[key][type] : ''
      }
    });

  // Setter for a current value for a given field
  setValue = (key, value, callback) =>
    this.setState(
      {
        [key]: { ...this.state[key], current: value }
      },
      callback
    );

  // A collection of onChange handlers for child FormIputField components
  onChangeHandlers = objectMap(this.state, key => event => {
    this.setValue(key, event.target.value, () =>
      Object.keys(this.state).forEach(k => this.setError(k, null))
    );
  });

  handleSubmit = event => {
    event.preventDefault();
    let success = true;
    Object.keys(this.state).forEach(key => {
      switch (this.state[key].current) {
        case validationSpec[key].value: // Correct value
          break;
        case '': // Empty field
          this.setError(key, 'emtpyMessage');
          success = false;
          break;
        default:
          // Incorrect value
          this.setError(key, 'invalidMessage');
          success = false;
      }
    });
    if (success) {
      this.props.setLoginSuccess();
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1>Введите свои данные, агент</h1>

        {Object.keys(fieldSpec).map(key => (
          <FormIputField
            {...fieldSpec[key]}
            key={key}
            onChange={this.onChangeHandlers[key]}
            errorMsg={this.state[key].errorMsg}
          />
        ))}

        <div className="form__buttons">
          <input type="submit" className="button t-submit" value="Проверить" />
        </div>
      </form>
    );
  }
}

export default withLogin(Form);
