"use client";

import styles from "./page.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "../../components/Image";
import Divider from "../../components/Divider";
import Line from "../../components/Line";
import Video from "../../components/Video";
import Close from "../../components/Close";
import { GridContainer, Grid, GridItem } from "../../components/Grid";
import PageThemeProvider from "../../components/contexts/PageThemeProvider";
import DissolveImage from "../../components/DissolveImage";
import { MediaProvider, MediaModal } from "../../components/MediaModal";
import { useEffect, useState } from "react";

export default function PixelframePage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header if we're past 50px and scrolling up by more than 5px
      if (currentScrollY > 50 && lastScrollY - currentScrollY > 5) {
        setIsHeaderVisible(true);
      }
      // Hide header only when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <MediaProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div className={styles.canvasContainer}>
            <GridContainer>
              <Divider size="m" />
              <div className={`${styles.stickyGrid} ${isHeaderVisible ? styles.headerVisible : ""}`}>
                <Grid>
                  <GridItem span={2} start={0}>
                    <Close />
                  </GridItem>
                  <GridItem span={2} start={3}>
                    <span className="fs-xxs t-text lh-0 meta"> INDEX </span>
                    <span className="fs-xs h-text meta">1.2.3</span>
                  </GridItem>

                  <GridItem span={2} start={5}>
                    <span className="fs-xxs t-text lh-0 meta"> TYPE </span>
                    <span className="fs-xs h-text meta">Digital Infrastructure</span>
                  </GridItem>
                  <GridItem span={2} start={8}>
                    <span className="fs-xxs t-text lh-0 meta"> NAME</span>
                    <span className="fs-xs h-text meta"> PIXELFRAME</span>
                  </GridItem>
                  <GridItem span={2} start={10}>
                    <span className="fs-xxs t-text lh-0 meta"> YEAR</span>
                    <span className="fs-xs h-text meta"> 2025</span>
                  </GridItem>
                </Grid>
              </div>

              <Grid>
                <GridItem span={12}>
                  {/* Placeholder for main image - Eric to provide */}
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Main Pixelframe Image - To be provided</p>
                  </div>
                </GridItem>
              </Grid>

              <Divider size="xxs" />
              <Grid>
                <GridItem span={12} start={0}></GridItem>
              </Grid>
              <Divider size="xs" />

              <Line />
              <Divider size="xxs" />
              <Grid>
                <GridItem span={2} start={1}>
                  <p className="fs-xs b-h-text lh-0 meta ">Exhibition</p>
                  <p className="fs-xs h-text meta">
                    <a href="https://www.labiennale.org/" target="_blank" rel="noopener noreferrer">
                      VENICE ARCHITECTURE BIENNALE
                    </a>
                  </p>
                  <p className="fs-xs h-text meta">From Liquid to Stone</p>
                  <p className="fs-xs h-text meta ">2025</p>
                </GridItem>
                <GridItem span={3} start={3}>
                  <p className="fs-xs b-h-text lh-0 meta ">Collaborators</p>
                  <p className="fs-xs  h-text meta">
                    <a href="https://www.instagram.com/future_assemblies/" target="_blank" rel="noopener noreferrer">
                      Future Assemblies
                    </a>
                  </p>
                  <p className="fs-xs  h-text meta ">
                    <a href="https://www.instagram.com/digitalstructuresmit/" target="_blank" rel="noopener noreferrer">
                      Digital Structures MIT
                    </a>
                  </p>
                  <p className="fs-xs  h-text meta ">
                    <a href="https://www.instagram.com/mitarchitecture/" target="_blank" rel="noopener noreferrer">
                      MIT Architecture
                    </a>
                  </p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r bl">
                    A digital material passport system for modular precast construction, enabling circular economies through intelligent material tracking and lifecycle management.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    Developed as part of the Venice Architecture Biennale 2025 exhibition "From Liquid to Stone," this system demonstrates how digital infrastructure can surface new material intelligences.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="l" />

              {/* Process Images Grid - Placeholders */}
              <Grid>
                <GridItem start={0} span={4}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">RFID Tagging Process</p>
                  </div>
                </GridItem>
                <GridItem start={4} span={4}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Mobile Interface</p>
                  </div>
                </GridItem>
                <GridItem start={8} span={4}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Installation View</p>
                  </div>
                </GridItem>
              </Grid>

              <Divider size="s" />
              <Line />
              <Divider size="xxs" />

              <Grid>
                <GridItem span={1} start={0}>
                  <p className="fs-s h-text  p t-r bl">PROCESS</p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-s b-h-text  p t-r bl">Digital Material Passports</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    Each Pixelframe component is embedded with RFID technology, creating a unique digital identity that travels with the physical material throughout its lifecycle. This system enables real-time tracking of material provenance, carbon emissions, and fabrication history.
                  </p>
                  <br />
                  <p className="fs-s b-h-text  p t-r bl">Mobile Scanning Platform</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    A custom mobile application allows users to scan any element within the installation, instantly accessing comprehensive material records including carbon footprint data, manufacturing details, and assembly history across multiple sites and configurations.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />

              {/* Technical Process Grid - Placeholders */}
              <Grid>
                <GridItem span={3} start={1}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">RFID Chip Detail</p>
                  </div>
                </GridItem>
                <GridItem span={4} start={4}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Scanning Interface</p>
                  </div>
                </GridItem>
                <GridItem span={4} start={8}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Data Visualization</p>
                  </div>
                </GridItem>
              </Grid>

              <Divider size="l" />
              <Grid>
                <GridItem span={5} start={8}>
                  <p className="fs-s b-h-text  p t-r bl">Circular Material Intelligence</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    The system tracks material movement across sites and assemblies, creating a comprehensive database of component lifecycle data. This enables informed decision-making about material reuse, recycling, and end-of-life processing.
                  </p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    By making material histories visible and accessible, the platform supports the transition toward circular construction economies where building components maintain value across multiple use cycles.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />

              <Grid>
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r ti bl">
                    The Pixelframe digital passport system demonstrates how embedded sensing technologies and mobile interfaces can transform construction materials from static resources into intelligent, trackable assets within circular economic frameworks.
                  </p>
                </GridItem>
              </Grid>

              <Divider size="m" />
              <Line />
              <Divider size="xxs" />

              <Grid>
                <GridItem span={1} start={0}>
                  <p className="fs-s h-text  p t-r bl">TECHNICAL SPECIFICATIONS</p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-s b-h-text  p t-r bl">RFID Integration</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    [Technical details about RFID chip specifications, read range, and durability to be provided]
                  </p>
                  <br />
                  <p className="fs-s b-h-text  p t-r bl">Mobile Platform Architecture</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    [Details about mobile app development, database architecture, and cloud infrastructure to be provided]
                  </p>
                  <br />
                  <p className="fs-s b-h-text  p t-r bl">Data Standards</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    [Information about material passport data formats, interoperability standards, and API specifications to be provided]
                  </p>
                </GridItem>
              </Grid>

              <Divider size="m" />

              {/* APPENDIX SECTION */}
              <Line />
              <Divider size="xxs" />
              <Grid>
                <GridItem span={1} start={0}>
                  <p className="fs-s h-text  p t-r bl">APPENDIX</p>
                </GridItem>
              </Grid>
              <Divider size="s" />

              {/* Appendix Images Grid - Placeholders */}
              <Grid height={"300px"}>
                <GridItem span={2}></GridItem>
                <GridItem span={2}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Process Documentation</p>
                  </div>
                </GridItem>
                <GridItem span={2}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Interface Screenshots</p>
                  </div>
                </GridItem>
                <GridItem span={2}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Installation Views</p>
                  </div>
                </GridItem>
                <GridItem span={2}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Technical Diagrams</p>
                  </div>
                </GridItem>
                <GridItem span={2}></GridItem>
                <GridItem span={2}></GridItem>
                <GridItem span={2}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Material Samples</p>
                  </div>
                </GridItem>
                <GridItem span={2}>
                  <div className={styles.placeholderImage}>
                    <p className="fs-xs t-text meta">Data Visualizations</p>
                  </div>
                </GridItem>
              </Grid>
              <Divider size="m" />
            </GridContainer>
          </div>
        </div>
        <Footer />
        <MediaModal />
      </div>
    </MediaProvider>
  );
}