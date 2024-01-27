import './Layout2.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TopNavigation from '../components/Sections/TopNavigation';
import {App} from '../components/Sections/Canvas2';
import Sidebar from '../components/Sections/Sidebar';
import Footer from '../components/Sections/Footer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontSettingsContext, FontSettingsProvider } from '../contexts/FontSettingsContext';

import {Link} from "gatsby"


const Home = () => {
   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext) || { isDarkMode: false, setIsDarkMode: () => {}};
  // const excludedPaths = ['/information', '/404']; // Add paths you want to exclude
  const notExcluded = true;
   const { SRFF, fontSize  } = useContext(FontSettingsContext);
    const rootStyle = {
    fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
    fontSize: fontSize
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.style.setProperty('--background-color', 'black');
      root.style.setProperty('--text-color', 'white');
      root.style.setProperty('--gray-color', 'gray');
        root.style.setProperty('--opposite-color', 'white');
    } else {
      root.style.setProperty('--background-color', 'white');
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--gray-color', 'gray');
         root.style.setProperty('--opposite-color', 'black');
  
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? 'black' : 'white';
  const textColor = isDarkMode ? 'white' : 'black';
  const topNavRef = useRef(null);
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  return (
    <>
    <div className="container" style={{ ...rootStyle, position: 'relative', minHeight: '100vh', padding: '0 .475rem' }}>
      <TopNavigation
        ref={topNavRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          backgroundColor: backgroundColor,
          zIndex: 3,
        }}
      />
      
         <h1 id="my-anchor-2"><div class='text-animate'>Spolia designs products for the <span>future</span> <br/> inspired by the <span>past</span>.</div></h1>
           <div class="grid-container">
  <div class="grid-item">Readability: Mixed Serif</div>
  <div class="grid-item">11:06 CET</div>
  <div class="grid-item">103 online</div>
  <div class="grid-item">305 cell iterations</div>
</div>
      <App
      ref={canvasRef}
    />
 <div class="label">Our Approach</div>
      <div className="text-header" >
         
       <p className='text-left'>We are a research-led design & technology studio building tools for a more creative and sustainable future. Our approach to designing for emerging technology is rooted in a human-centered philosophy, which begins with a thorough understanding of the past.<Link to="/information" className="link-primary">Learn more -></Link>
</p>
</div>
      <div className="main-content" style={{ position: 'relative', zIndex: 2 }}>
      </div>

      <Footer ref={footerRef} style={{ height: '200px', backgroundColor: backgroundColor, zIndex: 2, position:'relative' }} />
    </div>
    </>
  );
};


const WrappedLayout = () => (
  <FontSettingsProvider>
    <Home/>
  </FontSettingsProvider>
);

export default WrappedLayout;

