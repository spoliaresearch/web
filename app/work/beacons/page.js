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

export default function BeaconsPage() {
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
            {/* <Divider size="xxs" /> */}

            <GridContainer>
              <Divider size="m" mobileSize="l" />
              <div className={`${styles.stickyGrid} ${isHeaderVisible ? styles.headerVisible : ""}`}>
                <Grid>
                  <GridItem span={2} start={0} spanMobile={1}>
                    <Close to="/work" />
                  </GridItem>
                  <GridItem span={2} start={3} spanMobile={2}>
                    <span className="fs-xxs t-text lh-0 meta"> INDEX </span>
                    <span className="fs-xs h-text meta">2.2.1</span>
                  </GridItem>

                  <GridItem span={2} start={5} dropMobile={true}>
                    <span className="fs-xxs t-text lh-0 meta"> TYPE </span>
                    <span className="fs-xs h-text meta">Experience</span>
                  </GridItem>
                  <GridItem span={2} start={8} spanMobile={7}>
                    <span className="fs-xxs t-text lh-0 meta"> NAME</span>
                    <span className="fs-xs h-text meta"> BEACONS</span>
                  </GridItem>
                  <GridItem span={2} start={10} spanMobile={2}>
                    <span className="fs-xxs t-text lh-0 meta"> YEAR</span>
                    <span className="fs-xs h-text meta"> 2025</span>
                  </GridItem>
                </Grid>
              </div>
              {/* </div> */}
              <Grid>
                {/* 
              // <GridItem span={1} start={10}>
              //   
              // </GridItem> */}

                <GridItem span={12}>
                  <Image
                    src="/beacons_wide"
                    alt="A person examining Beacons"
                    className={styles.pixelatedCanvas}
                    priority={true}
                    height={600}
                    width={2400}
                  />
                </GridItem>
              </Grid>
              <Grid>
                {/* <GridItem start={6} span={2}>
                <div>
                  <p className="fs-m t-text r">BEACONS</span>
                </div>
              </GridItem> */}
              </Grid>
              <Divider size="xxs" />
              <Grid>
                <GridItem span={12} start={0}></GridItem>
              </Grid>
              <Divider size="xs" />
              <Grid>
                {/* <GridItem span={12} start={0}>
                <div className="fs-ml t-text ">
                  <span className="fs-ml t-text g"> Beacons</span> is an immersive sound and light installation that
                  transforms environmental data from the deep sea into a sensory experience.
                </div>
              </GridItem> */}
              </Grid>
              <Line />
              {/* <Line /> */}
              <Divider size="xxs" />
              <Grid>
                <GridItem span={2} start={1} spanMobile={6}>
                  <p className="fs-xs b-h-text lh-0 meta ">Exhibition</p>
                  <p className="fs-xs h-text meta">
                    <a href="https://www.newmuseum.org/" target="_blank" rel="noopener noreferrer">
                      NEW MUSEUM{" "}
                    </a>
                  </p>
                  <p className="fs-xs h-text meta">
                    <a href="https://www.demofestival.org/" target="_blank" rel="noopener noreferrer">
                      DEMO
                    </a>
                  </p>

                  <p className="fs-xs h-text meta">180 MAIDEN LN, NYC</p>

                  <p className="fs-xs h-text meta ">Jun 02—Jun 27, 2025</p>
                </GridItem>
                <GridItem span={3} start={3} startMobile={7} spanMobile={6}>
                  <p className="fs-xs b-h-text lh-0 meta ">Team</p>
                  <p className="fs-xs  h-text meta">
                    <a href="https://beamstudio.earth/" target="_blank" rel="noopener noreferrer">
                      BEAM
                    </a>{" "}
                    <span className="fs-xxs  h-text meta up">Partner</span>
                  </p>

                  <p className="fs-xs  h-text meta ">
                    <a href="https://www.luke-thomas-henderson.com/" target="_blank" rel="noopener noreferrer">
                      Luke Henderson
                    </a>{" "}
                    <span className="fs-xxs  h-text meta up">Paper</span>
                  </p>

                  <p className="fs-xs  h-text meta ">
                    <a href="https://reminagreenfield.com/" target="_blank" rel="noopener noreferrer">
                      Remina Greenfield
                    </a>{" "}
                    <span className="fs-xxs  h-text meta up">Curator</span>
                  </p>

                  <p className="fs-xs  h-text meta ">
                    <a
                      href="https://www.linkedin.com/in/tony-tirador-503a24142/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tony Tirador
                    </a>{" "}
                    <span className="fs-xxs  h-text meta up">Production Assistance</span>{" "}
                  </p>

                  <p className="fs-xs  h-text meta ">
                    <a href="https://www.newmuseum.org/new-inc//" target="_blank" rel="noopener noreferrer">
                      NEW INC
                    </a>{" "}
                    <span className="fs-xxs  h-text meta up">Gallery</span>
                  </p>
                </GridItem>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r bl">
                    In 2025, SPOLIA and BEAM started a collaboration drawn together by a mutual interest in the deep-sea
                    and the current geopolitical focus in its exploitation for critical minerals.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    The result of this partnership is Beacons, an environmental installation exhibited at the New
                    Museum’s DEMO festival.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    {" "}
                    The work translates remote environmental data from the deep sea into immersive sound and light. A
                    set of custom, hanging 3D-printed speakers emit frequencies tied to more than 26 ecological
                    readings, allowing audiences in New York City to experience the fragile underwater ecosystem
                    normally inaccessible to human senses.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="l" />
              {/* Demo Images Grid */}
              <Grid>
                <GridItem start={0} span={2}>
                  <div className={styles.imageContainer}>
                    <Image
                      width={1200}
                      height={1200}
                      src="/Spolia_Beam_DEMO2025_4"
                      alt="Beacons installation demo image 4"
                    />
                  </div>
                </GridItem>
                <GridItem start={3} span={3}>
                  <div className={styles.imageContainer}>
                    <Image
                      width={1200}
                      height={400}
                      src="/Spolia_Beam_DEMO2025_3"
                      alt="Beacons installation demo image 1"
                    />
                  </div>
                </GridItem>
                <GridItem start={6} span={7}>
                  <div className={styles.imageContainer}>
                    <Image width={1200} height={1200} src="/image 93" alt="Beacons installation demo image 1" />
                  </div>
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Divider size="xxs" />
              <Grid>
                {/* <GridItem span={4} start={0}>
                <p className="fs-s h-text  p t-r bl">Overview</p>
              </GridItem> */}
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r ">
                    Five sculptural beacons representing climate, geology, biota, and human impact pulse with light and
                    low-frequency sound based on 11,000 years of deep-sea environmental change.
                  </p>
                </GridItem>
              </Grid>
              {/* <Divider size="s" /> */}
              <Grid>{/* <GridItem span={6} start={7}></GridItem> */}</Grid>
              {/* <Divider size="xs" /> */}
              <Grid>
                {" "}
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r ">
                    On a nearby screen, the sounds from the beacons are transmitted as visuals of the vibrational
                    frequencies.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="m" />
              <div className="img-b">
                <Grid>
                  <GridItem span={8} start={3}>
                    <Video src="chladni_example" />
                  </GridItem>
                </Grid>
              </div>
              <Divider size="m" />
              <Line />
              <Divider size="xxs" />

              <Grid>
                <GridItem span={1} start={0}>
                  {" "}
                  <p className="fs-s h-text  p t-r bl">RESEARCH</p>
                </GridItem>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-s b-h-text  p t-r bl"> The Deep Sea</p>
                  <p className="fs-sm h-text  p t-r ti bl ">
                    The deep sea constitutes Earth’s largest ecosystem, yet to date less than one percent of it has been
                    scientifically examined. At depths beyond one thousand meters, sunlight no longer penetrates,
                    temperatures fall close to freezing, and pressure rises to more than four hundred times that of the
                    surface. These conditions have preserved terrains that remain largely unchanged for millions of
                    years, offering both an archive of planetary history and a site of growing industrial interest.
                  </p>
                  <br />
                  <p className="fs-s b-h-text  p t-r bl">The Clarion-Clipperton Zone</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    The Clarion-Clipperton Zone (CCZ), a vast stretch of international waters between Hawaii and Mexico,
                    has become a central focus of industrial and political ambition. Across its seabed lie trillions of
                    polymetallic nodules, concentrations of copper, cobalt, manganese, and nickel that have developed
                    through natural processes over tens of millions of years. Today, companies and states are actively
                    pursuing licenses to access these deposits, positioning the CCZ as a key site in the debate over
                    deep-sea resource extraction.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Grid>
                <GridItem span={2} start={1}>
                  <Image src="/rock-tether" width={1200} height={1200} alt="Chladni example" />
                </GridItem>
                <GridItem span={4} start={3}>
                  <Image src="/ccz-zone2" width={800} height={600} alt="Chladni example" />
                </GridItem>
                <GridItem span={6} start={7}>
                  <Video src="/TESTINGEXPORT2" />
                </GridItem>
              </Grid>
              <Divider size="l" />
              <Grid>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-s b-h-text  p t-r bl">Biodiversity</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    Although long considered inhospitable, recent research has revealed that the Clarion-Clipperton Zone
                    sustains a remarkable biodiversity. Ninety-five percent of the species identified in this region are
                    new to science, many of them existing on timescales of thousands of years.
                  </p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    Such slow rhythms of growth render these organisms particularly vulnerable to disturbance. Proposed
                    mining operations risk generating sediment plumes, releasing trapped gases, and disrupting carbon
                    cycles, while scientific studies also highlight the deep sea’s vital role in oxygen production and
                    in maintaining planetary regulation.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Grid>
                <GridItem span={4} start={0}>
                  <Image src="/plume" width={1200} height={1200} alt="Biodiversity" />
                </GridItem>
                <GridItem span={8} start={5}>
                  <Video src="/ECO_CCZ" />
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Grid>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r ti bl">
                    To address these entanglements, Beacons: Signals From Below establishes an embodied connection to
                    the CCZ through sound and light. Over ten thousand years of seismic, hydroacoustic, and
                    bioluminescent data were sourced from scientific papers and international databases. More than
                    twenty-six ecological readings were translated into sonic frequencies and luminous pulses. These
                    were materialized in suspended sculptural forms inspired by deep-sea organisms and activated through
                    custom 3D-printed speakers.
                  </p>
                </GridItem>
                <GridItem span={5} start={8} spanMobile={12}>
                  <p className="fs-sm h-text  p t-r ti bl">
                    {" "}
                    Rather than representing the deep sea, the installation transmits its conditions as
                    signals—perceptible but not fully knowable. By making present an environment that is both vital and
                    endangered, Beacons: Signals From Below invites audiences to consider the implications of
                    extraction, and to experience the deep sea not as resource, but as a fragile and interconnected
                    world.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="m" />
              <Grid></Grid>
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

              {/* Appendix Images Grid */}
              <Grid height={"300px"}>
                <GridItem span={2}></GridItem>
                <GridItem span={2}>
                  <Image
                    width={1600}
                    height={1200}
                    src="/Spolia_Beam_DEMO2025_6"
                    alt="Beacons installation demo image 2"
                  />
                </GridItem>
                <GridItem span={2}>
                  <Image
                    width={1200}
                    height={1200}
                    src="/Beacons_Screen"
                    alt="Beacons screen display"
                    priority={false}
                  />
                </GridItem>
                <GridItem span={2}>
                  <Image
                    width={1200}
                    height={1200}
                    src="/Spolia_Beam_DEMO2025_1"
                    alt="Beacons installation demo image 3"
                    priority={false}
                  />
                </GridItem>
                <GridItem span={2}>
                  <Image
                    width={1200}
                    height={1200}
                    src="/Spolia_Beam_DEMO2025_2"
                    alt="Beacons installation demo image 2"
                    aspectRatio={100}
                  />
                </GridItem>
                <GridItem span={2}></GridItem>
                <GridItem span={2}></GridItem>
                <GridItem span={2}>
                  <Image
                    width={1200}
                    height={1200}
                    src="/DSCF4637"
                    alt="Beacons installation demo image 2"
                    priority={false}
                    aspectRatio={100}
                  />
                </GridItem>
                <GridItem span={2}>
                  <Image
                    width={1200}
                    height={1200}
                    src="/DSCF4685-2"
                    alt="Beacons installation demo image"
                    priority={false}
                    aspectRatio={100}
                  />
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
