import React, { useState } from "react";
import "./SidebarItem.css";

const SidebarItem = React.forwardRef(({ title, textSnippet, date, active }, ref) => {
  const [isActive, setIsActive] = useState(active);

  function formatDate(originalDateString) {
    const originalDate = new Date(originalDateString);
    const day = originalDate.getUTCDate().toString().padStart(2, "0");
    const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getUTCFullYear().toString();
    return `${month}.${day}.${year}`;
  }

  const activeClassName = isActive ? "sidebar-item-active" : "";

  return (
    <div ref={ref} className={`sidebar-item ${activeClassName}`}>
      <div className="title-date-container ">
        <h3>{title}</h3>
        <span>{formatDate(date)}</span>
      </div>
      <p>{textSnippet.slice(0, -3) + "..."}</p>
    </div>
  );
});

export default SidebarItem;
