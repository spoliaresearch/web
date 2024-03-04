import React, { useState } from 'react';
import FontSettingsSlider from './FontSettingsSlider';
import './FontSettingsToggle.css';

const FontSettingsToggle = () => {
  const [showSlider, setShowSlider] = useState(false);

  const handleToggleClick = () => {
    setShowSlider(!showSlider);
  };

  return (
    <div className="font-settings-toggle">
      <div onClick={handleToggleClick}><span>Aa</span></div>
      {showSlider && (
        <div className="font-settings-popup">
          <FontSettingsSlider />
        </div>
      )}
    </div>
  );
};

export default FontSettingsToggle;
