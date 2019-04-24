import React, { PureComponent, Fragment } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import Button from '../Button';
import SectionTitle from '../SectionTitle';
import './Header.css';

class Header extends PureComponent {
  render() {
    return (
      <AuthConsumer>
        {({ isAuthorized, email, logout }) => (
          <header className="header">
            <SectionTitle className="header__title">Header</SectionTitle>
            <div className="header__content">
              {isAuthorized ? (
                <div className="header-menu">
                  <p className="header-menu__email header-email t-header-email">
                    {email}
                  </p>
                  <Button
                    className="header-menu__button t-logout"
                    onClick={logout}
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                ''
              )}
            </div>
          </header>
        )}
      </AuthConsumer>
    );
  }
}

export default Header;
