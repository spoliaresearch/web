import React, { forwardRef, useEffect, useState } from "react";
import { App as Canvas3 } from "./Canvas3"; // Import Canvas3
import "./Footer.css";

const Footer = forwardRef((props, ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [time, setTime] = useState(new Date());
  const [OS, setOS] = useState("");

  useEffect(() => {
    // Update dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Detect OS
    const userAgent = window.navigator.userAgent;
    let os = "Unknown OS";
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    setOS(os);

    // Set initial values and add listener
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearInterval(timer);
    };
  }, []);

  return (
    <footer
      className="Footer"
      ref={ref}
      style={{
        ...props.style,
        color: "#fff",
        position: "relative",
        backgroundColor: "#000000",
      }}
    >
      <div className="canvas-container">
        <Canvas3 />
      </div>
      <div className="footer-content">
        <div className="row top-row">
          <div className="col-padding-left"></div>
          <div className="col-margin-left">
            <svg
              className="footer-logo"
              width="50"
              height="64"
              viewBox="0 0 615 784"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80.5692" height="401.432" transform="matrix(-1 0 0 1 614.164 147.711)" fill="currentColor" />
              <rect
                width="80.2424"
                height="136.566"
                transform="matrix(-8.57519e-09 -1 -1 1.6583e-08 283.93 475.281)"
                fill="currentColor"
              />
              <rect
                width="74.0699"
                height="138.881"
                transform="matrix(-8.57519e-09 -1 -1 1.6583e-08 422.812 549.352)"
                fill="currentColor"
              />
              <rect
                width="77.1562"
                height="111.105"
                transform="matrix(-8.47992e-09 -1 -1 1.67694e-08 533.922 626.508)"
                fill="currentColor"
              />
              <rect
                width="74.8415"
                height="249.986"
                transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 533.922 147.367)"
                fill="currentColor"
              />
              <rect
                width="72.795"
                height="212.024"
                transform="matrix(-8.99596e-09 -1 -1 1.58074e-08 284.109 72.7969)"
                fill="currentColor"
              />
              <rect
                width="74.9152"
                height="142.763"
                transform="matrix(-1.19249e-08 -1 -1 1.19249e-08 214.852 626.914)"
                fill="currentColor"
              />
              <rect width="71.7553" height="128.851" transform="matrix(-1 0 0 1 71.7578 72.5273)" fill="currentColor" />
              <rect width="75.6131" height="193.662" transform="matrix(-1 0 0 1 147.359 201.375)" fill="currentColor" />
            </svg>
          </div>
          <div className="col-spacing-1"></div>
          <div className="col-main">
            <div className="text">
              Beep us. Reach us. <a>hello@spolialab.com</a>. Propose a design intervention, share a thought, or just say
              hi.
            </div>
          </div>
          <div className="col-spacing-2"></div>
          <div className="col-margin-right">
            <div className="contact-info">
              <div className="contact-section">
                <h3>CONTACT</h3>
                <p>SPOLIA LLC</p>
                <p>250 Hudson Street, S.702 </p>
                <p>New York, NY 10013</p>
              </div>
              <div className="contact-section">
                <h3>INQUIRIES</h3>
                <a href="mailto:hello@spolialab.com">hello@spolialab.com</a>
              </div>
            </div>
          </div>
          <div className="col-padding-right"></div>
        </div>

        <div className="row bottom-row">
          <div className="col-padding-left"></div>
          <div className="col-margin-left">
            <span>©2024 SPOLIA LLC</span>
          </div>
          <div className="col-spacing-1"></div>
          <div className="col-main">
            <div className="system-info">
              <span>
                {dimensions.width}x{dimensions.height}
              </span>
              <span>{time.toLocaleTimeString()}</span>
              <span>{OS}</span>
            </div>
          </div>
          <div className="col-spacing-2"></div>
          <div className="col-margin-right">
            <div className="social-links">
              <a href="/glossary">Glossary</a>
              <a href="https://instagram.com/spolialab" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://linkedin.com/company/spolialab" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="col-padding-right"></div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
