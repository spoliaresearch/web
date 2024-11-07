import "./Layout2.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import TopNavigation from "../components/Sections/TopNavigation";
import { App } from "../components/Sections/Canvas2";
import Sidebar from "../components/Sections/Sidebar";
import Footer from "../components/Sections/Footer";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontSettingsContext, FontSettingsProvider } from "../contexts/FontSettingsContext";
import FontSettingsToggle from "../components/FontSettingsToggle";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "gatsby";
import Mainbar from "../components/Sections/Mainbar";
import { InteractiveProvider, DisableInteractive, InteractiveContext } from "../components/DisableInteractive";
import SvgLoader from "../components/SvgLoader";
import { SEO } from "../components/seo";
import Newsletter from "../components/Newsletter";

const DissolveImage = ({ name, fill, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const currentScale = useRef(0);
  const filterRef = useRef();
  const { isInteractive } = useContext(InteractiveContext);

  // Handle SSR and Safari detection
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      setIsSafari(isSafariBrowser);
    }
  }, []);

  // Handle animation
  useEffect(() => {
    if (!isMounted || isSafari || !isInteractive || !filterRef.current) return;

    const displacementMap = filterRef.current.querySelector("feDisplacementMap");
    const maxScale = 500;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = (timestamp - startTimeRef.current) / 500;

      if (isHovered) {
        currentScale.current = Math.min(progress * maxScale, maxScale);
      } else {
        const reverseProgress = 1 - Math.min(progress, 1);
        currentScale.current = maxScale * reverseProgress;
      }

      displacementMap.setAttribute("scale", currentScale.current.toString());

      if ((isHovered && currentScale.current < maxScale) || (!isHovered && currentScale.current > 0)) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (isHovered || currentScale.current > 0) {
      startTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovered, isInteractive, isMounted, isSafari]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!isSafari && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter
              id={`dissolve-filter-${name}`}
              ref={filterRef}
              x="-200%"
              y="-200%"
              width="400%"
              height="400%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.02"
                numOctaves="1"
                result="bigNoise"
                seed={Math.floor(50)}
              />
              <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
                <feFuncR type="linear" slope="3" intercept="-1" />
                <feFuncG type="linear" slope="3" intercept="-1" />
              </feComponentTransfer>
              <feTurbulence type="fractalNoise" baseFrequency="3" numOctaves=".1" result="fineNoise" />
              <feMerge result="mergedNoise">
                <feMergeNode in="bigNoiseAdjusted" />
                <feMergeNode in="fineNoise" />
              </feMerge>
              <feDisplacementMap
                in="SourceGraphic"
                in2="mergedNoise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <div
        onMouseEnter={() => !isSafari && isInteractive && setIsHovered(true)}
        onMouseLeave={() => !isSafari && isInteractive && setIsHovered(false)}
        style={{ display: "inline-block" }}
      >
        <SvgLoader
          name={name}
          fill={fill}
          width={width}
          height={height}
          style={{ filter: isSafari ? "none" : `url(#dissolve-filter-${name})` }}
        />
      </div>
    </>
  );
};

// Create a separate component for the canvas that will only mount once
const CanvasWrapper = React.memo(
  () => <App />,
  () => true
); // The second argument returns true to prevent any updates

const Home = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext) || { isDarkMode: false, setIsDarkMode: () => {} };
  const { SRFF, fontSize } = useContext(FontSettingsContext);
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Move all hooks to the top level
  const topNavRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const getTimeZoneAbbreviation = () => {
      const dateString = new Date().toString();
      const abbrev = dateString.match(/\(([A-Za-z\s].*?)\)/)?.[1] || "";
      return abbrev
        .split(" ")
        .map((word) => word[0])
        .join("");
    };

    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
      setTimeZone(getTimeZoneAbbreviation());
    }, 60000);

    // Initial set
    const now = new Date();
    setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    setTimeZone(getTimeZoneAbbreviation());

    return () => clearInterval(interval);
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--background-color", "black");
      root.style.setProperty("--text-color", "white");
      root.style.setProperty("--gray-color", "gray");
      root.style.setProperty("--opposite-color", "white");
    } else {
      root.style.setProperty("--background-color", "white");
      root.style.setProperty("--text-color", "black");
      root.style.setProperty("--gray-color", "gray");
      root.style.setProperty("--opposite-color", "black");
    }
  }, [isDarkMode, isBrowser]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  if (!isBrowser) {
    return null; // or a loading state
  }

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";

  return (
    <>
      <div
        className="container"
        style={{
          fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
          WebkitFontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
          fontSize: `${fontSize}em`,
          position: "relative",
          minHeight: "100vh",
          padding: "0 .475rem",
        }}
      >
        <TopNavigation
          ref={topNavRef}
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            height: "40px",
            backgroundColor: isDarkMode ? "black" : "white",
            zIndex: 3,
          }}
        >
          <div className="mobile-menu-container">
            <button
              className="hamburger-button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            {isMobileMenuOpen && (
              <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
                <FontSettingsToggle includeText={true} />
                <ThemeToggle includeText={true} />
                <DisableInteractive />
                <hr style={{ margin: "0.5rem 0", border: "none", borderTop: "1px solid var(--text-color)" }} />
                <a className="nav-link mobile-nav-link" href="mailto:hello@spolialab.com">
                  CONTACT
                </a>
                <a
                  href="https://www.instagram.com/spolialab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link mobile-nav-link"
                  aria-label="Spolia Instagram"
                >
                  INSTAGRAM
                </a>
              </div>
            )}
          </div>
        </TopNavigation>
        <h1 id="my-anchor-2" style={{ fontSize: "3em" }}>
          <div
            style={{
              marginBottom: "4rem",
              fontSize: "clamp(0.75em, 4vw, 1em)", // This makes the text responsive
            }}
          >
            SPOLIA is a design and technology studio.{" "}
            <span className="hide-on-mobile">
              <br /> We build tools for a more creative and sustainable future.{" "}
            </span>
          </div>
        </h1>
        <div className="grid-container desktop-only">
          <div className="grid-item" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <FontSettingsToggle includeText={true} />
          </div>
          <div className="grid-item">
            <ThemeToggle includeText={true} />
          </div>
          <div className="grid-item">
            {time} {timeZone}
          </div>
          <div className="grid-item">
            <DisableInteractive />
          </div>
        </div>
        <CanvasWrapper /> {/* Use the wrapper that never updates */}
        <div className="label">APPROACH</div>
        <div className="text-content-grid">
          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left"></div>
            <div className="col-spacing-1"></div>
            <div className="col-main">
              SPOLIA <span className="pronounciation">[/ˈspoʊ.li.ə/]</span> operates as a hybrid between a creative
              studio and research lab to explore the{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <span style={{ color: "#006400", padding: "0 2.5px", fontSize: "1.4em" }}>∩</span>
              </span>{" "}
              intersections of design and computing with our everyday lives. We build products and experiences that
              connects the physical and digital, the{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <DissolveImage name="arrow-right" fill="#006400" width="23" height="13" />
              </span>
              past and{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <DissolveImage name="arrow-left" fill="#006400" width="23" height="13" />
              </span>{" "}
              future, and people with their{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <DissolveImage name="globe" fill="#006400" width="19" height="19" />
              </span>{" "}
              surroundings.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right">
              <div>
                <DissolveImage name="academiaindustry" fill="#006400" width="180" height="120" />
                <span style={{ fontSize: ".9em" }}>↱ Academia ↔ Industry</span>
              </div>
            </div>
            <div className="col-padding-right"></div>
          </div>

          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left"></div>
            <div className="col-spacing-1"></div>
            <div className="col-main" style={{ marginBottom: "2rem" }}>
              In an era of complex crises and rapid technological advancements, we investigate how humans can adapt and
              thrive amidst these transformational shifts. Our mission is to build for potential futures that are
              inclusive, sustainable, and creative by reconsiding our collective and individual relationships with
              technology.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right"></div>
            <div className="col-padding-right"></div>
          </div>

          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left">
              <div style={{ position: "relative", display: "inline-block" }}>
                <DissolveImage name="founders" fill="#006400" width={120} height={120} />
                <span style={{ fontSize: ".9em" }}>↱ Garrett & Eric</span>
              </div>
            </div>
            <div className="col-spacing-1"></div>
            <div className="col-main">
              Founded by Garrett Vercoe and Eric Duong, our work is shaped by a shared background in architecture and
              computer science, where we have collaborated over the years on structural systems, published research, and
              computational tools for thought.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right"></div>
            <div className="col-padding-right"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-padding-left"></div>
          <div className="col-margin-left"></div>
          <div className="col-spacing-1"></div>
          <div className="col-main">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: `1px solid ${textColor}`,
                marginBottom: "4rem",
              }}
            >
              <tr>
                <td
                  colSpan="3"
                  style={{
                    padding: "1em",
                    borderBottom: `1px solid ${textColor}`,
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  CAPABILITIES
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "1.25em",
                    borderRight: `1px solid ${textColor}`,
                    width: "33.33%",
                    textAlign: "left",
                    fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
                    WebkitFontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
                  }}
                >
                  <div style={{ fontSize: ".9em", marginBottom: "0.5rem" }}>Product Innovation</div>
                  <div style={{ fontSize: ".66em" }}>
                    Digital and physical product design and development, especially in the realm of interactions, AI,
                    data, and spatial computing.
                  </div>
                </td>
                <td
                  style={{
                    padding: "1rem",
                    width: "33.33%",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: ".9em", marginBottom: "0.5rem" }}>Spaces + Experiences</div>
                  <div style={{ fontSize: ".66em" }}>
                    Design and production of installations, exhibitions, and physical media.
                  </div>
                </td>
                <td
                  style={{
                    padding: "1rem",
                    borderLeft: `1px solid ${textColor}`,
                    width: "33.33%",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: ".9em", marginBottom: "0.5rem" }}>Research + Vision</div>
                  <div style={{ fontSize: ".66em" }}>
                    Historical context, early prototyping,and speculative designs for the future.
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-spacing-2"></div>
          <div className="col-margin-right"></div>
          <div className="col-padding-right"></div>
        </div>
        <div className="label" style={{ borderTop: `1px solid ${textColor}` }}>
          WORK
        </div>
        <div className="main-content" style={{ position: "relative", zIndex: 2 }}>
          <Mainbar />
        </div>
        <Newsletter />
        <Footer
          ref={footerRef}
          style={{ height: "200px", backgroundColor: isDarkMode ? "black" : "white", zIndex: 2, position: "relative" }}
        />
      </div>
    </>
  );
};

const WrappedLayout = () => (
  <InteractiveProvider>
    <FontSettingsProvider>
      <Home />
    </FontSettingsProvider>
  </InteractiveProvider>
);

export default WrappedLayout;

export const Head = () => <SEO />;
