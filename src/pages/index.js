import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO"
import ThreeJSScene from "../components/ThreeJSScene"
import font from '../../static/assets/fonts/raleway_im.json'

class Home extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    const displayText = "IM";
    const color = 0x293749; 

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home Page" />
        <div>
          <ThreeJSScene
            font={font}
            displayText={displayText}
            color={color}
            size={200}
          />
        </div>
      </Layout>
    )
  }
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
