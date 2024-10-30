import React, { useState } from "react";
import "./MainbarItem.css";

const SidebarItem = React.forwardRef(({ title, textSnippet, date, active }, ref) => {
  const [isActive, setIsActive] = useState(active);

  function formatDate(originalDateString) {
    const originalDate = new Date(originalDateString);
    const day = originalDate.getUTCDate().toString().padStart(2, "0");
    const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getUTCFullYear().toString();
    return `${month}.${day}.${year}`;
  }

  const activeClassName = isActive ? "mainbar-item-active" : "";

  return (
    <div ref={ref} className={`mainbar-item ${activeClassName}`}>
      <div className="title-date-container">
        <h3 className="title">{title}</h3>
        <p className="text-snippet">{textSnippet.slice(0, -3) + "..."}</p>
        <span className="date">{formatDate(date)}</span>
      </div>
    </div>
  );
});

export default SidebarItem;
