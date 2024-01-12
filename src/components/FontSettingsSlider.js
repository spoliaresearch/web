// FontSettingsSlider.js
import React, { useContext } from 'react';
import { FontSettingsContext } from '../contexts/FontSettingsContext';
import './FontSettingsSlider.css';
const FontSettingsSlider = () => {
  const { SRFF, setSRFF } = useContext(FontSettingsContext);
    const { fontSize, setFontSize } = useContext(FontSettingsContext);

  const handleChange = (event) => {
    setSRFF(event.target.value);
  };

  const handleFontSizeChange = (event) => {
  const sizeMap = {
    'small': '16px',
    'medium': '18px',
    'large': '20px',
    'xlarge': '24px',
  };
  setFontSize(sizeMap[event.target.dataset.size]);
};

  return (
    <div className="font-settings-slider">
        <div className="font-labels">
      <div>Sans</div>
      <div className="example" style={{fontSize: fontSize}}>
        Aa
      </div>
      <div>Serif</div>
      </div>
      <input
        id="srff-slider"
        type="range"
        min="0"
        max="100"
        step='10'
        value={SRFF}
        onChange={handleChange}
      />
       <div className="font-size-options">
        <input
    type="button"
    value="S"
    data-size="small"
    className={fontSize === '14px' ? 'font-size-option active' : 'font-size-option'}
    onClick={handleFontSizeChange}
  />
  <input
    type="button"
    value="M"
    data-size="medium"
    className={fontSize === '16px' ? 'font-size-option active' : 'font-size-option'}
    onClick={handleFontSizeChange}
  />
  <input
    type="button"
    value="L"
    data-size="large"
    className={fontSize === '18px' ? 'font-size-option active' : 'font-size-option'}
    onClick={handleFontSizeChange}
  />
  <input
    type="button"
    value="XL"
    data-size="xlarge"
    className={fontSize === '20px' ? 'font-size-option active' : 'font-size-option'}
    onClick={handleFontSizeChange}
  />
      </div>
    </div>
  );
};

export default FontSettingsSlider;
