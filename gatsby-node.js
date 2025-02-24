const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/glossary/" } }) {
        nodes {
          id
          frontmatter {
            slug
            term
            seoTitle
            seoDescription
            datePublished
            dateModified
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: `/glossary/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/GlossaryTerm.js"),
      context: {
        id: node.id,
      },
    });
  });
};
