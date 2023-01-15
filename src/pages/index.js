import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Canvas from '../components/Canvas';
import { ThemeContext } from '../contexts/ThemeContext';

const Home = ({ location, data }) => {
  const { theme, darkEnabled } = useContext(ThemeContext);
  const { pageBackground: bgColour } = theme.colours;
  const strokeColour = darkEnabled ? '#fff' : '#000';

  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <div>
        <Canvas
          config={{
            width: window.innerWidth,
            height: 600,
            strokeColour,
            bgColour,
          }}
        />
      </div>
    </Layout>
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
