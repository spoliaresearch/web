import React from "react";
import "./GlossarySidebarItem.css";

const GlossarySidebarItem = ({ title, textSnippet, date, active }) => {
  return (
    <div className={`glossary-sidebar-item ${active ? "active" : ""}`}>
      <div className="title-date-container">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default GlossarySidebarItem;
