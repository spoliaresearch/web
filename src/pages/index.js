import './index.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TopNavigation from '../components/Sections/TopNavigation';
import Canvas from '../components/Sections/Canvas';
import HeaderText from '../components/Sections/HeaderText';
import Sidebar from '../components/Sections/Sidebar';
import ProjectContent from '../components/Sections/ProjectContent';
import Footer from '../components/Sections/Footer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontSettingsContext, FontSettingsProvider } from '../contexts/FontSettingsContext';
import FontSettingsSlider from '../components/FontSettingsSlider';

const IndexPage = () => {


   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  
   const { SRFF, fontSize  } = useContext(FontSettingsContext);
    const rootStyle = {
    fontVariationSettings: `"wght" 300, "ital" 0, "SRFF" ${SRFF}`,
    fontSize: fontSize
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.style.setProperty('--background-color', 'black');
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--gray-color', 'gray');
        root.style.setProperty('--opposite-color', 'white');
    } else {
      root.style.setProperty('--background-color', 'white');
      root.style.setProperty('--text-color', 'white');
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

  useEffect(() => {
    const handleScroll = () => {
      const headerTop = headerRef.current.getBoundingClientRect().top - 10;
      setIsHeaderSticky(headerTop <= topNavRef.current.offsetHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container" style={{ ...rootStyle, position: 'relative', minHeight: '100vh', padding: '0 .5rem' }}>
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
      <Canvas
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
      />
          <div  style={{
          height: '75px',
          backgroundColor: backgroundColor,
          zIndex: 2,
          fontSize: '1.75rem',
          paddingBottom: '3.5rem',
          paddingTop: '2.25rem',
          marginTop:'95vh',
          position: isHeaderSticky ? 'sticky' : 'relative',
          top: isHeaderSticky ? topNavRef.current.offsetHeight : 'initial',
        }} className="OneLiner"><h3>Spolia is an academic design research lab <br/> building tools to make a more creative and sustainable web.</h3></div>
      <HeaderText
        ref={headerRef}
        style={{
          height: '32px',
          backgroundColor: backgroundColor,
          zIndex: 200,
          position: isHeaderSticky ? 'sticky' : 'relative',
          top: isHeaderSticky ? topNavRef.current.offsetHeight : 'initial',
        }}
      />
      <div className="main-content" style={{ position: 'relative', zIndex: 2 }}>
        <Sidebar
          ref={sidebarRef}
          style={{
            height: '92vh',
            width: '21.5rem',
            overflowY: 'auto',
            position: isHeaderSticky ? 'sticky' : 'relative',
            backgroundColor: backgroundColor,
            borderRight: `1px solid ${textColor}`,
            top: isHeaderSticky ? topNavRef.current.offsetHeight + headerRef.current.offsetHeight : 'initial',
          }}
        />
        <ProjectContent
          ref={projectContentRef}
          style={{ height: 'auto', width: 'calc(100vw - 21.5rem)',
          position: isHeaderSticky ? 'sticky' : 'relative',
           backgroundColor: backgroundColor,
            overflowY: 'auto',
            zIndex: 0,
                      top: isHeaderSticky ? topNavRef.current.offsetHeight + headerRef.current.offsetHeight : 'initial', 
                      }}
        />
      </div>
      <Footer ref={footerRef} style={{ height: '200px', backgroundColor: backgroundColor, zIndex: 2, position:'relative' }} />
    </div>
  );
};


const WrappedIndexPage = () => (
  <FontSettingsProvider>
    <IndexPage />
  </FontSettingsProvider>
);

export default WrappedIndexPage;
