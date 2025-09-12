"use client";

import React from "react";
import { ThemeProvider } from "./ThemeContext";

const PageThemeProvider = ({ children, forceDarkMode = false }) => {
  return <ThemeProvider forceDarkMode={forceDarkMode}>{children}</ThemeProvider>;
};

export default PageThemeProvider;
