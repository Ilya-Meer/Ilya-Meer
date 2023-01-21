import React, { Fragment, useContext } from 'react';
import { graphql } from 'gatsby';

import Header from '../components/Header';
import SEO from '../components/SEO';
import Bio from '../components/Bio';
import Canvas from '../components/Canvas';
import { ThemeContext } from '../contexts/ThemeContext';
import useBodyToggle from '../utils/useBodyToggle';


const Home = ({ location }) => {
  const { theme: { colours }, darkEnabled } = useContext(ThemeContext);
  const { pageBackground: bgColour } = colours;
  const strokeColour = darkEnabled ? '#fff' : '#000';

  useBodyToggle(colours);

  return (
    <Fragment>
      <Header location={location} />
      <SEO title="Home" />
        <Bio colours={colours} />
        <Canvas
          config={{
            width: '100vw',
            height: 600,
            strokeColour,
            bgColour,
          }}
        />
    </Fragment>
  );
};

export default Home;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
