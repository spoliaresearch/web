import React, { useState } from 'react';
import './SidebarItem.css';

const SidebarItem = React.forwardRef(({ title, textSnippet, date, active }, ref) => {
  const [isActive, setIsActive] = useState(active);

  const activeClassName = isActive ? 'sidebar-item-active' : '';

  return (
    <div ref={ref} className={`sidebar-item ${activeClassName}`}>
      <div className="title-date-container ">
        <h3>{title}</h3>
        <span>{date}</span>
      </div>
      <p>{textSnippet.slice(0, -3) + '...'}</p>
    </div>
  );
});

export default SidebarItem;
