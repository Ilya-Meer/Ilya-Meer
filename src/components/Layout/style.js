import styled from 'styled-components';

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
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
  font-family: ${({ fonts }) => fonts.heading};
  @media all and (min-width: 800px) {
    max-width: 42rem;
  }
`;
