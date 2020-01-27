import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: 2.5em;
  font-family: ${({ fonts }) => fonts.heading};
  margin: 0;
`;

export const PostDate = styled.p`
  font-family: ${({ fonts }) => fonts.heading};
  font-size: 0.875em;
  margin-top: 0.5em;
  margin-bottom: 2.5em;
`;

export const PostContent = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  font-family: ${({ fonts }) => fonts.text};

  p {
    color: ${({ colours }) => colours.gray6};
  }

  blockquote {
    position: relative;
    font-size: 18px;
    color: ${({ colours }) => colours.gray3};
    font-style: italic;
    padding-left: 1.5em;
    margin: 0.5rem 0 0.5rem 0.25em;
    border-left: ${({ colours }) => `2px solid ${colours.steelBlueLight}`};
  }

  pre {
    font-size: 0.8em;
    @media all and (min-width: 800px) {
      font-size: 1em;
    }
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  figcaption {
    font-size: 12px;
    font-style: italic;
  }

  a {
    color: ${({ colours }) => colours.steelBlueLight};
    &:hover {
      color: ${({ colours }) => colours.steelBlue};
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
    color: ${({ colours }) => colours.steelBlueLight};
    text-decoration: none;
    &:hover {
      color: ${({ colours }) => colours.steelBlue};
    }
  }
`;
