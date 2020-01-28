import { Link } from 'gatsby';
import styled, { css, keyframes } from 'styled-components';

const LinkStyles = css`
  position: relative;
  text-decoration: none;
  font-family: ${({ fonts }) => fonts.text};
  font-size: 20px;
  font-weight: 300;
  color: ${({ colours }) => colours.navLink};
`;

const LinkPseudo = css`
  content: '';
  height: 2px;
  width: 55%;
  position: absolute;
  bottom: -7px;
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
  height: 2px;
  width: 55%;
  position: absolute;
  bottom: -5px;
  display: block;
  background-color: ${({ colours }) => colours.navLinkHover};
  opacity: 1;
  transition: all 0.2s linear;
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
  flex-direction: ${({ isBlogPostPage }) =>
    isBlogPostPage ? 'column' : 'row'};
  justify-content: ${({ isHomePage }) =>
    isHomePage ? 'flex-end' : 'space-between'};
  position: relative;
  z-index: 10;
  align-items: center;
  width: ${({ isHomePage }) => (isHomePage ? '100%' : '80%')};
  margin: 0 auto;
  padding: 2em 0 0 0;
  opacity: ${({ isHomePage }) => (isHomePage ? 0 : 1)};
  animation: ${({ isHomePage }) => (isHomePage ? animationMixin : 'none')};
  @media all and (min-width: 450px) {
    width: 80%;
    flex-direction: row;
  }
`;

export const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;

  li {
    margin: 0 10px;
    padding: 5px;
    position: relative;
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
  padding-bottom: ${({ isBlogPostPage }) => (isBlogPostPage ? '2rem' : 0)};
  @media all and (min-width: 450px) {
    padding-bottom: 0;
  }
`;
