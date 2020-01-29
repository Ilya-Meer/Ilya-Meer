import styled from 'styled-components';

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
  margin: ${({ isHomePage }) => (isHomePage ? 0 : '5rem auto')};
  min-height: ${({ isHomePage }) => (isHomePage ? 0 : '65vh')};
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
  @media all and (min-width: 800px) {
    max-width: 42rem;
  }
`;
