/* eslint-disable react-perf/jsx-no-new-object-as-prop */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { withAuth } from '../../context/Auth';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  // Реализуйте приватный роут.
  // Он должен проверять статус авторизации
  // и перенаправлять пользователя на страницу логина,
  // если тот не авторизован.
  render() {
    const {
      isAuthorized,
      path,
      render,
      component: RouteComponent,
      ...rest
    } = this.props;
    const oldRender = render
      ? render
      : props => <RouteComponent {...rest} {...props} />;
    const newRender = props =>
      isAuthorized ? (
        oldRender(props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: path }
          }}
        />
      );
    return <Route path={path} render={newRender} />;
  }
}

export default withAuth(PrivateRoute);
