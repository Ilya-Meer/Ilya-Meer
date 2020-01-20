import '../../static/stylesheets/global.css';
import React from 'react';
import { Link, graphql } from 'gatsby';
import italicize from '../utils/italicize';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import styles from './styles.module.css';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1 className={styles.postTitle}>
          {italicize(post.frontmatter.title)}
        </h1>
        <p className={styles.postDate}>{post.frontmatter.date}</p>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <ul className={styles.postNav}>
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
        </ul>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
