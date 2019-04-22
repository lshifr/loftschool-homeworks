import React, { PureComponent } from 'react';
import { AuthConsumer } from '../../contexts/Auth';
import SectionTitle from '../SectionTitle';
import './Footer.css';

class Footer extends PureComponent {
  render() {
    return (
      <AuthConsumer>
        {({ isAuthorized, email }) => (
          <footer className="footer">
            <SectionTitle className="header__title">Footer</SectionTitle>
            <p className="footer-message t-footer">
              {isAuthorized
                ? `Вы вошли как ${email}`
                : 'Вы гость в этой системе'}
            </p>
          </footer>
        )}
      </AuthConsumer>
    );
  }
}

export default Footer;
