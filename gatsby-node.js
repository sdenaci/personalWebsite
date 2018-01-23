const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: `blog/posts${slug}`
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges{
            node {
              fields {
                slug
              }
              frontmatter {
                tag
              }
            }
          }
        }
      }`
    ).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            slug: node.fields.slug,
          },
        })
        var tags = node.frontmatter.tag.split(', ')
        tags.map(tag => {
          const tagRegEx = `/(${tag})\,|(${tag})$/`
          createPage({
          path: `blog/tags/${tag}`,
          component: path.resolve(`./src/templates/tag-page.js`),
          context: {
            tagRegEx: tagRegEx
          },
        })
      })
      resolve()
    })
  })
})
}
