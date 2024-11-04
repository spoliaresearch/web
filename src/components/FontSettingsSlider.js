// FontSettingsSlider.js
import React, { useContext } from "react";
import { FontSettingsContext } from "../contexts/FontSettingsContext";
import "./FontSettingsSlider.css";
const FontSettingsSlider = ({ onClose }) => {
  const { SRFF, setSRFF } = useContext(FontSettingsContext);
  const { fontSize, setFontSize } = useContext(FontSettingsContext);
  const [tempSRFF, setTempSRFF] = React.useState(SRFF);
  const [tempFontSize, setTempFontSize] = React.useState(fontSize);

  const natureTexts = [
    "Flowers can have UV patterns visible only to bees.",
    "Rainbows typically form a full circle.",
    "Sunsets can appear blue in polar regions.",
    "Some fungi can glow in the dark.",
    "Mountains can influence local weather patterns.",
    "Ocean waves can travel thousands of miles.",
    "Leaf shapes can help identify plant species.",
    "No two snowflakes are exactly alike.",
    "Autumn foliage creates brilliant red and orange hues.",
    "Aurora borealis is caused by solar wind.",
    "Waterfalls can create rainbows in their mist.",
    "Coral reefs support over 25% of marine life.",
    "Some cacti bloom only once a year.",
    "Lakes can change color due to algae blooms.",
    "Butterfly wings can reflect light at different angles.",
    "Fog can create mystical landscapes in forests.",
    "Natural hot springs can be rich in minerals.",
    "Geysers can erupt over 100 feet into the air.",
    "Some birds can see ultraviolet light.",
    "Starry nights can reveal thousands of visible stars.",
  ];

  const [previewText] = React.useState(() => natureTexts[Math.floor(Math.random() * natureTexts.length)]);

  const handleChange = (event) => {
    // Convert the 0-100 range to 0-1 range for SRFF
    const value = parseFloat(event.target.value);
    const mappedValue = value / 100;
    setTempSRFF(mappedValue);
  };

  const handleFontSizeChange = (event) => {
    const sizeMap = {
      small: 0.78,
      medium: 1,
      large: 1.22,
      xlarge: 1.44,
    };
    setTempFontSize(sizeMap[event.target.dataset.size]);
  };

  const handleConfirm = () => {
    setSRFF(tempSRFF);
    setFontSize(tempFontSize);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="font-settings-modal">
      <div className="modal-content">
        <div className="preview-section">
          <div
            className="example"
            style={{
              fontSize: "4rem",
              fontFamily: "Arizona Variable",
              fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${tempSRFF}`,
              WebkitFontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${tempSRFF}`,
            }}
          >
            Aa
          </div>
        </div>

        <div className="font-settings-slider">
          <div className="font-labels">
            <div>Sans</div>

            <div>Serif</div>
          </div>

          <input
            id="srff-slider"
            type="range"
            min="0"
            max="100"
            step="1"
            value={tempSRFF * 100}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <div className="font-size-options">
            <input
              type="button"
              value="S"
              data-size="small"
              className={tempFontSize === 0.75 ? "font-size-option active" : "font-size-option"}
              onClick={handleFontSizeChange}
            />
            <input
              type="button"
              value="M"
              data-size="medium"
              className={tempFontSize === 1 ? "font-size-option active" : "font-size-option"}
              onClick={handleFontSizeChange}
            />
            <input
              type="button"
              value="L"
              data-size="large"
              className={tempFontSize === 1.25 ? "font-size-option active" : "font-size-option"}
              onClick={handleFontSizeChange}
            />
            <input
              type="button"
              value="XL"
              data-size="xlarge"
              className={tempFontSize === 1.5 ? "font-size-option active" : "font-size-option"}
              onClick={handleFontSizeChange}
            />
          </div>
          <p
            style={{
              fontSize: `calc(1rem * ${tempFontSize})`,
              fontFamily: "Arizona Variable",
              fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${tempSRFF}`,
              WebkitFontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${tempSRFF}`,
              lineHeight: "1.5",
              margin: "1rem 0",
            }}
          >
            {previewText}
          </p>
          <div className="modal-actions">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleConfirm}>Apply Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontSettingsSlider;
