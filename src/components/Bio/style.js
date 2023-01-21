import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 80%;
  margin: 5rem auto;
  min-height: 65vh;
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
