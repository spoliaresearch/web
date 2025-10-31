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
                  <GridItem span={2} start={0} spanMobile={1}>
                    <Close />
                  </GridItem>
                  <GridItem span={2} start={3} spanMobile={2}>
                    <span className="fs-xxs t-text lh-0 meta"> INDEX </span>
                    <span className="fs-xs h-text meta">2.1.2</span>
                  </GridItem>

                  <GridItem span={2} start={5} dropMobile={true}>
                    <span className="fs-xxs t-text lh-0 meta"> TYPE </span>
                    <span className="fs-xs h-text meta">Project</span>
                  </GridItem>
                  <GridItem span={2} start={8} spanMobile={7}>
                    <span className="fs-xxs t-text lh-0 meta"> NAME</span>
                    <span className="fs-xs h-text meta"> PIXELFRAME</span>
                  </GridItem>
                  <GridItem span={2} start={10} spanMobile={2}>
                    <span className="fs-xxs t-text lh-0 meta"> YEAR</span>
                    <span className="fs-xs h-text meta"> 2025</span>
                  </GridItem>
                </Grid>
              </div>

              <Grid>
                <GridItem span={12}>
                  <Video src="PF-Map" verticalCrop={0.06} />
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
                <GridItem span={2} start={1} spanMobile={6}>
                  <p className="fs-xs b-h-text lh-0 meta ">Exhibition</p>
                  <p className="fs-xs h-text meta">
                    <a href="https://www.labiennale.org/" target="_blank" rel="noopener noreferrer">
                      VENICE ARCHITECTURE BIENNALE
                    </a>
                  </p>
                  <p className="fs-xs h-text meta">From Liquid to Stone</p>
                  <p className="fs-xs h-text meta ">2025</p>
                </GridItem>
                <GridItem span={3} start={3} startMobile={7} spanMobile={6}>
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
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r bl">
                    A digital material passport system for modular precast construction, enabling circular economies through intelligent material tracking and lifecycle management.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    Developed as part of the Venice Architecture Biennale 2025 exhibition "From Liquid to Stone," this system demonstrates how digital infrastructure can surface new material intelligences.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="l" />

              {/* Process Photos Grid */}
              <Grid>
                <GridItem span={6} start={0}>
                          {/* <Image src="IMG_4652" /> */}
                         <Video hideUi src="PF-Globe" />
                </GridItem>
                <GridItem span={6} start={7}>
                <Video  hideUi src="PF-Em-G" /> 
               
                </GridItem>
              </Grid>
              <Divider size="m" />
              <Grid>
              <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r bl">
                    A digital material passport system for modular precast construction, enabling circular economies through intelligent material tracking and lifecycle management.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    Developed as part of the Venice Architecture Biennale 2025 exhibition "From Liquid to Stone," this system demonstrates how digital infrastructure can surface new material intelligences.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="m" />
              {/* Process Images Grid - Placeholders */}
              <Grid>
                {/* <GridItem start={0} span={4}>
                  <Image src="IMG_5097" />
                </GridItem> */}
                <GridItem start={1} span={6}>
    
                  <Video verticalCrop={0.02} hideUi src="PF-Beam-full" />
                </GridItem>
                <GridItem start={7} span={6}>
                  <Image src="IMG_4980" />
                                {/* <Image src="IMG_4652" /> */}
                                {/* <Image src="IMG_5097" /> */}
                </GridItem>
              </Grid>

              <Divider size="s" />
             
              <Line />
              <Divider size="xxs" />

              <Grid>
                <GridItem span={1} start={0}>
                  <p className="fs-s h-text  p t-r bl">PROCESS</p>
                </GridItem>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-s b-h-text  p t-r bl">Digital Material Passports</p>
                  <p className="fs-sm h-text  p t-r  bl">
                    Each Pixelframe component is embedded with RFID technology, creating a unique digital identity that travels with the physical material throughout its lifecycle. This system enables real-time tracking of material provenance, carbon emissions, and fabrication history.
                  </p>
                  <br />
                  <p className="fs-s b-h-text  p t-r bl">Mobile Scanning Platform</p>
                  <p className="fs-sm h-text  p t-r  bl">
                    A custom mobile application allows users to scan any element within the installation, instantly accessing comprehensive material records including carbon footprint data, manufacturing details, and assembly history across multiple sites and configurations.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="m" />

              {/* Technical Process Grid - Placeholders */}
              <Grid>
            
                <GridItem start={0} span={4}>   <Image src="IMG_4652" /></GridItem>
                <GridItem start={5} span={8}>
                <Video verticalCrop={0.072} rotate={10} scale={1.09} hideUi  src="PF-Scan" />
                </GridItem>
                {/* <GridItem start={5} span={4}>
                  <Video src="PF-Beam" />
                </GridItem>
                <GridItem start={9} span={4}>
                  <Video src="PF-Globe" />
                </GridItem> */}
              </Grid>

              <Divider size="m" />
              <Grid>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-s b-h-text  p t-r bl">Circular Material Intelligence</p>
                  <p className="fs-sm h-text  p t-r  bl">
                    The system tracks material movement across sites and assemblies, creating a comprehensive database of component lifecycle data. This enables informed decision-making about material reuse, recycling, and end-of-life processing.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    By making material histories visible and accessible, the platform supports the transition toward circular construction economies where building components maintain value across multiple use cycles.
                  </p>
                  <p className="fs-sm h-text  p t-r  bl">
                    The Pixelframe digital passport system demonstrates how embedded sensing technologies and mobile interfaces can transform construction materials from static resources into intelligent, trackable assets within circular economic frameworks.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />

              <Grid>
                <GridItem span={5} start={8}>
                 
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Grid>
                <GridItem span={6} start={1}>
                          {/* <Image src="IMG_4652" /> */}
                          <Video hideUi src="PF-A-Tower" />
                </GridItem>
                <GridItem span={6} start={7}>
               
                <Image src="IMG_5097" />
                </GridItem>
                {/* <GridItem span={3} start={10}>
                <Video  src="PF-Globe" />
                </GridItem> */}
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
                <Video src="PF-AR" appendix />
             
                </GridItem>
                <GridItem span={2}>
              
                <Video src="PF-Em-S" appendix />
                </GridItem>
                <GridItem span={2}>
            
                <Video src="RFID_Scan" appendix verticalCrop={0.25}/>
                </GridItem>
                <GridItem span={2}>
                <Video src="PF-Anim" appendix />
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