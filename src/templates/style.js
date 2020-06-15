import styled from 'styled-components';

export const Heading = styled.h1`
  margin: 0;
  font-size: 2.5em;
  font-family: ${({ fonts }) => fonts.heading};
  color: ${({ colours }) => colours.postTitle};
`;

export const PostDate = styled.p`
  font-family: ${({ fonts }) => fonts.heading};
  color: ${({ colours }) => colours.textContent};
  font-size: 0.875em;
  margin-top: 0.5em;
  margin-bottom: 2.5em;
`;

export const PostContent = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  font-family: ${({ fonts }) => fonts.text};

  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ colours }) => colours.postTitle};
  }

  p,
  li,
  figcaption,
  pre {
    color: ${({ colours }) => colours.textContent};
  }

  blockquote {
    position: relative;
    font-size: 18px;
    font-style: italic;
    padding-left: 1.5em;
    margin: 0.5rem 0 0.5rem 0.25em;
    border-left: ${({ colours }) => `2px solid ${colours.accent}`};

    p {
      color: ${({ colours }) => colours.blockQuote};
    }
  }

  pre,
  #epigraph {
    border-radius: 5px;
    font-size: 0.8em;
    @media all and (min-width: 800px) {
      font-size: 1em;
    }
  }

  pre.language-javascript {
    font-size: 16px;
  }

  code[class*='language-text'] {
    padding: 0 4px;
    border-radius: 2px;
    font-size: 16px;
    color: ${({ colours }) => colours.textContent};
    background: ${({ colours }) => colours.codeElBackground};
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  figcaption {
    font-size: 12px;
    font-style: italic;
  }

  a {
    color: ${({ colours }) => colours.hyperlink};
    &:hover {
      color: ${({ colours }) => colours.hyperlinkHover};
    }
  }
`;

export const PostNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;

  a {
    font-family: ${({ fonts }) => fonts.heading};
    font-size: 1.125em;
    color: ${({ colours }) => colours.hyperlink};
    text-decoration: none;
    &:hover {
      color: ${({ colours }) => colours.hyperlinkHover};
    }
  }
`;
