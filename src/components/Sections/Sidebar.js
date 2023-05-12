import React from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
const Sidebar = React.forwardRef((props, ref) => {
 const sidebarItemsData = []
    for (let i = 0; i <= 10; i++) {
    sidebarItemsData.push({
      title: `The design and art of Spolia ${i}`,
      textSnippet: `The first prejudice teachers of art appreciation usually try to combat is the belief that art is a matter of `,
      date: `2023.05.${12 - (i - 1)}`,
      active: i == 0,
    });
  }
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
