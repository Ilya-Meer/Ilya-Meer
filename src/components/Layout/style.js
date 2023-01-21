import styled, { css } from 'styled-components';

const SelectionStyle = css`
  ::selection {
    color: ${({ colours }) => colours.selectionColour};
    background: ${({ colours }) => colours.selectionBackground};
  }
`;

export const Anchor = styled.a`
  margin: 0 5px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ colours }) => colours.textContent};
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BodyWrapper = styled.main`
  width: 80%;
  max-width: ${({ isHomePage }) => (isHomePage ? 'none' : '42rem')};
  margin: ${({ isHomePage }) => (isHomePage ? '0' : '5rem auto')};
  min-height: 65vh;

  *${SelectionStyle};

  @media all and (min-width: 800px) {
    width: auto;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding: 1.75rem 0;
  font-family: ${({ fonts }) => fonts.heading};
  color: ${({ colours }) => colours.textContent};

  *${SelectionStyle};

  @media all and (min-width: 800px) {
    max-width: 42rem;
  }
`;
