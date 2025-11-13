"use client";

import React, { useEffect, useState } from "react";
import { GridContainer, Grid, GridItem } from "../Grid";
import styles from "./Footer.module.css";
import dynamic from "next/dynamic";
import Divider from "../Divider";
// Properly handle SSR for Canvas3
const Canvas3 = dynamic(() => import("./Canvas3"), {
  ssr: false,
  loading: () => null,
});

export default function Footer() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [time, setTime] = useState(null);
  const [OS, setOS] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Update dimensions
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial time and start timer
    setTime(new Date());
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
    <footer className={styles.footer}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <Canvas3 />
      </div>
      <div
        className={`${styles.blurOverlay} ${isBlurred ? styles.blurActive : ""}`}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0.5 }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
        <Divider size="xs" />
        <GridContainer>
          <Grid>
            {/* Logo */}
            <GridItem start={1} span={1}>
              <div className={styles.logoContainer}>
                <svg
                  className={styles.logo}
                  width="50"
                  height="64"
                  viewBox="0 0 615 784"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="80.5692"
                    height="401.432"
                    transform="matrix(-1 0 0 1 614.164 147.711)"
                    fill="currentColor"
                  />
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
                  <rect
                    width="71.7553"
                    height="128.851"
                    transform="matrix(-1 0 0 1 71.7578 72.5273)"
                    fill="currentColor"
                  />
                  <rect
                    width="75.6131"
                    height="193.662"
                    transform="matrix(-1 0 0 1 147.359 201.375)"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </GridItem>

            {/* Main text */}
            <GridItem start={3} span={6}>
              <div className={"fs-m h-text"}>
                As a studio for creative R&D, we want to help you invent things for a world we want to live in.{" "}
                <a
                  href="mailto:hello@spolialab.com"
                  className={styles.link}
                  onMouseEnter={() => setIsBlurred(true)}
                  onMouseLeave={() => setIsBlurred(false)}
                >
                  Reach out to us
                </a>{" "}
                to help make that happen, or just to say hi.
              </div>
            </GridItem>

            <GridItem start={11} span={2}>
              <div className={styles.contactInfo}>
                <div className={styles.contactSection}>
                  <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".1rem" }}>
                    Inquiries
                  </div>
                  <a
                    href="mailto:hello@spolialab.com"
                    className={`fs-s h-text ${styles.contactLink}`}
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    hello@spolialab.com
                  </a>
                  <Divider size="xxs" />
                  <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".1rem" }}>
                    Careers
                  </div>
                  <div style={{ marginTop: "0rem" }}>
                    <a
                      className={`fs-s h-text ${styles.contactLink}`}
                      href="mailto:apply@spolialab.com"
                      onMouseEnter={() => setIsBlurred(true)}
                      onMouseLeave={() => setIsBlurred(false)}
                    >
                      apply@spolialab.com
                    </a>
                  </div>
                  <Divider size="xxs" />
                  <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".1rem" }}>
                    Media
                  </div>
                  <div style={{ marginTop: "0rem" }} className={`fs-s h-text ${styles.contactLink}`}>
                    <a
                      className={`fs-s h-text ${styles.contactLink}`}
                      href="mailto:press@spolialab.com"
                      onMouseEnter={() => setIsBlurred(true)}
                      onMouseLeave={() => setIsBlurred(false)}
                    >
                      press@spolialab.com
                    </a>
                  </div>
                </div>

                {/* <div className={`${styles.contactSection} `}>
                  <h3 className={`${styles.contactTitle} fs-s h-text`}>CONTACT</h3>
                  <div className={styles.contactDetails}>
                    <p className={`${styles.contactDetails} fs-s h-text`}>SPOLIA LLC</p>
                    <p className={`${styles.contactDetails} fs-s h-text`}>250 Hudson St S.702</p>
                    <p>New York, NY 10013</p>
                  </div>
                </div> */}
              </div>
            </GridItem>
            {/* Contact info */}
          </Grid>

          {/* Bottom section */}
          <div className={styles.bottomSection}>
            <Grid>
              {/* Copyright */}
              <GridItem start={1} span={2} style={{ alignSelf: "end" }} startMobile={1} spanMobile={12}>
                <div className={`${styles.copyright} fs-s h-text`}>
                  <span>2025 SPOLIA LLC</span>
                  <br />
                  <span>All rights reserved.</span>
                </div>
              </GridItem>

              {/* System info */}
              <GridItem start={3} span={1} style={{ alignSelf: "end" }}>
                <div className={styles.systemInfo} style={{ alignSelf: "end" }}>
                  <span>
                    {dimensions.width}×{dimensions.height}
                  </span>
                </div>
              </GridItem>
              <GridItem start={5} span={1} style={{ alignSelf: "end" }}>
                <div className={styles.systemInfo}>
                  <span>{time?.toLocaleTimeString()}</span>
                </div>
              </GridItem>
              <GridItem start={7} span={1} style={{ alignSelf: "end" }}>
                <div className={styles.systemInfo}>
                  <span>{OS}</span>
                </div>
              </GridItem>

              <GridItem start={10} span={1} startMobile={1} spanMobile={6}>
                <div className={styles.navigation}>
                  <a
                    href="/work"
                    className="fs-s h-text"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Work
                  </a>
                  {/* <a
                    href="/research"
                    className="fs-s h-text"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Research
                  </a> */}
                  <a
                    href="/studio"
                    className="fs-s h-text"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Studio
                  </a>
                  <a
                    href="/glossary"
                    className="fs-s h-text"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Glossary
                  </a>
                  <a
                    href="/surprise"
                    className="fs-s h-text"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Surprise Me
                  </a>
                </div>
              </GridItem>
              <GridItem start={11} span={2} style={{ alignSelf: "end" }} startMobile={7} spanMobile={6}>
                <div className={styles.navigation}>
                  <a
                    className="fs-s h-text"
                    href="https://instagram.com/spolialab"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Instagram
                  </a>
                  <a
                    className="fs-s h-text"
                    href="https://linkedin.com/company/spolialab"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://spolia.beehiiv.com/subscribe"
                    className="fs-s h-text"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Newsletter
                  </a>
                  <a
                    className="fs-s h-text"
                    href="https://patreon.com/spolialab"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsBlurred(true)}
                    onMouseLeave={() => setIsBlurred(false)}
                  >
                    Patreon
                  </a>
                </div>
              </GridItem>
              {/* <GridItem start={11} span={2} style={{ alignSelf: "end" }} startMobile={9} spanMobile={4}>
                <div className={styles.navigation}>
                  <a className="fs-s h-text" href="/imprint">
                    Imprint
                  </a>
                  <a className="fs-s h-text" href="/privacy">
                    Privacy Policy
                  </a>
                  <a className="fs-s h-text" href="/terms">
                    Terms of Service
                  </a>
                </div>
              </GridItem> */}
            </Grid>
          </div>
        </GridContainer>
      </div>
    </footer>
  );
}
