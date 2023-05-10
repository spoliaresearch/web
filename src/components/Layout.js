// layout.js
import React from 'react';
import { Link } from 'gatsby';
import * as layoutStyles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.layoutContainer}>
      <header className={layoutStyles.headerNav}>
        <Link to="/" className={layoutStyles.link}>Home</Link>
        <Link to="/about" className={layoutStyles.link}>About</Link>
        <Link to="/contact" className={layoutStyles.link}>Contact</Link>
      </header>
      <main className={layoutStyles.mainContent}>{children}</main>
      <footer className={layoutStyles.footer}>© {new Date().getFullYear()} Your Site Name</footer>
    </div>
  );
};

export default Layout;
