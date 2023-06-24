import React from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import { useStaticQuery, graphql } from 'gatsby';
const Sidebar = React.forwardRef((props, ref) => {
   const data = useStaticQuery(graphql`
    query {
      allGoogleDocs {
        nodes {
          name
          createdTime
          id
        }
      }
    }
  `);

  const sidebarItemsData = data.allGoogleDocs.nodes.map(node => ({
    title: node.name,
    textSnippet: '', // Add your logic to extract text snippet from the document if needed
    date: node.createdTime,
    active: false, // You can add your own logic to determine the active item
  }));
  return (
    <div className="Sidebar" ref={ref} style={props.style}>
      {sidebarItemsData.map((itemData, index) => (
        <SidebarItem
          key={index}
          title={itemData.title}
          textSnippet={itemData.textSnippet}
          date={itemData.date}
          active={itemData.active}
        />
      ))}
    </div>
  );
});

export default Sidebar;
