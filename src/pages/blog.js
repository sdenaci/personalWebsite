import React from 'react'
import Link from 'gatsby-link'



export default ({ data }) => {
  let tagDict = {}
  let tagDictArr
  const allTags = data.allTags
  allTags.edges.map(({node}) => {
      node.frontmatter.tag.split(', ').map(tag => {
        tagDict[tag] ? tagDict[tag]++ : tagDict[tag] = 1
      })
    })
  const compareSecondColumn = function(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
  }
  return (
    <div className="bodyContainer">
      <div className="flexContainer">
        <h2>here r my thoughts</h2>
      </div>
      <div className="blogFlexContainer" style={{flexDirection: 'row-reverse'}}>
        <div className="tagContainer">
          <h3>all tags</h3>
            <div className="tagList">
            {Object.entries(tagDict).sort(compareSecondColumn).map(pair => {
              return(
                <div>
                <Link to={`blog/tags/${pair[0]}`}>{pair[0]} ({pair[1]})</Link>
                </div>
                )
            })}
            </div>
        </div>
        <div className="blogBody">
          {data.blogData.edges.map(({ node}) =>
            <div className="blogPost">
                <Link to={node.fields.slug}>
                  <h3>{node.frontmatter.title}{" - "}{node.frontmatter.date}</h3>
                </Link>
                <div className="tagFlexContainer">
                  <h3>
                  tags:
                  </h3>
                    <div className="flexListContainer">
                      {(node.frontmatter.tag ? (
                        node.frontmatter.tag.split(', ').map(tag => {
                        tagDict[tag] ? tagDict[tag]++ : tagDict[tag] = 1
                        return (
                        <Link to={`blog/tags/${tag}`} className="tagBorder">
                        {tag}
                        </Link>
                        )
                        })) :
                        null
                      )}
                    </div>
                </div>
                <p>
                  {node.excerpt}
                </p>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export const query = graphql`
  query IndexQuery {
    blogData: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tag
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    allTags: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tag
          }
        }
      }
    }
  }
`

