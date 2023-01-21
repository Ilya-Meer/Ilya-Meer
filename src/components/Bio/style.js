import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledWrapper = styled.div`
  width: 80%;
  margin: 5rem auto;
  min-height: 65vh;
  opacity: 0;
  animation: ${fadeIn} 1s ease 0.65s 1 normal forwards;
  @media all and (min-width: 800px) {
    width: 100%;
    max-width: 42rem;
  }

  h1 {
    margin: 0;
    color: ${({ colours }) => colours.postTitle};
    font-size: 18px;
    font-family: ${({ fonts }) => fonts.text};
    font-weight: 400;
  }

  p {
    font-size: 18px;
    font-family: ${({ fonts }) => fonts.text};
    color: ${({ colours }) => colours.textContent};
  }

  a {
    color: ${({ colours }) => colours.hyperlink};
    &:hover {
      color: ${({ colours }) => colours.hyperlinkHover};
    }
  }
`;
