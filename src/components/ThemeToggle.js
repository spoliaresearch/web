import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{display:'inline-block', paddingLeft: '20px'}} onClick={handleModeToggle}>
      {!isDarkMode ? (
   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_3)">
<path d="M9.5 0H7.6V1.9H9.5V0Z" fill="black"/>
<path d="M7.6 0H5.7V1.9H7.6V0Z" fill="black"/>
<path d="M5.7 1.89999H3.8V3.79999H5.7V1.89999Z" fill="black"/>
<path d="M3.8 3.8H1.9V5.7H3.8V3.8Z" fill="black"/>
<path d="M3.8 5.7H1.9V7.6H3.8V5.7Z" fill="black"/>
<path d="M1.9 7.60001H0V9.50001H1.9V7.60001Z" fill="black"/>
<path d="M1.9 9.5H0V11.4H1.9V9.5Z" fill="black"/>
<path d="M3.8 11.4H1.9V13.3H3.8V11.4Z" fill="black"/>
<path d="M3.8 13.3H1.9V15.2H3.8V13.3Z" fill="black"/>
<path d="M5.7 15.2H3.8V17.1H5.7V15.2Z" fill="black"/>
<path d="M7.6 15.2H5.7V17.1H7.6V15.2Z" fill="black"/>
<path d="M9.5 17.1H7.6V19H9.5V17.1Z" fill="black"/>
<path d="M11.4 17.1H9.5V19H11.4V17.1Z" fill="black"/>
<path d="M13.3 15.2H11.4V17.1H13.3V15.2Z" fill="black"/>
<path d="M15.2 15.2H13.3V17.1H15.2V15.2Z" fill="black"/>
<path d="M17.1 13.3H15.2V15.2H17.1V13.3Z" fill="black"/>
<path d="M19 11.4H17.1V13.3H19V11.4Z" fill="black"/>
<path d="M19 9.5H17.1V11.4H19V9.5Z" fill="black"/>
<path d="M17.1 9.5H15.2V11.4H17.1V9.5Z" fill="black"/>
<path d="M15.2 9.5H13.3V11.4H15.2V9.5Z" fill="black"/>
<path d="M13.3 11.4H11.4V13.3H13.3V11.4Z" fill="black"/>
<path d="M11.4 11.4H9.5V13.3H11.4V11.4Z" fill="black"/>
<path d="M9.5 9.5H7.6V11.4H9.5V9.5Z" fill="black"/>
<path d="M7.6 7.60001H5.7V9.50001H7.6V7.60001Z" fill="black"/>
<path d="M7.6 5.7H5.7V7.6H7.6V5.7Z" fill="black"/>
<path d="M9.5 3.8H7.6V5.7H9.5V3.8Z" fill="black"/>
<path d="M9.5 1.89999H7.6V3.79999H9.5V1.89999Z" fill="black"/>
<path d="M11.4 0H9.5V1.9H11.4V0Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_1_3">
<rect width="19" height="19" fill="white"/>
</clipPath>
</defs>
</svg>


      ) : (
        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="18" width="2" height="2" fill="white"/>
<rect x="12" y="24" width="2" height="2" fill="white"/>
<rect y="12" width="2" height="2" fill="white"/>
<g clip-path="url(#clip0_0_1)">
<rect x="12" y="6" width="2" height="2" fill="white"/>
<rect x="10" y="6" width="2" height="2" fill="white"/>
<rect x="14" y="6" width="2" height="2" fill="white"/>
<rect x="14" y="8" width="2" height="2" fill="white"/>
<rect x="16" y="8" width="2" height="2" fill="white"/>
<rect x="16" y="10" width="2" height="2" fill="white"/>
<rect x="18" y="10" width="2" height="2" fill="white"/>
<rect x="18" y="12" width="2" height="2" fill="white"/>
<rect x="18" y="14" width="2" height="2" fill="white"/>
<rect x="16" y="14" width="2" height="2" fill="white"/>
<rect x="16" y="16" width="2" height="2" fill="white"/>
<rect x="14" y="16" width="2" height="2" fill="white"/>
<rect x="14" y="18" width="2" height="2" fill="white"/>
<rect x="12" y="18" width="2" height="2" fill="white"/>
<rect x="12" y="22" width="2" height="2" fill="white"/>
<rect x="4" y="18" width="2" height="2" fill="white"/>
<rect x="2" y="12" width="2" height="2" fill="white"/>
<rect x="4" y="6" width="2" height="2" fill="white"/>
<rect x="12" width="2" height="2" fill="white"/>
<rect x="20" y="6" width="2" height="2" fill="white"/>
<rect x="10" y="18" width="2" height="2" fill="white"/>
<rect x="10" y="16" width="2" height="2" fill="white"/>
<rect x="8" y="16" width="2" height="2" fill="white"/>
<rect x="8" y="14" width="2" height="2" fill="white"/>
<rect x="6" y="14" width="2" height="2" fill="white"/>
<rect x="6" y="12" width="2" height="2" fill="white"/>
<rect x="6" y="10" width="2" height="2" fill="white"/>
<rect x="8" y="10" width="2" height="2" fill="white"/>
<rect x="8" y="8" width="2" height="2" fill="white"/>
<rect x="10" y="8" width="2" height="2" fill="white"/>
<rect x="22" y="20" width="2" height="2" fill="white"/>
<rect x="2" y="20" width="2" height="2" fill="white"/>
<rect x="2" y="4" width="2" height="2" fill="white"/>
<rect x="12" y="2" width="2" height="2" fill="white"/>
<rect x="22" y="4" width="2" height="2" fill="white"/>
<rect x="22" y="12" width="2" height="2" fill="white"/>
<rect x="24" y="12" width="2" height="2" fill="white"/>
</g>
<defs>
<clipPath id="clip0_0_1">
<rect width="24" height="24" fill="white" transform="translate(1)"/>
</clipPath>
</defs>
</svg>
        </svg>
      )}
    </div>
  );
};

export default ModeToggle;
