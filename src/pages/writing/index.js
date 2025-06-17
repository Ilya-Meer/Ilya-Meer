import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import italicize from '../../utils/italicize';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout';
import { ThemeContext } from '../../contexts/ThemeContext';
import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  align-items: flex-start;
  margin: 1.5rem 0;

  @media all and (min-width: 800px) {
    align-items: center;
  }
`;

const PostDate = styled.p`
  margin: 0 1rem 0 0;
  padding-top: 2px;
  min-width: 6rem;
  font-family: ${({ fonts }) => fonts.heading};
  font-size: 1rem;
  color: ${({ colours }) => colours.textContent};

  @media all and (min-width: 800px) {
    padding-top: 0;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: ${({ fonts }) => fonts.heading};
`;

const HeadingLink = styled(Link)`
  color: ${({ colours }) => colours.postTitle};
  text-decoration: none;
  &:hover {
    color: ${({ colours }) => colours.postTitleHover};
  }
`;

const PostIndex = props => {
  const {
    theme: { colours },
    fonts,
  } = useContext(ThemeContext);

  const { data, location } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <Article key={node.fields.slug}>
            <PostDate colours={colours} fonts={fonts}>
              {node.frontmatter.date}
            </PostDate>
            <Heading fonts={fonts}>
              <HeadingLink colours={colours} to={node.fields.slug}>
                {italicize(title)}
              </HeadingLink>
            </Heading>
          </Article>
        );
      })}
    </Layout>
  );
};

export default PostIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
