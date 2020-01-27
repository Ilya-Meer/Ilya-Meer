import React, { Fragment, useContext } from 'react';
import Header from '../Header';
import { BodyWrapper, Footer } from './style';
import { ThemeContext } from '../../contexts/ThemeContext';

const Layout = ({ children, location }) => {
  const { fonts } = useContext(ThemeContext);
  const isHomePage = location.pathname === '/';

  return (
    <Fragment>
      <Header location={location} />
      <BodyWrapper isHomePage={isHomePage}>{children}</BodyWrapper>
      {!isHomePage && (
        <Footer fonts={fonts}>
          © {new Date().getFullYear()}.{` `}
          Ilya Meerovich
        </Footer>
      )}
    </Fragment>
  );
};

export default Layout;
