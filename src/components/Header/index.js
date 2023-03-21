import React, { useContext } from 'react';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { BsPen } from 'react-icons/bs';

import { ThemeContext } from '../../contexts/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';

import {
  Nav,
  LinkList,
  InternalLink,
  StyledLink,
  HomeLinkWrapper,
} from './style';

const Header = props => {
  const {
    theme: { colours },
    fonts,
    darkEnabled,
    setDarkEnabled,
  } = useContext(ThemeContext);

  const { location } = props;

  const isHomePage = location.pathname === '/';

  const renderHeader = () => (
    <Nav isHomePage={isHomePage} colours={colours}>
      <HomeLinkWrapper>
        <InternalLink fonts={fonts} colours={colours} to="/" aria-label="home">
          <span>IM</span>
        </InternalLink>
      </HomeLinkWrapper>
      <LinkList>
        <li>
          <InternalLink
            fonts={fonts}
            colours={colours}
            to="/blog"
            aria-label="blog"
          >
            <span className="link-text">Blog</span>
            <span className="link-icon">
              <BsPen />
            </span>
          </InternalLink>
        </li>
        <li>
          <StyledLink
            colours={colours}
            fonts={fonts}
            href="https://github.com/Ilya-Meer/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
          >
            <span className="link-text">Github</span>
            <span className="link-icon">
              <FiGithub />
            </span>
          </StyledLink>
        </li>
        <li>
          <StyledLink
            colours={colours}
            fonts={fonts}
            href="https://www.linkedin.com/in/ilya-meerovich/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
          >
            <span className="link-text">LinkedIn</span>
            <span className="link-icon">
              <FaLinkedinIn />
            </span>
          </StyledLink>
        </li>
        <li>
          <ThemeToggle
            colour={colours.navLink}
            darkEnabled={darkEnabled}
            setDarkEnabled={setDarkEnabled}
          />
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
