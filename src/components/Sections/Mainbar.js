import React from "react";
import { Link } from "gatsby";
import "./Mainbar.css";
import SidebarItem from "./MainbarItem";
import { useStaticQuery, graphql } from "gatsby";

const Sidebar = React.forwardRef((props, ref) => {
  const data = useStaticQuery(graphql`
    query {
      allGoogleDocs {
        nodes {
          name
          slug
          date
          id
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  `);

  const sidebarItemsData = data.allGoogleDocs.nodes.map((node) => ({
    title: node.name,
    slug: node.slug,
    textSnippet: node.childMarkdownRemark.excerpt, // Add your logic to extract text snippet from the document if needed
    date: node.date,
    active: false, // You can add your own logic to determine the active item
  }));

  const sortItems = (items, field, order = "asc") => {
    return items.sort((a, b) => {
      if (field === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
      // Default to alphabetical sorting
      return order === "asc" ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
    });
  };

  // Example usage: sort by date in descending order
  // You can dynamically change the field and order based on user input or preferences
  const sortedItems = sortItems(sidebarItemsData, "date", "desc");

  return (
    <div className="Mainbar" ref={ref} style={props.style}>
      {sortedItems.map((itemData, index) => (
        <Link key={index} to={itemData.slug}>
          <SidebarItem
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

export default Sidebar;
