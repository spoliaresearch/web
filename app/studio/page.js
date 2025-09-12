"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import CustomImage from "../components/Image";
import styles from "./page.module.css";
import studioStyles from "./page.module.css";
import Header from "../components/Header";
import MiniTitle from "../components/MiniTitle";
import Footer from "../components/Footer";
import Line from "../components/Line";
import { GridContainer, Grid, GridItem } from "../components/Grid";
import { Divider, Table } from "../components";
import { PageTitleProvider, usePageTitle } from "../components/contexts/PageTitleContext";
import Video from "../components/Video";

function StudioContent() {
  const titleRef = useRef(null);
  const { setMiniTitle, setMiniVisible } = usePageTitle();

  useEffect(() => {
    setMiniTitle("Practice");

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When title is NOT visible (passed the header), show mini title
        setMiniVisible(!entry.isIntersecting);
      },
      {
        // Watch for when title crosses the header bottom (accounting for header height)
        rootMargin: "-80px 0px 0px 0px", // Adjust based on header height
        threshold: 0,
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      setMiniVisible(false);
    };
  }, [setMiniTitle, setMiniVisible]);

  return (
    <div className={styles.container}>
      <Header />
      <MiniTitle />
      <main className={styles.main}>
        <Divider size="s" />
        <GridContainer>
          {/* Video Section */}
          <Grid>
            <GridItem span={3}>
              <div className={studioStyles.section}>
                <h1 ref={titleRef} className={studioStyles.pageTitle}>
                  {" "}
                  Practice
                </h1>
              </div>
            </GridItem>
            <GridItem start={8} span={6}>
              <div className={studioStyles.section}>
                <h2 className={studioStyles.pageSubtitle}>
                  {" "}
                  <span>As an independent R&D practice, </span>we leverage design and technology to bring vital ideas
                  into the world.
                </h2>
              </div>
            </GridItem>
          </Grid>
          <Divider size="ml" />
          <Grid>
            <GridItem span={12}>
              <div className={studioStyles.videoSection}>
                {/* <video autoPlay muted loop>
                  <source src="/FOR_PRODUCTION/video/SPOLIA explainer.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
                <Video src="/SPOLIA explainer" autoPlay muted loop style={{ width: "100%", height: "100%" }} />
              </div>
            </GridItem>
          </Grid>
          <Divider size="xs" />
          <Line />
          <Divider size="xxs" />
          <Grid>
            <GridItem start={0} span={6}>
              <p className="fs-sm s-text">PHILOSOPHY</p>
            </GridItem>
            <GridItem start={7} span={7}>
              <div className={studioStyles.section}>
                <p className={"fs-smm h-text t-r"}>
                  Our mission is to apply emerging technology to address today’s urgent challenges of climate and
                  culture. By bridging the physical and digital, we design practical applications that respond to
                  critical issues and connect people to technology and their surroundings in new ways. Through each
                  project, we work across mediums and scales to bring about more hopeful, creative, and sustainable
                  futures.
                </p>
              </div>
            </GridItem>
          </Grid>
          <Divider size="ml" />
          {/* Swiss Images Grid - Using CustomImage for performance testing */}
          <Grid>
            <GridItem span={3}>
              <div className={studioStyles.imageContainer}>
                <CustomImage
                  src="/swiss_meadow"
                  alt="Swiss landscape with person walking"
                  className={studioStyles.customImage}
                />
                <p className="fs-xs cap">Enabling resilient systems.</p>
              </div>
            </GridItem>
            <GridItem span={3}>
              <div className={studioStyles.imageContainer}>
                <CustomImage
                  src="/beacons_eric"
                  alt="Swiss mountain landscape with green grass"
                  className={studioStyles.customImage}
                />
                <p className="fs-xs cap">Connecting physical environments to digital platforms.</p>
              </div>
            </GridItem>
            <GridItem span={3}>
              <div className={studioStyles.imageContainer}>
                <CustomImage
                  src="/symlink_exhibit"
                  alt="Swiss meadow with dandelions and mountains"
                  className={studioStyles.customImage}
                />
                <p className="fs-xs cap">Community-led innovation.</p>
              </div>
            </GridItem>
            <GridItem span={3}>
              <div className={studioStyles.imageContainer}>
                <CustomImage
                  src="/swiss_mountain"
                  alt="Snow-capped Swiss mountain range"
                  className={studioStyles.customImage}
                />
                <p className="fs-xs cap">Creating gentle and curious technology.</p>
              </div>
            </GridItem>
          </Grid>
          <Divider size="m" />
          <Line />
          <Divider size="xxs" />
          <Grid>
            <GridItem start={0} span={6}>
              <p className="fs-sm s-text">SERVICES</p>
            </GridItem>
            <GridItem start={7} span={7}>
              <div className={studioStyles.section}>
                <p className={"fs-smm h-text t-r"}>
                  SPOLIA partners with innovators in their field to imagine and bring to life products and experiences.
                  Whether a cultural institution, startup, or established brand, we help organizations grow and navigate
                  new ideas, rapidly changing environments, and complex systems.
                </p>
              </div>
            </GridItem>
            {/* <GridItem start={0} span={1}>
              <div style={{ marginTop: "1.5rem" }}>
                <p className={"fs-s b-h-text"}>INDUSTRY</p>
              </div>
              <div style={{ marginTop: "1rem" }} className="fs-sm h-text">
                Architecture <br />
                Technology <br /> Sustainability <br />
                Manufacturing <br /> Art <br /> Science <br /> Education
              </div>
            </GridItem> */}
            <GridItem start={7} span={4}>
              <table className={styles.table} style={{ marginTop: "2.5rem" }}>
                <thead>
                  <tr>
                    <th className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".5rem" }}></th>
                    <th className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                      Offerings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <span className={`fs-xs b-text g t-r ${styles.hideOnMobile}`}>01</span>
                    </td>
                    <td className={styles.tableCell}>
                      <h3 className="fs-sm h-text lh-t">Product Innovation</h3>
                      <p className="fs-sm h-text ">
                        End-to-end research, strategy, design, and development for new products and tools.
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <span className={`fs-xs b-text g ${styles.hideOnMobile}`}>02</span>
                    </td>
                    <td className={styles.tableCell}>
                      <h3 className="fs-sm h-text lh-t">Spatial Experiences</h3>
                      <p className="fs-sm h-text t-r ">
                        Interactive environments through spatial computing, AR/XR, and physical-digital systems.
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <span className={`fs-xs b-text g ${styles.hideOnMobile}`}>03</span>
                    </td>
                    <td className={styles.tableCell}>
                      <h3 className="fs-sm h-text lh-t">Narratives</h3>
                      <p className="fs-sm h-text t-r ">
                        Shaping product stories, brand identities, and future scenarios with technical and generative
                        media.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </GridItem>
            <GridItem start={11} span={2}>
              <table className={styles.table} style={{ marginTop: "2.5rem" }}>
                <thead>
                  <tr>
                    <th className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                      Industry
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <p className="fs-s h-text">
                        <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                          Architecture <br />
                          Technology <br /> Sustainability <br />
                          Manufacturing <br /> Art <br /> Science <br /> Education
                        </div>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </GridItem>
          </Grid>
          {/* Header Section */}
          <Divider size="s" />
          <Line />
          <Divider size="xxs" />
          <Grid>
            <GridItem start={0} span={2} spanMobile={12}>
              <p className="fs-sm s-text" style={{ marginBottom: "1rem" }}>
                APPROACH
              </p>

              <Video
                src="/gesture_final"
                autoPlay
                muted
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#26160A",
                }}
              />
            </GridItem>
            <GridItem start={7} span={7}>
              <div className={studioStyles.section}>
                <p className={"fs-smm h-text t-r"}>
                  We can act as your dedicated R&D team, or extend the capabilities of your existing team. As a hybrid
                  between a research lab and applied studio, we combine rigorous research with an integrated design and
                  development process to translate complex problems into clear and usable solutions.
                </p>
              </div>
            </GridItem>
          </Grid>
          <Divider size="s" />
          <Line />
          <Divider size="xxs" />
          <Grid>
            <GridItem start={0} span={6}>
              <p className="fs-sm s-text" style={{ marginBottom: "1rem" }}>
                COLLABORATIONS
              </p>
            </GridItem>
            <GridItem start={7} span={6}>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Selected Exhibitions
              </div>
              <p className="fs-s h-text">
                <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                  2025 Venice Biennale, From Liquid to Stone <br />
                  2025 New Museum, Beacons <br />
                  2023 SPACE10, Design in the Age of AI
                </div>
              </p>
            </GridItem>
            <GridItem start={7} span={3}>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Community Network
              </div>
              <p className="fs-s h-text">
                <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                  MIT <br />
                  Princeton <br />
                  Yale <br />
                  EPFL <br />
                  University of Virginia <br />
                  Parsons <br />
                  NEW INC
                </div>
              </p>
            </GridItem>
            <GridItem start={7} span={5}>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Publications
              </div>
              <p className="fs-s h-text">
                <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                  2025 Cambridge University Research Directions,SYMLINK: An Ecological Intelligence for Citizen-led
                  Regenerative Design, 2025 <br /> <br /> 2020 ACADIA, Engelbart: An Agent-Based Interface for Exploring
                  Beyond the Social Media Filter Bubble
                </div>
              </p>
            </GridItem>
            <GridItem start={7} span={5}>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Lectures & Workshops
              </div>
              <p className="fs-s h-text">
                <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                  2025 Parsons, Recess // Reset: Conversations for Design Tomorrow <br />
                  2025 NYCxDesign <br />
                  2025 NEW INC, Creative Science Talk: Beacons
                </div>
              </p>
            </GridItem>
          </Grid>

          <Divider size="s" />
          <Line />
          <Divider size="xxs" />
          <Grid>
            <GridItem start={0} span={6}>
              <p className="fs-sm s-text">CONTACT</p>
            </GridItem>
            <GridItem start={7} span={2}>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Inquiries
              </div>
              <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                <a href="mailto:hello@spolialab.com">hello@spolialab.com</a>
              </div>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Careers
              </div>
              <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                <a href="mailto:hello@spolialab.com">apply@spolialab.com</a>
              </div>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Media
              </div>
              <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                <a href="mailto:hello@spolialab.com">press@spolialab.com</a>
              </div>
            </GridItem>
            <GridItem start={9} span={2}>
              <div className={`fs-s b-h-text ${styles.tableHeader}`} style={{ paddingBottom: ".75rem" }}>
                Social
              </div>
              <div style={{ marginTop: "0rem" }} className="fs-sm h-text">
                <a href="mailto:hello@spolialab.com">Instagram</a> <br />
                <a href="mailto:hello@spolialab.com">LinkedIn</a> <br />
                <a href="mailto:hello@spolialab.com">Newsletter</a>
              </div>
            </GridItem>
            <GridItem start={7} span={6}>
              <br />
            </GridItem>
          </Grid>
        </GridContainer>
        <Divider size="m" />
      </main>
      <Footer />
    </div>
  );
}

export default function StudioPage() {
  return (
    <PageTitleProvider>
      <StudioContent />
    </PageTitleProvider>
  );
}
