import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Scene from '../components/ThreeJSScene';
import font from '../../static/assets/fonts/raleway_im.json';
import { ThemeContext } from '../contexts/ThemeContext';

const Home = props => {
  const {
    theme: { colours },
    darkEnabled,
  } = useContext(ThemeContext);

  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  const displayText = 'IM';
  const colour = darkEnabled ? 0xffffff : 0x293749;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Home" />
      <div>
        <Scene
          font={font}
          displayText={displayText}
          colour={colour}
          size={200}
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
