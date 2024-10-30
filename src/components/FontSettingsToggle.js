import React, { useState } from "react";
import FontSettingsSlider from "./FontSettingsSlider";
import "./FontSettingsToggle.css";

const FontSettingsToggle = () => {
  const [showSlider, setShowSlider] = useState(false);

  const handleToggleClick = () => {
    setShowSlider(!showSlider);
  };

  return (
    <div className="font-settings-toggle">
      <div onClick={handleToggleClick} className="font-toggle-button">
        <span>Aa</span>
      </div>
      {showSlider && <FontSettingsSlider onClose={() => setShowSlider(false)} />}
    </div>
  );
};

export default FontSettingsToggle;
