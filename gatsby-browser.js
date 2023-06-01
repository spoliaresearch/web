// gatsby-browser.js
import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};
