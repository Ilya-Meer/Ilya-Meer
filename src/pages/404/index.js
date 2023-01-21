import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import Scene from '../../components/ThreeJSScene';
import SEO from '../../components/SEO';
import Header from '../../components/Header';
import font from '../../../static/assets/fonts/raleway_404.json';
import useBodyToggle from '../../utils/useBodyToggle';
import { ThemeContext } from '../../contexts/ThemeContext';

const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 2.5em;
  font-family: ${({ fonts }) => fonts.heading};
  font-weight: 600;
  color: ${({ colours }) => colours.textContent};
`;

const Content = styled.p`
  line-height: 1.5em;
  font-size: 1.2em;
  font-family: ${({ fonts }) => fonts.text};
  color: ${({ colours }) => colours.textContent};
`;

const NotFoundPage = props => {
  const {
    theme: { colours },
    fonts,
    darkEnabled,
  } = useContext(ThemeContext);

  const { location } = props;

  const displayText = '404';
  const colour = darkEnabled ? 0xffffff : 0x000000;
  const size = 75;

  useBodyToggle(colours);

  return (
    <Fragment>
      <SEO title="404: Not Found" />
      <Header location={location} />
      <ContentWrapper>
        <Heading colours={colours} fonts={fonts}>
          Whoops!
        </Heading>
        <Content colours={colours} fonts={fonts}>
          Looks like the page you're looking for isn't here, sorry about that.
          Try one of the links above.
        </Content>
      </ContentWrapper>
      <Scene
        font={font}
        displayText={displayText}
        colour={colour}
        size={size}
      />
    </Fragment>
  );
};

export default NotFoundPage;
