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
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import style from './AppRouter.module.css';
import homeStyle from '../Home/Home.module.css';
import { objectMap } from '../../shared/utils';

const Home = () => (
  <div className={homeStyle.container}>
    <p className="t-greeting">Приветствуем в почтовом клиенте!</p>
  </div>
);

const AppLink = ({ clazz, to, children, ...rest }) => (
  <li className={style.navElement}>
    <NavLink className={`${style.link} ${clazz}`} to={to} {...rest}>
      {children}
    </NavLink>
  </li>
);

const routerSpec = {
  '/app': { clazz: 't-link-home', name: 'Home', exact: true },
  '/app/inbox': { clazz: 't-link-inbox', name: 'Inbox' },
  '/app/outbox': { clazz: 't-link-outbox', name: 'Outbox' }
};

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <ul className={`${style.navList} t-nav-list`}>
        {Object.values(
          objectMap(routerSpec, ({ clazz, name, exact }, path) =>
            exact ? (
              <AppLink exact clazz={clazz} to={path} key={path}>
                {name}
              </AppLink>
            ) : (
              <AppLink clazz={clazz} to={path} key={path}>
                {name}
              </AppLink>
            )
          )
        )}
      </ul>
    </nav>
  );
};

const Inbox = () => <h1>This is inbox</h1>;

const Outbox = () => <h1>This is outbox</h1>;

const AppContents = withRouter(({ match }) => {
  return (
    <div className={style.content}>
      <h3 className={style.title}>{routerSpec[match.path].name}</h3>
      <Switch>
        <Route path="/app" exact component={Home} />
        <Route path="/app/inbox" component={Inbox} />
        <Route path="/app/outbox" component={Outbox} />
      </Switch>
    </div>
  );
});

const AppRouter = () => (
  <div className={style.wrapper}>
    <div className={style.container}>
      <NavBar />
      <AppContents />
    </div>
  </div>
);

export default AppRouter;
