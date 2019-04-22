import React, { Fragment, PureComponent } from 'react';
import SectionTitle from '../SectionTitle';
import './Layout.css';

class Layout extends PureComponent {
  render() {
    const { children, header, footer } = this.props;
    const mainClass = `main ${header ? 'main--with-header' : ''} ${
      footer ? 'main--with-footer' : ''
    }`.trim();
    return (
      <Fragment>
        {header ? this.renderHeader(header) : ''}
        <main className={mainClass}>
          <SectionTitle className="main__title">Main</SectionTitle>
          {children}
        </main>
        {footer ? this.renderFooter(footer) : ''}
      </Fragment>
    );
  }

  renderHeader(HeaderChild) {
    return <HeaderChild />;
  }

  renderFooter(FooterChild) {
    return <FooterChild />;
  }
}

export default Layout;
