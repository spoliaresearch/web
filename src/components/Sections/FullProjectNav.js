import React from 'react';
import { Link } from 'gatsby';
import './FullScreenNav.css'; // Ensure you have the CSS for this component
import SidebarItem from './SidebarItem'; // Reusing the SidebarItem component
import { useStaticQuery, graphql } from 'gatsby';

const FullScreenNav = () => {
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
  const navItemsData = data.allGoogleDocs.nodes.map(node => ({
    // Mapping logic (same as in Sidebar)
  }));

  return (
    <div className="FullScreenNav">
      {/* Render your full screen navigation items here */}
      {navItemsData.map((itemData, index) => (
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
};

export default FullScreenNav;
