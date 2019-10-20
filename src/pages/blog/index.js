import '../../../static/stylesheets/normalize.css';
import '../../../static/stylesheets/global.css';
import React, { Component } from 'react';
import { Link, graphql } from "gatsby";
import italicize from "../../utils/italicize";
import SEO from '../../components/SEO';
import Layout from '../../components/Layout';
import styles from './styles.module.css';

class BlogIndex extends Component {
  render() {
    const { data, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article
              key={node.fields.slug}
              className={styles.postWrapper}
            >
              <h1>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {italicize(title)}
                </Link>
              </h1>
              <p className={styles.postDate}>{node.frontmatter.date}</p>
              <div className={styles.postExcerpt}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </div>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

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
`
