"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { GridContainer, Grid, GridItem } from "../Grid";
import Line from "../Line";
import Divider from "../Divider";
export default function Header() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header if we're past 50px and scrolling up by more than 5px
      if (currentScrollY > 50 && lastScrollY - currentScrollY > 5) {
        setIsVisible(true);
      }
      // Hide header only when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
      <GridContainer inner={true}>
        <Grid>
          <GridItem start={1} span={1} startMobile={1} spanMobile={2}>
            <Link href="/" className={styles.logo}>
              <span className="fs-xs">SPOLIA</span>
            </Link>
          </GridItem>
          <GridItem start={6} span={2} dropMobile={true}>
            <div className="c">
              <span className="fs-xs">
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
          </GridItem>

          <GridItem start={10} span={1} startMobile={6} spanMobile={1}>
            <Link href="/studio">
              <span className="fs-xs">STUDIO</span>
            </Link>
          </GridItem>

          <GridItem start={11} span={1} startMobile={8} spanMobile={1}>
            <Link href="/work">
              <span className="fs-xs">WORK</span>
            </Link>{" "}
          </GridItem>

          <GridItem start={12} span={1} startMobile={10} spanMobile={1}>
            <Link href="/research">
              <span className="fs-xs">RESEARCH</span>
            </Link>
          </GridItem>
        </Grid>
      </GridContainer>

      {/* <Line /> */}
    </header>
  );
}
