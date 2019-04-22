import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

const credentials = {
  email: 'stu@dent.com',
  password: '123'
};

class AuthProvider extends PureComponent {
  state = {
    isAuthorized: false,
    authorizeError: '',
    email: ''
  };

  authorize = (e, pswd) => {
    const { email, password } = credentials;
    const isAuthorized = e === email && pswd === password;
    this.setState({
      isAuthorized: isAuthorized,
      email: isAuthorized ? email : '',
      authorizeError: isAuthorized ? '' : 'Email или пароль введён не верно'
    });
  };

  logout = () => {
    this.setState({ isAuthorized: false, authorizeError: '', email: '' });
  };

  getProviderValue = () => ({
    ...this.state,
    authorize: this.authorize,
    logout: this.logout
  });

  render() {
    const { children } = this.props;
    return (
      <Provider
        value={{
          ...this.state,
          authorize: this.authorize,
          email: credentials.email,
          logout: this.logout
        }}
      >
        {children}
      </Provider>
    );
  }
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
