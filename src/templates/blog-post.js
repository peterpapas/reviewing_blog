import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      image {
        fluid(maxWidth: 750) {
          src
        }
      }
      blogPost {
        blogPost
      }
    }
  }
`

const BlogPost = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <SEO title={props.data.contentfulPost.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulPost.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulPost.publishedDate}
        </span>

        {props.data.contentfulPost.featuredImage && (
          <Img
            className="featured"
            fluid={props.data.contentfulPost.image.fluid}
            alt={props.data.contentfulPost.title}
          />
        )}

        {documentToReactComponents(
          props.data.contentfulPost.BlogPost,
          options
        )}
      </div>
    </Layout>
  )
}

export default BlogPost
