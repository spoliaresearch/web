import React, { useState } from "react";
import FontSettingsSlider from "./FontSettingsSlider";
import "./FontSettingsToggle.css";

const FontSettingsToggle = () => {
  const [showSlider, setShowSlider] = useState(false);

  const handleToggleClick = () => {
    setShowSlider(!showSlider);
  };

  return (
    <div className="font-settings-toggle" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        onClick={handleToggleClick}
        className="font-toggle-button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          lineHeight: "1",
        }}
      >
        <span style={{ verticalAlign: "middle" }}>Aa</span>
      </div>
      {showSlider && <FontSettingsSlider onClose={() => setShowSlider(false)} />}
    </div>
  );
};

export default FontSettingsToggle;
