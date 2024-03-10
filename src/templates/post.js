import React, { useContext } from 'react';
import { Link, graphql } from 'gatsby';
import italicize from '../utils/italicize';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Heading, PostDate, PostContent, PostNav } from './style';
import { ThemeContext } from '../contexts/ThemeContext';

const WritingPostTemplate = props => {
  const {
    theme: { colours },
    fonts,
  } = useContext(ThemeContext);

  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Heading colours={colours} fonts={fonts}>
        {italicize(post.frontmatter.title)}
      </Heading>
      <PostDate colours={colours} fonts={fonts}>
        {post.frontmatter.date}
      </PostDate>
      <PostContent
        colours={colours}
        fonts={fonts}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <hr />
      <PostNav fonts={fonts} colours={colours}>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {italicize(previous.frontmatter.title)}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {italicize(next.frontmatter.title)} →
            </Link>
          )}
        </li>
      </PostNav>
    </Layout>
  );
};

export default WritingPostTemplate;

export const pageQuery = graphql`
  query WritingPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
