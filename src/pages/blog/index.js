import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import italicize from '../../utils/italicize';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout';
import { ThemeContext } from '../../contexts/ThemeContext';
import styled from 'styled-components';

const Article = styled.article`
  margin: 5em 0;
`;

const PostDate = styled.p`
  font-family: ${({ fonts }) => fonts.heading};
  font-size: 0.875em;
  margin-top: 0.5em;
`;

const PostExcerpt = styled.div`
  padding: 0.25em 0;
  font-size: 18px;
  line-height: 24px;
  font-family: ${({ fonts }) => fonts.text};
`;

const Heading = styled.h1`
  margin: 0.25em 0 0.2em 0;
  font-size: 2.5em;
  font-family: ${({ fonts }) => fonts.heading};
`;

const HeadingLink = styled(Link)`
  color: ${({ colours }) => colours.gray5};
  text-decoration: none;
  &:hover {
    color: ${({ colours }) => colours.gray4};
  }
`;

const BlogIndex = props => {
  const { colours, fonts } = useContext(ThemeContext);

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
            <Heading fonts={fonts}>
              <HeadingLink colours={colours} to={node.fields.slug}>
                {italicize(title)}
              </HeadingLink>
            </Heading>
            <PostDate fonts={fonts}>{node.frontmatter.date}</PostDate>
            <PostExcerpt fonts={fonts}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </PostExcerpt>
          </Article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

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
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
