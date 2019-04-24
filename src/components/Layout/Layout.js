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
        {header && header()}
        <main className={mainClass}>
          <SectionTitle className="main__title">Main</SectionTitle>
          {children}
        </main>
        {footer && footer()}
      </Fragment>
    );
  }
}

export default Layout;
