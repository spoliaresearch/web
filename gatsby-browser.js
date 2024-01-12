import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Layout from './src/components/Layout2';

const excludedPaths = ['/']; // Add paths you want to exclude (e.g., index page)

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  // Check if the current path is in the excluded paths
  const isExcluded = excludedPaths.includes(props.location.pathname);

  // If the path is not excluded, wrap with Layout, otherwise return element as is
  return isExcluded ? element : <Layout {...props}>{element}</Layout>;
};
