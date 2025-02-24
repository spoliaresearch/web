import "./Layout2.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import TopNavigation from "./Sections/TopNavigation";
import { App } from "./Sections/Canvas2";
import HeaderText from "./Sections/HeaderText";
import Sidebar from "./Sections/Sidebar";
import Footer from "./Sections/Footer";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSettingsContext, FontSettingsProvider } from "../contexts/FontSettingsContext";
import { Link } from "gatsby";
import { InteractiveContext } from "../contexts/InteractiveContext";
import { SEO } from "./seo";
import { Location } from "@reach/router";

const Layout = ({ children }) => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext) || { isDarkMode: false, setIsDarkMode: () => {} };
  // const excludedPaths = ['/information', '/404']; // Add paths you want to exclude
  const notExcluded = true;
  const { SRFF, fontSize } = useContext(FontSettingsContext);
  const rootStyle = {
    fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
    fontSize: `${fontSize}rem`,
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.style.setProperty("--background-color", "black");
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--gray-color", "#ddd");
      root.style.setProperty("--opposite-color", "white");
    } else {
      root.style.setProperty("--background-color", "white");
      root.style.setProperty("--text-color", "black");
      root.style.setProperty("--gray-color", "#ddd");
      root.style.setProperty("--opposite-color", "black");
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";
  const topNavRef = useRef(null);
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const projectContentRef = useRef(null);
  const footerRef = useRef(null);

  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const headerTop = headerRef?.current?.getBoundingClientRect().top - 10;
        setIsHeaderSticky(headerTop <= topNavRef.current.offsetHeight);
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup function to remove the scroll event listener
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Add state for interactive context
  const [isInteractive, setIsInteractive] = useState(true);

  // Add state for window width
  const [windowWidth, setWindowWidth] = useState(null);

  // Add useEffect to handle window width
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Function to check if current path is a glossary page
  const isGlossaryPage = (pathname) => {
    return pathname.includes("/glossary");
  };

  return (
    <Location>
      {({ location }) => (
        <InteractiveContext.Provider value={{ isInteractive, setIsInteractive }}>
          <SEO />
          <div
            className="container"
            style={{ ...rootStyle, position: "relative", minHeight: "100vh", padding: "0 .475rem" }}
          >
            <TopNavigation
              ref={topNavRef}
              style={{
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                height: "40px",
                backgroundColor: backgroundColor,
                zIndex: 3,
              }}
            />
            {notExcluded && (
              <>
                <h6 id="my-anchor-2">
                  <div class="text-animate"></div>
                </h6>

                <HeaderText
                  ref={headerRef}
                  name={children?.props?.children?.props?.data?.page?.name}
                  style={{
                    height: "32px",
                    backgroundColor: backgroundColor,
                    zIndex: 200,
                    position: isHeaderSticky ? "sticky" : "relative",
                    top: isHeaderSticky ? topNavRef.current.offsetHeight : "initial",
                  }}
                />
                <div className="main-content" style={{ position: "relative", zIndex: 2 }}>
                  {!isGlossaryPage(location.pathname) && (
                    <Sidebar
                      ref={sidebarRef}
                      style={{
                        height: "92vh",
                        width: "21.5rem",
                        overflowY: "auto",
                        position: isHeaderSticky ? "sticky" : "relative",
                        backgroundColor: backgroundColor,
                        borderRight: `1px solid ${textColor}`,
                        top: isHeaderSticky
                          ? topNavRef.current.offsetHeight + headerRef?.current?.offsetHeight
                          : "initial",
                      }}
                    />
                  )}
                  <div
                    ref={projectContentRef}
                    style={{
                      height: "auto",
                      width: windowWidth ? (windowWidth <= 768 ? "100vw" : "calc(100vw - 21.5rem)") : "100%",
                      position: isHeaderSticky ? "sticky" : "relative",
                      backgroundColor: backgroundColor,
                      overflowY: "auto",
                      zIndex: 0,
                      top: isHeaderSticky
                        ? topNavRef.current.offsetHeight + headerRef?.current?.offsetHeight
                        : "initial",
                    }}
                  >
                    {children}
                  </div>
                </div>
              </>
            )}
            {!notExcluded && <>{children}</>}

            <Footer
              ref={footerRef}
              style={{
                height: "200px",
                backgroundColor: backgroundColor,
                color: textColor,
                zIndex: 2,
                position: "relative",
              }}
            />
          </div>
        </InteractiveContext.Provider>
      )}
    </Location>
  );
};

const WrappedLayout = ({ children }) => (
  <FontSettingsProvider>
    <Layout>{children}</Layout>
  </FontSettingsProvider>
);

export default WrappedLayout;
