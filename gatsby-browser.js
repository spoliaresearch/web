// gatsby-browser.js
import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Layout from './src/components/Layout2';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
