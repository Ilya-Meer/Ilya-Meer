import React, { Fragment, useContext } from 'react';
import Header from '../Header';
import { BodyWrapper, Footer } from './style';
import { ThemeContext } from '../../contexts/ThemeContext';
import useBodyToggle from '../../utils/useBodyToggle';
import ThemeToggle from '../ThemeToggle';

const Layout = ({ children, location }) => {
  const {
    theme: { colours },
    fonts,
    darkEnabled,
    setDarkEnabled,
  } = useContext(ThemeContext);

  useBodyToggle(colours);

  const isHomePage = location.pathname === '/';

  return (
    <Fragment>
      <Header location={location} />
      <BodyWrapper colours={colours} isHomePage={isHomePage}>
        {children}
      </BodyWrapper>
      {!isHomePage && (
        <Footer colours={colours} fonts={fonts}>
          <span>
            © {new Date().getFullYear()}.{` `}
            Ilya Meerovich
          </span>
          <ThemeToggle
            colour={colours.textContent}
            darkEnabled={darkEnabled}
            setDarkEnabled={setDarkEnabled}
            style={{ top: '0' }}
          />
        </Footer>
      )}
    </Fragment>
  );
};

export default Layout;
