import React, { createContext, useState } from 'react';

const FontSettingsContext = createContext();

const FontSettingsProvider = ({ children }) => {
  const [SRFF, setSRFF] = useState(50);
  const [fontSize, setFontSize] = useState('16px');

  return (
    <FontSettingsContext.Provider value={{ SRFF, setSRFF, fontSize, setFontSize }}>
      {children}
    </FontSettingsContext.Provider>
  );
};

export { FontSettingsContext, FontSettingsProvider };
