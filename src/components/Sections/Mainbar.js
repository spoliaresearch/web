import React from 'react';
import { Link } from 'gatsby';
import './Mainbar.css';
import SidebarItem from './MainbarItem';
import { useStaticQuery, graphql } from 'gatsby';

const Sidebar = React.forwardRef((props, ref) => {
  const data = useStaticQuery(graphql`
    query {
      allGoogleDocs {
        nodes {
          name
          slug
          createdTime
          id
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  `);

  const sidebarItemsData = data.allGoogleDocs.nodes.map(node => ({
    title: node.name,
    slug: node.slug,
    textSnippet: node.childMarkdownRemark.excerpt, // Add your logic to extract text snippet from the document if needed
    date: node.createdTime,
    active: false, // You can add your own logic to determine the active item
  }));

  return (
    <div className="Mainbar" ref={ref} style={props.style}>
      {sidebarItemsData.map((itemData, index) => (
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
