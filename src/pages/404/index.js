import React, { useContext, Fragment } from 'react';
import Scene from '../../components/ThreeJSScene';
import SEO from '../../components/SEO';
import Header from '../../components/Header';
import font from '../../../static/assets/fonts/raleway_404.json';
import styled from 'styled-components';

import { ThemeContext } from '../../contexts/ThemeContext';

const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 2.5em;
  font-family: ${({ fonts }) => fonts.heading};
`;

const Content = styled.p`
  font-size: 1.2em;
  line-height: 1.5em;
  font-family: ${({ fonts }) => fonts.text};
`;

const NotFoundPage = props => {
  const { fonts } = useContext(ThemeContext);
  const { location } = props;

  const displayText = '404';
  const colour = 0x000;
  const size = 75;

  return (
    <Fragment>
      <SEO title="404: Not Found" />
      <Header location={location} />
      <ContentWrapper>
        <Heading fonts={fonts}>Whoops!</Heading>
        <Content fonts={fonts}>
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
