import React from 'react'
import Link from 'gatsby-link'


const tagStyle = {
  border: '1px solid #85C1E9',
  marginTop: '-3px',
  marginRight: '10px',
  padding: '2px',
  borderRadius: '3px'
}

export default ({ data }) => {

  const post = data.markdownRemark
  return (
  <div id="blogPostTemplate">
    <div>
      <h2>
        {post.frontmatter.title}
      </h2>
      <div className="tagFlexContainer">
        <h3>
        tags:
        </h3>
        <div className="flexListContainer">
          {post.frontmatter.tag ? (
            post.frontmatter.tag.split(', ').map( tag => {

            return (
            <Link to={`blog/tags/${tag}`} className="tagBorder">
            {tag}
            </Link>
            )
            })) :
            null
          }
        </div>
      </div>
      <div className="blogParagraphs" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tag
      }
    }
  }
`
