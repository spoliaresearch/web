"use client";

import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children, forceDarkMode = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(forceDarkMode);

  useEffect(() => {
    // If forceDarkMode is true, always set to dark mode
    if (forceDarkMode) {
      setIsDarkMode(true);
    }
  }, [forceDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
