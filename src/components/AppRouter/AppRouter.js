/* eslint-disable react/jsx-no-bind */

// Реализуйте роутер приложения.
// Здесь должны быть обьявлены роуты,
// которые будут доступны авторизованному пользователю.
// - Home
// - InboxList
// - InboxMail
// - OutboxList
// - OutboxMail

// Так же в этом файле обьявите лейаут,
// используйте стили из AppRouter.module.css

import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import style from './AppRouter.module.css';
import { objectMap } from '../../shared/utils';
import Home from '../Home';
import InboxList from '../InboxList';
import OutboxList from '../OutboxList';
import InboxMail from '../InboxMail';
import OutboxMail from '../OutboxMail';

const AppLink = ({ clazz, to, children, ...rest }) => (
  <li className={style.navElement}>
    <NavLink className={`${style.link} ${clazz}`} to={to} {...rest}>
      {children}
    </NavLink>
  </li>
);

const routerSpec = {
  '/app': { clazz: 't-link-home', name: 'Home' },
  '/app/inbox': { clazz: 't-link-inbox', name: 'Inbox' },
  '/app/outbox': { clazz: 't-link-outbox', name: 'Outbox' }
};

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <ul className={`${style.navList} t-nav-list`}>
        {Object.values(
          objectMap(routerSpec, ({ clazz, name }, path) => (
            <AppLink exact clazz={clazz} to={path} key={path}>
              {name}
            </AppLink>
          ))
        )}
      </ul>
    </nav>
  );
};

const AppContentsHeader = () => (
  <Route
    path="/app/:type?/:id?"
    render={({ match }) => {
      const { type } = match.params;
      return (
        <h3 className={style.title}>
          {routerSpec[`/app${type ? `/${type}` : ''}`].name}
        </h3>
      );
    }}
  />
);

const AppContents = () => {
  return (
    <div className={style.content}>
      <AppContentsHeader />

      <Switch>
        <Route path="/app" exact component={Home} />
        <Route path="/app/inbox" exact component={InboxList} />
        <Route path="/app/outbox" exact component={OutboxList} />
        <Route path="/app/inbox/:id" component={InboxMail} />
        <Route path="/app/outbox/:id" component={OutboxMail} />
      </Switch>
    </div>
  );
};

const AppRouter = () => (
  <div className={style.wrapper}>
    <div className={style.container}>
      <NavBar />
      <AppContents />
    </div>
  </div>
);

export default AppRouter;
