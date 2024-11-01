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

const DissolveImage = ({ name, fill, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);
  const filterRef = useRef(null);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const currentScale = useRef(0);
  const { isInteractive } = useContext(InteractiveContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  useEffect(() => {
    if (!filterRef.current) return;

    const displacementMap = filterRef.current.querySelector("feDisplacementMap");
    const maxScale = 500;

    if (!isInteractive) {
      displacementMap.setAttribute("scale", "0");
      return;
    }

    if (!startTimeRef.current && !isHovered) {
      displacementMap.setAttribute("scale", "0");
      return;
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = (timestamp - startTimeRef.current) / 750;

      if (isHovered) {
        currentScale.current = Math.min(progress * maxScale, maxScale);
      } else {
        const reverseProgress = 1 - Math.min(progress, 1);
        currentScale.current = maxScale * reverseProgress;
      }

      displacementMap.setAttribute("scale", currentScale.current);

      if ((isHovered && currentScale.current < maxScale) || (!isHovered && currentScale.current > 0)) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, isInteractive]);

  return (
    <>
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
      <div
        onMouseEnter={() => isInteractive && setIsHovered(true)}
        onMouseLeave={() => isInteractive && setIsHovered(false)}
        style={{ display: "inline-block" }}
      >
        <SvgLoader
          name={name}
          fill={fill}
          width={width}
          height={height}
          style={{ filter: `url(#dissolve-filter-${name})` }}
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
  // const excludedPaths = ['/information', '/404']; // Add paths you want to exclude
  const notExcluded = true;
  const { SRFF, fontSize } = useContext(FontSettingsContext);
  const baseSize = "14.4px"; // Set your base font size here

  const rootStyle = {
    fontVariationSettings: `"wght" 262, "ital" 0, "SRFF" ${SRFF}`,
    fontSize: `${fontSize}em`, // Changed to em units
  };

  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

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

  if (!isBrowser) {
    return null; // or a loading state
  }

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";
  const topNavRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <>
      <div
        className="container"
        style={{ ...rootStyle, position: "relative", minHeight: "100vh", padding: "0 .475rem" }}
      >
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter
              id="dissolve-filter"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.004"
                numOctaves="1"
                result="bigNoise"
                seed={Math.floor(Math.random() * 100)}
              />
              <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
                <feFuncR type="linear" slope="3" intercept="-1" />
                <feFuncG type="linear" slope="3" intercept="-1" />
              </feComponentTransfer>
              <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="1" result="fineNoise" />
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
        <h1 id="my-anchor-2" style={{ fontSize: "3em" }}>
          <div style={{ marginBottom: "5rem" }}>
            SPOLIA is a design and technology studio.{" "}
            <span className="hide-on-mobile">
              <br /> We build tools for a more creative and sustainable future.{" "}
            </span>
          </div>
        </h1>
        <div class="grid-container">
          <div class="grid-item" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <FontSettingsToggle /> Readability
          </div>
          <div class="grid-item">
            <ThemeToggle /> Turn lights {!isDarkMode ? "off" : "on"}{" "}
          </div>
          <div class="grid-item">
            {time} {timeZone}
          </div>
          <div class="grid-item">
            <DisableInteractive />
          </div>
        </div>
        <CanvasWrapper /> {/* Use the wrapper that never updates */}
        <div class="label">APPROACH</div>
        <div className="text-content-grid">
          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left"></div>
            <div className="col-spacing-1"></div>
            <div className="col-main">
              SPOLIA <span className="pronounciation">[/ˈspoʊ.li.ə/]</span> takes a hybrid approach between a creative
              studio and research lab to apply research on the{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <span style={{ color: "#006400", fontSize: "1.4em" }}>∩</span>
              </span>{" "}
              fringes of design and computing. Working across physical and digital mediums, we build innovative use
              cases for{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <DissolveImage name="arrow-right" fill="#006400" width="23" height="13" />
              </span>
              emerging (and{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <DissolveImage name="arrow-left" fill="#006400" width="23" height="13" />
              </span>
              historic) technology.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right">
              <div>
                <DissolveImage name="academiaindustry" fill="#006400" width="140" height="100" />
                <span style={{ fontSize: ".9rem" }}>↱ Academia ↔ Industry</span>
              </div>
            </div>
            <div className="col-padding-right"></div>
          </div>

          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left"></div>
            <div className="col-spacing-1"></div>
            <div className="col-main">
              In an era of complex crises compounded by rapid technological advancements, we work to reveal the
              environmental, societal, and economic impacts of new technologies. Our mission is to make technology
              approachable, sustainable, and a catalyst for everyday creativity — that benefits both people and the{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <DissolveImage name="globe" fill="#006400" width="19" height="19" />
              </span>{" "}
              planet.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right"></div>
            <div className="col-padding-right"></div>
          </div>

          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left">
              <div style={{ position: "relative", display: "inline-block" }}>
                <DissolveImage name="founders" fill="#006400" width={100} height={100} />
                <span style={{ fontSize: ".9rem" }}>↱ Garrett & Eric</span>
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
            <table style={{ width: "100%", borderCollapse: "collapse", border: `1px solid ${textColor}` }}>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    padding: "1rem",
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
                    padding: "1.25rem",
                    borderRight: `1px solid ${textColor}`,
                    width: "33.33%",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Product Innovation
                  </div>
                  <div style={{ fontSize: "1rem" }}>
                    Digital product experiences in the realms of AI, Web3, spatial- and ambient computing.
                  </div>
                </td>
                <td
                  style={{
                    padding: "1rem",
                    width: "33.33%",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Interactions + Installations
                  </div>
                  <div style={{ fontSize: "1rem" }}>
                    Design and production of immersive retail experiences, installations, and exhibitions.
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
                  <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Research + Vision
                  </div>
                  <div style={{ fontSize: "1rem" }}>
                    Forecasting, innovation strategy, prototyping, future visions and speculative design scenarios.
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-spacing-2"></div>
          <div className="col-margin-right"></div>
          <div className="col-padding-right"></div>
        </div>
        <div class="label" style={{ borderTop: `1px solid ${textColor}` }}>
          WORK
        </div>
        <div className="main-content" style={{ position: "relative", zIndex: 2 }}>
          <Mainbar />
        </div>
        <Footer
          ref={footerRef}
          style={{ height: "200px", backgroundColor: backgroundColor, zIndex: 2, position: "relative" }}
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
