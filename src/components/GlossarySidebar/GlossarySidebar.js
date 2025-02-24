import React from "react";
import { Link } from "gatsby";
import "./GlossarySidebar.css";
import GlossarySidebarItem from "./GlossarySidebarItem";
import { useStaticQuery, graphql } from "gatsby";

const GlossarySidebar = React.forwardRef((props, ref) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/glossary/" } }) {
        nodes {
          frontmatter {
            term
            slug
            datePublished
          }
          excerpt(pruneLength: 150)
        }
      }
    }
  `);

  const sidebarItemsData = data.allMarkdownRemark.nodes.map((node) => ({
    title: node.frontmatter.term,
    slug: `/glossary/${node.frontmatter.slug}`,
    textSnippet: node.excerpt,
    date: node.frontmatter.datePublished,
    active: props.currentSlug === node.frontmatter.slug,
  }));

  const sortedItems = sidebarItemsData.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="GlossarySidebar" ref={ref} style={props.style}>
      {sortedItems.map((itemData, index) => (
        <Link className="link" key={index} to={itemData.slug}>
          <GlossarySidebarItem
            title={itemData.title}
            textSnippet={itemData.textSnippet}
            date={itemData.date}
            active={itemData.active}
          />
        </Link>
      ))}
    </div>
  );
});

export default GlossarySidebar;
