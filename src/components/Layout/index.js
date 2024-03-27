import React, { Fragment, useContext } from 'react';
import Header from '../Header';
import { Anchor, BodyWrapper, IconWrapper, Footer } from './style';
import { ThemeContext } from '../../contexts/ThemeContext';
import useBodyToggle from '../../utils/useBodyToggle';
import ThemeToggle from '../ThemeToggle';

const Layout = ({
  children,
  location,
  wide = false
}) => {
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
      <BodyWrapper
        colours={colours}
        isHomePage={isHomePage}
        wide={wide}
      >
        {children}
      </BodyWrapper>
      {!isHomePage && (
        <Footer
          colours={colours}
          fonts={fonts}
        >
          <span>
            © {new Date().getFullYear()}.{` `}
            Ilya Meerovich
          </span>
          <IconWrapper>
            <ThemeToggle
              colour={colours.textContent}
              darkEnabled={darkEnabled}
              setDarkEnabled={setDarkEnabled}
              style={{ top: '0', margin: '0 20px' }}
            />
            <Anchor
              target="_blank"
              rel="noopener noreferrer"
              colours={colours}
              href="https://github.com/Ilya-Meer/Ilya-Meer"
              aria-label="View website source"
            >
              src
            </Anchor>
          </IconWrapper>
        </Footer>
      )}
    </Fragment>
  );
};

export default Layout;
