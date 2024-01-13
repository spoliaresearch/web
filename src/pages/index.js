import './Layout2.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TopNavigation from '../components/Sections/TopNavigation';
import {App} from '../components/Sections/Canvas2';
import Sidebar from '../components/Sections/Sidebar';
import Footer from '../components/Sections/Footer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontSettingsContext, FontSettingsProvider } from '../contexts/FontSettingsContext';

import {Link} from "gatsby"


const Layout = ({ children }) => {

   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const excludedPaths = ['/information', '/404']; // Add paths you want to exclude
  const notExcluded = !excludedPaths.includes(window?.location?.pathname);
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
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const projectContentRef = useRef(null);
  const footerRef = useRef(null);

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const headerTop = headerRef?.current?.getBoundingClientRect().top - 10;
  //     setIsHeaderSticky(headerTop <= topNavRef.current.offsetHeight);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div className="container" style={{ ...rootStyle, position: 'relative', minHeight: '100vh', padding: '0 .475rem' }}>
    
      {notExcluded &&  <>
      {/* <Canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '.5rem',
          right: '.5rem',
          width: 'calc(100% - 1rem)',
          height: 'calc(100% - 3rem)',
          bottom: 0,
          zIndex: 0,
          backgroundColor: 'white'
        }}
      /> */}
 


    
      <App
      ref={canvasRef}
    />

          {/* <div  style={{
          height: '75px',
          backgroundColor: backgroundColor,
          zIndex: 2,
          fontSize: '1.75rem',
          paddingBottom: '3.5rem',
          paddingTop: '2.25rem',
          marginTop:'1vh',
          position: isHeaderSticky ? 'sticky' : 'relative',
          top: isHeaderSticky ? topNavRef.current.offsetHeight : 'initial',
        }} className="OneLiner">
          */}
 <div class="label">Our Approach</div>
      <div className="text-header" >
         
       <p className='text-left'>We are a research-led design & technology studio building tools for a more creative and sustainable future. Our approach to designing for emerging technology is rooted in a human-centered philosophy, which begins with a thorough understanding of the past.<Link to="/information" className="link-primary">Learn more -></Link>
</p>

<div></div>

</div>
     
      {/* <HeaderText
        ref={headerRef}
        name={children?.props?.children?.props?.data?.page?.name}
        style={{
          height: '32px',
          backgroundColor: backgroundColor,
          zIndex: 200,
          position: isHeaderSticky ? 'sticky' : 'relative',
          top: isHeaderSticky ? topNavRef.current.offsetHeight : 'initial',
        }}
      /> */}
      <div className="main-content" style={{ position: 'relative', zIndex: 2 }}>
        {/* <Sidebar
          ref={sidebarRef}
          style={{
            height: '92vh',
            width: '21.5rem',
            overflowY: 'auto',
            position: isHeaderSticky ? 'sticky' : 'relative',
            backgroundColor: backgroundColor,
            borderRight: `1px solid ${textColor}`,
            top: isHeaderSticky ? topNavRef.current.offsetHeight + headerRef?.current?.offsetHeight : 'initial',
          }}
        />
        <div
          ref={projectContentRef}
          style={{ height: 'auto', width: 'calc(100vw - 21.5rem)',
          position: isHeaderSticky ? 'sticky' : 'relative',
           backgroundColor: backgroundColor,
            overflowY: 'auto',
            zIndex: 0,
                      top: isHeaderSticky ? topNavRef.current.offsetHeight + headerRef?.current?.offsetHeight : 'initial', 
                      }}
        >{children}</div> */}
      </div></>}
       {!notExcluded && <>{children}</>}

    </div>
  );
};


const WrappedLayout = ({ children }) => (
  <FontSettingsProvider>
    <Layout>{children}</Layout>
  </FontSettingsProvider>
);

export default WrappedLayout;

