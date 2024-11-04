import React, { useState } from "react";
import FontSettingsSlider from "./FontSettingsSlider";
import "./FontSettingsToggle.css";

const FontSettingsToggle = ({ includeText = false }) => {
  const [showSlider, setShowSlider] = useState(false);

  const handleToggleClick = () => {
    setShowSlider(!showSlider);
  };

  const ToggleButton = (
    <div
      onClick={handleToggleClick}
      className="font-toggle-button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: "1",
        cursor: "pointer",
      }}
    >
      <span style={{ verticalAlign: "middle" }}>Aa</span>
    </div>
  );

  return (
    <div className="font-settings-toggle" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {includeText ? (
        <div
          onClick={handleToggleClick}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
        >
          {ToggleButton} Readability
        </div>
      ) : (
        ToggleButton
      )}
      {showSlider && <FontSettingsSlider onClose={() => setShowSlider(false)} />}
    </div>
  );
};

export default FontSettingsToggle;
