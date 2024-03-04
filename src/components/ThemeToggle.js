import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext) || { isDarkMode: false, setIsDarkMode: () => {} };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{ paddingRight: "5px", display: "inline-flex", alignItems: "center" }} onClick={handleModeToggle}>
      {!isDarkMode ? (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7.79871" y="0.176468" width="1.71041" height="1.71041" fill="black" />
          <rect x="6.08826" y="0.176468" width="1.71041" height="1.71041" fill="black" />
          <rect x="4.37787" y="1.88688" width="1.71041" height="1.71041" fill="black" />
          <rect x="2.66742" y="3.59728" width="1.71041" height="1.71041" fill="black" />
          <rect x="2.66742" y="5.30769" width="1.71041" height="1.71041" fill="black" />
          <rect x="0.957001" y="7.0181" width="1.71041" height="1.71041" fill="black" />
          <rect x="0.957001" y="8.7285" width="1.71041" height="1.71041" fill="black" />
          <rect x="2.66742" y="10.4389" width="1.71041" height="1.71041" fill="black" />
          <rect x="2.66742" y="12.1493" width="1.71041" height="1.71041" fill="black" />
          <rect x="4.37787" y="13.8597" width="1.71041" height="1.71041" fill="black" />
          <rect x="6.08826" y="13.8597" width="1.71041" height="1.71041" fill="black" />
          <rect x="7.79871" y="15.5701" width="1.71041" height="1.71041" fill="black" />
          <rect x="9.50909" y="15.5701" width="1.71041" height="1.71041" fill="black" />
          <rect x="11.2195" y="13.8597" width="1.71041" height="1.71041" fill="black" />
          <rect x="12.9298" y="13.8597" width="1.71041" height="1.71041" fill="black" />
          <rect x="14.6403" y="12.1493" width="1.71041" height="1.71041" fill="black" />
          <rect x="16.3507" y="10.4389" width="1.71041" height="1.71041" fill="black" />
          <rect x="16.3507" y="8.7285" width="1.71041" height="1.71041" fill="black" />
          <rect x="14.6403" y="8.7285" width="1.71041" height="1.71041" fill="black" />
          <rect x="12.9298" y="8.7285" width="1.71041" height="1.71041" fill="black" />
          <rect x="11.2195" y="10.4389" width="1.71041" height="1.71041" fill="black" />
          <rect x="9.50909" y="10.4389" width="1.71041" height="1.71041" fill="black" />
          <rect x="7.79871" y="8.7285" width="1.71041" height="1.71041" fill="black" />
          <rect x="6.08826" y="7.0181" width="1.71041" height="1.71041" fill="black" />
          <rect x="6.08826" y="5.30769" width="1.71041" height="1.71041" fill="black" />
          <rect x="7.79871" y="3.59728" width="1.71041" height="1.71041" fill="black" />
          <rect x="7.79871" y="1.88688" width="1.71041" height="1.71041" fill="black" />
          <rect x="9.50909" y="0.176468" width="1.71041" height="1.71041" fill="black" />
        </svg>
      ) : (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14.6538" y="13.1538" width="1.46154" height="1.46154" fill="white" />
          <rect x="8.80768" y="17.5385" width="1.46154" height="1.46154" fill="white" />
          <rect x="0.0384521" y="8.76923" width="1.46154" height="1.46154" fill="white" />
          <g clip-path="url(#clip0_0_1)">
            <rect x="8.80769" y="4.38461" width="1.46154" height="1.46154" fill="white" />
            <rect x="7.34616" y="4.38461" width="1.46154" height="1.46154" fill="white" />
            <rect x="10.2692" y="4.38461" width="1.46154" height="1.46154" fill="white" />
            <rect x="10.2692" y="5.84615" width="1.46154" height="1.46154" fill="white" />
            <rect x="11.7308" y="5.84615" width="1.46154" height="1.46154" fill="white" />
            <rect x="11.7308" y="7.30769" width="1.46154" height="1.46154" fill="white" />
            <rect x="13.1923" y="7.30769" width="1.46154" height="1.46154" fill="white" />
            <rect x="13.1923" y="8.76923" width="1.46154" height="1.46154" fill="white" />
            <rect x="13.1923" y="10.2308" width="1.46154" height="1.46154" fill="white" />
            <rect x="11.7308" y="10.2308" width="1.46154" height="1.46154" fill="white" />
            <rect x="11.7308" y="11.6923" width="1.46154" height="1.46154" fill="white" />
            <rect x="10.2692" y="11.6923" width="1.46154" height="1.46154" fill="white" />
            <rect x="10.2692" y="13.1538" width="1.46154" height="1.46154" fill="white" />
            <rect x="8.80769" y="13.1538" width="1.46154" height="1.46154" fill="white" />
            <rect x="8.80769" y="16.0769" width="1.46154" height="1.46154" fill="white" />
            <rect x="2.96153" y="13.1538" width="1.46154" height="1.46154" fill="white" />
            <rect x="1.50002" y="8.76923" width="1.46154" height="1.46154" fill="white" />
            <rect x="2.96153" y="4.38461" width="1.46154" height="1.46154" fill="white" />
            <rect x="8.80769" width="1.46154" height="1.46154" fill="white" />
            <rect x="14.6539" y="4.38461" width="1.46154" height="1.46154" fill="white" />
            <rect x="7.34616" y="13.1538" width="1.46154" height="1.46154" fill="white" />
            <rect x="7.34616" y="11.6923" width="1.46154" height="1.46154" fill="white" />
            <rect x="5.88463" y="11.6923" width="1.46154" height="1.46154" fill="white" />
            <rect x="5.88463" y="10.2308" width="1.46154" height="1.46154" fill="white" />
            <rect x="4.42307" y="10.2308" width="1.46154" height="1.46154" fill="white" />
            <rect x="4.42307" y="8.76923" width="1.46154" height="1.46154" fill="white" />
            <rect x="4.42307" y="7.30769" width="1.46154" height="1.46154" fill="white" />
            <rect x="5.88463" y="7.30769" width="1.46154" height="1.46154" fill="white" />
            <rect x="5.88463" y="5.84615" width="1.46154" height="1.46154" fill="white" />
            <rect x="7.34616" y="5.84615" width="1.46154" height="1.46154" fill="white" />
            <rect x="16.1154" y="14.6154" width="1.46154" height="1.46154" fill="white" />
            <rect x="1.50002" y="14.6154" width="1.46154" height="1.46154" fill="white" />
            <rect x="1.50002" y="2.92308" width="1.46154" height="1.46154" fill="white" />
            <rect x="8.80769" y="1.46154" width="1.46154" height="1.46154" fill="white" />
            <rect x="16.1154" y="2.92308" width="1.46154" height="1.46154" fill="white" />
            <rect x="16.1154" y="8.76923" width="1.46154" height="1.46154" fill="white" />
            <rect x="17.5769" y="8.76923" width="1.46154" height="1.46154" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_0_1">
              <rect width="17.5385" height="17.5385" fill="white" transform="translate(0.769226)" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default ModeToggle;
