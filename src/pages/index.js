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
import { InteractiveProvider, DisableInteractive } from "../components/DisableInteractive";
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

  useEffect(() => {
    // Function to get the time zone abbreviation
    const getTimeZoneAbbreviation = () => {
      const dateString = new Date().toString();
      const abbrev = dateString.match(/\(([A-Za-z\s].*?)\)/)[1];
      return abbrev
        .split(" ")
        .map((word) => word[0])
        .join("");
    };

    // Update time every minute
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })); // 24-hour format, hours and minutes only
      setTimeZone(getTimeZoneAbbreviation());
    }, 60000); // update every minute

    // Set initial time immediately
    const now = new Date();
    setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    setTimeZone(getTimeZoneAbbreviation());

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";
  const topNavRef = useRef(null);
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const [aliveCount, setAliveCount] = useState(0);
  const handleAliveCountUpdate = (newCount) => {
    setAliveCount(newCount);
  };
  return (
    <>
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

        <h1 id="my-anchor-2" style={{ fontSize: "3em" }}>
          <div style={{ marginBottom: "5rem" }}>
            SPOLIA is a design and technology studio. <br /> We build tools for a more creative and sustainable future.{" "}
          </div>
        </h1>
        <div class="grid-container">
          <div class="grid-item">
            {" "}
            <FontSettingsToggle /> Readability{" "}
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
        <App ref={canvasRef} onAliveCountUpdate={handleAliveCountUpdate} />
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
                <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.5528 0.547137C15.8549 0.244962 16.3449 0.244962 16.647 0.547138L22.0579 5.95802C22.3601 6.2602 22.3601 6.75012 22.0579 7.0523L16.647 12.4632C16.3449 12.7654 15.8549 12.7654 15.5528 12.4632V12.4632C15.2506 12.161 15.2506 11.6711 15.5528 11.3689L16.7367 10.1849C17.8091 9.11254 17.0496 7.27893 15.533 7.27893H0.773769C0.346428 7.27893 0 6.9325 0 6.50516V6.50516C0 6.07782 0.346428 5.73139 0.773769 5.73139H15.533C17.0496 5.73139 17.8091 3.89778 16.7367 2.8254L15.5528 1.64141C15.2506 1.33924 15.2506 0.849313 15.5528 0.547137V0.547137Z"
                    fill="#005009"
                  />
                </svg>
              </span>
              emerging (and{" "}
              <span
                style={{
                  border: "1px dashed currentColor",
                  padding: "0 4px",
                  marginRight: "2px",
                }}
              >
                <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.15671 0.547137C6.85454 0.244962 6.36461 0.244962 6.06244 0.547138L0.651554 5.95802C0.349378 6.2602 0.349378 6.75012 0.651554 7.0523L6.06244 12.4632C6.36461 12.7654 6.85454 12.7654 7.15671 12.4632V12.4632C7.45889 12.161 7.45889 11.6711 7.15671 11.3689L5.97273 10.1849C4.90035 9.11254 5.65985 7.27893 7.17643 7.27893H21.9357C22.363 7.27893 22.7095 6.9325 22.7095 6.50516V6.50516C22.7095 6.07782 22.363 5.73139 21.9357 5.73139H7.17643C5.65985 5.73139 4.90035 3.89778 5.97273 2.8254L7.15671 1.64141C7.45889 1.33924 7.45889 0.849313 7.15671 0.547137V0.547137Z"
                    fill="#005009"
                  />
                </svg>
              </span>
              historic) technology.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src="dither_test.png"
                  alt="Dither test"
                  className="side-image"
                  style={{
                    WebkitFilter:
                      "grayscale(100%) brightness(100%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(1) brightness(1000)",
                    filter:
                      "grayscale(100%) brightness(100%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(1) brightness(1000)",
                    backgroundColor: "white",
                  }}
                />{" "}
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
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9.4719" cy="9.4719" r="8.76372" stroke="#005009" stroke-width="1.41636" />
                  <path
                    d="M13.4553 9.4719C13.4553 12.029 12.9796 14.3183 12.2331 15.9484C11.4653 17.625 10.5124 18.4127 9.64888 18.4127C8.78534 18.4127 7.83245 17.625 7.06464 15.9484C6.31815 14.3183 5.84241 12.029 5.84241 9.4719C5.84241 6.91476 6.31815 4.62549 7.06464 2.9954C7.83245 1.31875 8.78534 0.531134 9.64888 0.531134C10.5124 0.531134 11.4653 1.31875 12.2331 2.9954C12.9796 4.62549 13.4553 6.91476 13.4553 9.4719Z"
                    stroke="#005009"
                    stroke-width="1.06227"
                  />
                  <line
                    x1="18.5898"
                    y1="9.73426"
                    x2="0.000135375"
                    y2="9.73426"
                    stroke="#005009"
                    stroke-width="1.06227"
                  />
                  <path
                    d="M3.18677 3.98438C5.45884 6.0499 11.2423 8.94163 16.1996 3.98438"
                    stroke="#005009"
                    stroke-width="1.06227"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.18677 15.8398C5.45884 13.7743 11.2423 10.8826 16.1996 15.8398"
                    stroke="#005009"
                    stroke-width="1.06227"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>{" "}
              planet.
            </div>
            <div className="col-spacing-2"></div>
            <div className="col-margin-right"></div>
            <div className="col-padding-right"></div>
          </div>

          <div className="row">
            <div className="col-padding-left"></div>
            <div className="col-margin-left"></div>
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
