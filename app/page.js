"use client";

import styles from "./page.module.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter/Newsletter";
import FontSettingsToggle from "./components/contexts/FontSettingsToggle";
import ThemeToggle from "./components/contexts/ThemeToggle";
import { DisableInteractive } from "./components/contexts/DisableInteractive";
import LoadingOverlay from "./components/LoadingOverlay";
import { GlossaryLink } from "./components/GlossaryProvider";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Grid, GridContainer, GridItem } from "./components/Grid";
import Divider from "./components/Divider";
import WorkPreviews3 from "./components/WorkPreviews3";
import Line from "./components/Line";
import DissolveImage from "./components/DissolveImage";
import TimezoneClock from "./components/TimezoneClock";
// Dynamically import ThreeAnimation to prevent SSR issues
const ThreeAnimation = dynamic(() => import("./components/ThreeAnimation"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "400px",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: "white",
      }}
    >
      Loading 3D Scene...
    </div>
  ),
});

export default function HomePage() {
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Log actual computed CSS property values, not the variable strings
    const testElement = document.querySelector(".fs-l");
    if (testElement) {
      const elementStyle = getComputedStyle(testElement);
      console.log("Actual computed values for fs-l element:");
      console.log("font-size:", elementStyle.fontSize);
      console.log("letter-spacing:", elementStyle.letterSpacing);
      console.log("line-height:", elementStyle.lineHeight);
    }

    // Test the base html font size
    const htmlStyle = getComputedStyle(document.documentElement);
    console.log("HTML base font-size:", htmlStyle.fontSize);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if user has visited before
    const visited = sessionStorage.getItem("hasVisitedHome");
    if (visited) {
      setShowLoading(false);
      setHasVisited(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setHasVisited(true);
    sessionStorage.setItem("hasVisitedHome", "true");
  };

  return (
    <>
      {showLoading && !hasVisited && <LoadingOverlay onComplete={handleLoadingComplete} />}
      <div className={styles.container}>
        <Header />
      
        <main className={styles.main}>
        <Divider size="xxs" />

          <Hero />
          <GridContainer>
            <Grid style={{ marginBottom: "2rem" }}>
              <GridItem start={0} span={12}>
                <h1
                  className="fs-l t-text"
                  style={{
                    // fontSize: "48px",
                    // lineHeight: "52px",
                    // letterSpacing: "-.04em",
                    // fontVariationSettings: '"wght" 360, "ital" 0, "SRFF" 0.43',
                    marginTop: "45px",
                    marginBottom: "100px",
                  }}
                >
                  <GlossaryLink slug="spolia">
                    <span
                      style={{
                        position: "relative",
                      }}
                    >
                      SPOLIA
                      <div
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          left: "0",
                          width: "100%",
                          height: "0",
                          borderBottom: "1.25px dotted #85827e",
                        }}
                      />
                    </span>
                  </GlossaryLink>{" "}
                  is a design and technology studio. We turn research into built products and experiences.{" "}
                </h1>
              </GridItem>
              <GridItem start={0} span={2}>
                <TimezoneClock />
              </GridItem>
              <GridItem start={11} span={2}>
                <div style={{ textAlign: "right" }}>Design U Technology</div>
              </GridItem>
              <GridItem start={0} span={12}>
                <ThreeAnimation />
              </GridItem>
            </Grid>
            <Divider size="xs" />
            <div>PRACTICE</div>

            <Grid>
              <GridItem start={0} span={3}>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    backgroundImage: "url('/hold.png')",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundColor: "#251609",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "8px",
                    marginTop: "10px",
                    transform: "rotate(90deg) translate(0px, 0px)",
                  }}
                ></div>
                <Divider size="m" />
              </GridItem>
              {/* <DissolveImage name="arrow-left" fill="#006400" width="23" height="13" /> */}
              <GridItem start={7} span={6}>
                <div className="fs-m t-text">
                  As a hybrid between a studio and research lab, we explore how design and technology can benefit people
                  and the planet in a time of rapid change. We explore the practical and theoretical possibilities of
                  emerging technology through an R&D process.
                </div>
                <br /> Learn More →
              </GridItem>
            </Grid>
            {/* <Line /> */}
            <Divider size="m" />
            {/* Research section temporarily hidden
            <Grid style={{ marginBottom: "2rem" }}>
              <GridItem start={0} span={12}>
                <div className="fs-s">Research</div>
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    borderRadius: "8px",
                    marginTop: "10px",
                    backgroundImage: "url('/rock.webp')",
                    backgroundPosition: "center",
                    backgroundColor: "#ddd",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </GridItem>
              <GridItem start={0} span={12}>
                <br />
                <p className="fs-s t-text ">MATERIAL INTELLIGENCE</p>
                <p className="fs-m t-text ">How might digital technology enable better material systems?</p>
              </GridItem>
              <GridItem start={1} span={6}></GridItem>
            </Grid>
            */}
            <Divider size="m" />

            <Grid style={{ marginBottom: "2rem" }}>
              <GridItem start={0} span={12}>
                <div className="fs-s">Work</div>
              </GridItem>
            </Grid>

            {/* <Line style={{ marginBottom: "0rem" }} /> */}
            <WorkPreviews3 />
            <Divider size="m" />
          </GridContainer>

          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
}
