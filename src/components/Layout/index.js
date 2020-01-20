import '../../../static/stylesheets/normalize.css';
import '../../../static/stylesheets/global.css';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

import Header from '../Header';

class Layout extends React.Component {
  render() {
    const { children, location } = this.props;

    const isHomePage = location.pathname === '/';

    return (
      <Fragment>
        <Header location={location} />
        <main className={classNames({ [styles.homePage]: isHomePage })}>
          {children}
        </main>
        {!isHomePage && (
          <footer>
            © {new Date().getFullYear()}.{` `}
            Ilya Meerovich
          </footer>
        )}
      </Fragment>
    );
  }
}

export default Layout;
