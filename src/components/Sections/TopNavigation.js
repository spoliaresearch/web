import React from "react";
import Link from "gatsby-link";
import "./TopNavigation.css";
import FontSettingsToggle from "../FontSettingsToggle";
import ThemeToggle from "../ThemeToggle";
import { DisableInteractive } from "../DisableInteractive";

const TopNavigation = React.forwardRef((props, ref) => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <nav ref={ref} style={props.style}>
      {isSettingsOpen && (
        <div className="settings-panel">
          <div className="settings-content">
            <div className="grid-container">
              <div className="grid-item">
                <FontSettingsToggle includeText={true} darkMode={true} />
              </div>
              <div className="grid-item">
                <ThemeToggle includeText={true} darkMode={true} />
              </div>
              <div className="grid-item">
                <DisableInteractive darkMode={true} />
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="nav">
        <Link to="/" className="logo link">
          <span>SPOLIA</span>
        </Link>
        <div className="nav-middle">
          <span>
            DESIGN{" "}
            <span
              style={{
                border: "1px dashed currentColor",
                padding: "0 0px !important",
                marginRight: "1px",
              }}
            >
              <span style={{ color: "#006400", padding: "0 2.5px", fontSize: "1.5em" }}>∩</span>
            </span>{" "}
            TECHNOLOGY
          </span>
        </div>
        <div className="nav-right">
          <span className="contact-container">
            <Link to="/symlink" className="nav-link">
              WORK
            </Link>
            <a className="nav-link" href="mailto:hello@spolialab.com">
              CONTACT
            </a>
            {/* <button className="settings-button" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3.5L2 3.5" stroke="currentColor"></path>
                <path d="M11 5L11 2" stroke="currentColor"></path>
                <path d="M14 7.5L2 7.5" stroke="currentColor"></path>
                <path d="M5 9L5 6" stroke="currentColor"></path>
                <path d="M14 11.5L2 11.5" stroke="currentColor"></path>
                <path d="M11 13L11 10" stroke="currentColor"></path>
              </svg>
            </button> */}
            <a
              href="https://www.instagram.com/spolialab"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link instagram-link"
              aria-label="Spolia Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </span>
          {props.children}
        </div>
      </div>
    </nav>
  );
});

export default TopNavigation;
