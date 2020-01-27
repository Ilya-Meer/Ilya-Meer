import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import {
  Nav,
  LinkList,
  InternalLink,
  StyledLink,
  HomeLinkWrapper,
} from './style';

const Header = props => {
  const { colours, fonts } = useContext(ThemeContext);
  const { location } = props;

  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname.includes('/blog');

  const isBlogPostPage = !isHomePage && !isBlogPage;

  const renderHeader = () => (
    <Nav isHomePage={isHomePage} isBlogPostPage={isBlogPostPage}>
      {!isHomePage && (
        <HomeLinkWrapper isBlogPostPage={isBlogPostPage}>
          <InternalLink fonts={fonts} colours={colours} to="/">
            Home
          </InternalLink>
        </HomeLinkWrapper>
      )}
      <LinkList>
        {!isBlogPage && (
          <li>
            <InternalLink fonts={fonts} colours={colours} to="/blog">
              Blog
            </InternalLink>
          </li>
        )}
        <li>
          <StyledLink
            colours={colours}
            fonts={fonts}
            href="https://github.com/Ilya-Meer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </StyledLink>
        </li>
        <li>
          <StyledLink
            colours={colours}
            fonts={fonts}
            href="https://www.linkedin.com/in/ilya-meerovich/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </StyledLink>
        </li>
      </LinkList>
    </Nav>
  );

  return (
    <div>
      <header>{renderHeader()}</header>
    </div>
  );
};

export default Header;
