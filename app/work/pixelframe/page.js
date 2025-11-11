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
                    As part of the Venice Architecture Biennale 2025 exhibition "From Liquid to Stone", we developed a digital material passport system for Pixelframe, a modular precast construction system developed by Future Assemblies and the Digital Structures lab at MIT.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    The digital interface links each concrete element to its material story – revealing how design, data, and reuse can shape a more circular built environment.
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
                    Visitors can scan any element in the installation via RFID tags to access its full material record, revealing its carbon emissions, fabrication history, and movement across sites and assemblies.
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
                  <p className="fs-s b-h-text  p t-r bl">Concrete Without Waste</p>
                  <p className="fs-sm h-text  p t-r  bl">
                    Concrete is one of the most widely used materials in building construction, contributing nearly 10% of global CO₂ emissions each year. Because concrete is not designed for reuse, structures are demolished at the end of their life, sending over 360 million metric tons of concrete to landfills annually in the United States.
                  </p>
                  <p className="fs-sm h-text  p t-r  bl">
                    To promote circularity in concrete construction, the Future Assemblies group and MIT's Digital Structures Lab developed a "pixel" technology, modular precast concrete components that can be assembled into larger structural configurations, such as beams and columns. To make this system truly reusable, each component needs a digital record of what it's made of, how it's been used, and how it's performing over time. This record, called a <em>material passport</em>, allows components to be identified, verified, and safely reused instead of discarded.
                  </p>
                  <p className="fs-sm h-text  p t-r  bl">
                    Our work focused on designing and building the digital layer, a material system connecting each physical component to its data.
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
                  <p className="fs-s b-h-text  p t-r bl">Material Passports & Digital Twins</p>
                  <p className="fs-sm h-text  p t-r  bl">
                    The material passport functions as the digital twin for every Pixelframe element, forming a living material bank that tracks each pixel's lifecycle from fabrication through multiple deployments.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    Through the interface, users can:
                  </p>
                  <ul className="fs-sm h-text  p t-r bl">
                    <li>Tap their phone against an RFID tag on a component to open its full material record</li>
                    <li>Identify which pixels are in use, where they are located, and in which assemblies</li>
                    <li>Track how configurations evolve over time</li>
                    <li>View total carbon emissions per pixel or structure</li>
                    <li>See the geographic movement of assemblies across sites</li>
                    <li>Access 3D scans to assess the condition of each module</li>
                    <li>Use AR/VR tools to visualize assemblies at scale on a project site</li>
                  </ul>
                  <p className="fs-sm h-text  p t-r  bl">
                    Together, these capabilities make every element legible, traceable, and ready for reuse, linking physical material to its digital history and supporting circular construction at scale.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />

              <Grid>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-s b-h-text  p t-r bl">Toward Circular Construction</p>
                  <p className="fs-sm h-text  p t-r  bl">
                    The Pixelframe passport turns data into a practical tool for reuse. By giving every concrete module a digital identity, it makes each one traceable, verifiable, and ready for another life. It removes the friction that typically prevents reuse: unknown provenance, unverified performance, and logistical complexity.
                  </p>
                  <p className="fs-sm h-text  p t-r  bl">
                    It points toward a future of continuous construction in which concrete shifts from a disposable material to one with a recorded history that can be reused and adapted as buildings evolve.
                  </p>
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