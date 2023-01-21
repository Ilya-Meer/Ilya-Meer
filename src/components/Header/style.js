import { Link } from 'gatsby';
import styled, { css, keyframes } from 'styled-components';

const SelectionStyle = css`
  ::selection {
    color: ${({ colours }) => colours.selectionColour};
    background: ${({ colours }) => colours.selectionBackground};
  }
`;

const LinkStyles = css`
  position: relative;
  text-decoration: none;
  font-family: ${({ fonts }) => fonts.text};
  font-size: 20px;
  font-weight: 300;
  color: ${({ colours }) => colours.navLink};

  .link-icon {
    position: relative;
    top: 2px;
  }

  .link-text {
    display: none;
  }

  @media all and (min-width: 450px) {
    .link-icon {
      display: none;
    }

    .link-text {
      display: inline;
    }
  }
`;

const LinkPseudo = css`
  content: '';
  height: 1px;
  width: 75%;
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translate(-50%);
  display: block;
  background-color: red;
  background-color: ${({ colours }) => colours.navLinkHover};
  opacity: 0;
  transition: all 0.2s ease-in-out;
`;

const LinkPseudoHover = css`
  content: '';
  height: 1px;
  width: 75%;
  position: absolute;
  bottom: -2px;
  display: block;
  background-color: ${({ colours }) => colours.navLinkHover};
  opacity: 1;
  transition: all 0.2s ease-in-out;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// prettier-ignore
const animationMixin = css`
  ${fadeIn} ${'1s ease 0.65s 1 normal forwards'}`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 2em 0 0 0;
  opacity: ${({ isHomePage }) => (isHomePage ? 0 : 1)};
  animation: ${({ isHomePage }) => (isHomePage ? animationMixin : 'none')};

  *${SelectionStyle};
`;

export const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;

  li {
    margin: 0 5px;
    padding: 5px;
    position: relative;

    &:last-of-type {
      margin-right: 0;
      padding-right: 0;
    }
  }
`;

export const StyledLink = styled.a`
  ${LinkStyles}
  &::before {
    ${LinkPseudo}
  }
  &:hover::before {
    ${LinkPseudoHover}
  }
`;

export const InternalLink = styled(Link)`
  ${LinkStyles}
  &::before {
    ${LinkPseudo}
  }
  &:hover::before {
    ${LinkPseudoHover}
  }
`;

export const HomeLinkWrapper = styled.div`
  margin: 0;
  padding: 5px 0;
  @media all and (min-width: 450px) {
    margin: 0;
    padding: 0;
  }
`;
