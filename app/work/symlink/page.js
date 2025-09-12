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

export default function SymlinkPage() {
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
              <Divider size="m" />
              <div className={`${styles.stickyGrid} ${isHeaderVisible ? styles.headerVisible : ""}`}>
                <Grid>
                  <GridItem span={1} start={0}>
                    <Close />
                  </GridItem>
                  <GridItem span={1} start={3}>
                    <span className="fs-xxs t-text lh-0 meta"> INDEX </span>
                    <span className="fs-xs h-text meta">1.2.3</span>
                  </GridItem>

                  <GridItem span={2} start={5}>
                    <span className="fs-xxs t-text lh-0 meta"> TYPE </span>
                    <span className="fs-xs h-text meta">Experience</span>
                  </GridItem>
                  <GridItem span={1} start={8}>
                    <span className="fs-xxs t-text lh-0 meta"> NAME</span>
                    <span className="fs-xs h-text meta"> SYMLINK</span>
                  </GridItem>
                  <GridItem span={1} start={10}>
                    <span className="fs-xxs t-text lh-0 meta"> YEAR</span>
                    <span className="fs-xs h-text meta"> 2023</span>
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
                    src="/symlink_exhibit"
                    alt="Symlink installation at Design in the Age of AI exhibition"
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
                <GridItem span={2} start={1}>
                  <p className="fs-xs b-h-text lh-0 meta ">Exhibitions</p>
                  <p className="fs-xs h-text meta">DESIGN IN THE AGE OF AI </p>

                  <p className="fs-xs h-text meta">SPACE10, COPENHAGEN</p>

                  <p className="fs-xs h-text meta ">Summer 2023</p>

                  <p className="fs-xs h-text meta">COPENHAGEN ARCHITECTURE FESTIVAL</p>

                  <p className="fs-xs h-text meta">3 DAYS OF DESIGN FESTIVAL</p>

                  <p className="fs-xs h-text meta">WORLD CONGRESS OF ARCHITECTS</p>
                </GridItem>
                <GridItem span={2} start={3}>
                  <p className="fs-xs b-h-text lh-0 meta ">Location</p>
                  <p className="fs-xs  h-text meta">
                    Sintra, Portugal <span className="fs-xxs  h-text meta up">Case Study</span>
                  </p>

                  <p className="fs-xs  h-text meta ">
                    UNESCO World Heritage Site <span className="fs-xxs  h-text meta up">Context</span>
                  </p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r bl">
                    Symlink is a citizen science project that uses AI to make complex environmental information easy to
                    understand and act on, helping communities respond directly to local climate challenges.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    From sensors in neighbors' gardens to patterns of global climate change, Symlink interprets
                    real-time changes in the environment and translates them into simple, practical ideas that citizens
                    can act on.
                  </p>
                  <p className="fs-sm h-text  p t-r bl">
                    The system empowers people to make small, meaningful improvements to their surroundings—from
                    installing smart irrigation systems during drought conditions to planting pollinator-friendly plants
                    when local pollinator activity is low.
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
                <GridItem span={2} start={0}>
                  <p className="fs-xxs h-text cap bl ref ">
                    1. Big Data in Earth system science and progress towards a digital twin. Li X, Feng M, Ran Y, Su Y,
                    Liu F, Huang C, Shen H, Xiao Q, Su J, Yuan S and Guo H (2023)
                  </p>
                  <p className="fs-xxs h-text cap bl ref">
                    2. Cybernetics or Control and Communication in the Animal and the Machine. Wiener N (2019)
                  </p>
                  <p className="fs-xxs h-text cap bl ref">
                    3. Regenerative design and development: current theory and practice. Cole RJ (2012)
                  </p>
                  <p className="fs-xxs h-text cap bl ref">
                    4. AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors. Chen W, Su
                    Y, Zuo J, Yang C, Yuan C, Chan C-M, Yu H, Lu Y, Hung Y-H, Qian C, Qin Y, Cong X, Xie R, Liu Z, Sun M
                    and Zhou J (2023)
                  </p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r ">
                    Operated by a large language model, the system encompasses ecosystem data collection, synthesis, and
                    recommendation, materializing through data sensors and installations that mimic the native flora and
                    architectural vernacular of the region. Building upon digital twin concepts<sup>1</sup>, cybernetic
                    systems theory<sup>2</sup>, and regenerative design principles<sup>3</sup>, the framework functions
                    as a sequential multi-agent generative system<sup>4</sup>.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Grid>{/* <GridItem span={6} start={7}></GridItem> */}</Grid>
              <Divider size="xs" />
              <Grid>
                {" "}
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r ">
                    The pilot prototype used Sintra, Portugal as a case study, utilizing mock data of 45 environmental
                    variables specific to the region to demonstrate the system's potential for responsive community
                    design.
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
                <GridItem span={2} start={0}>
                  {" "}
                  <p className="fs-s h-text  p t-r bl">RESEARCH</p>
                  <p className="fs-xxs h-text cap bl ref">
                    5. Accountability and data-driven urban climate governance. Hughes S, Giest S and Tozer L (2020)
                  </p>
                  <p className="fs-xxs h-text cap bl ref">
                    6. Grassroots innovations for sustainable development: Towards a new research and policy agenda.
                    Seyfang G and Smith A (2007)
                  </p>
                  <p className="fs-xxs h-text cap bl ref">
                    7. Engagement in science through citizen science: Moving beyond data collection. Phillips TB,
                    Ballard HL, Lewenstein BV and Bonney R (2019)
                  </p>
                  <p className="fs-xxs h-text cap bl ref">
                    8. More Is Less: Signal Processing and the Data Deluge. Baraniuk RG (2011)
                  </p>
                </GridItem>

                <GridItem span={5} start={8}>
                  <p className="fs-s b-h-text  p t-r bl">Climate Data Accessibility</p>
                  <p className="fs-sm h-text  p t-r ti bl ">
                    Climate change demands intervention at local scales, yet citizens face barriers to participation due
                    to climate data fragmentation and analytical complexity<sup>5</sup>. Despite the accessibility of
                    environmental data collection hardware and grassroots interest in data-driven climate action
                    <sup>6,7</sup>, the tools and expertise needed to process this volume of data remain concentrated in
                    institutional research and corporate entities<sup>8</sup>.
                  </p>
                  <br />
                  <p className="fs-s b-h-text  p t-r bl">AI as Environmental Mediator</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    Advances in large language models and generative AI offer new potential to process complex
                    environmental data and help visualize implementation outcomes of targeted climate action for local
                    communities. This technology can serve as a bridge between scientific data and community action,
                    translating ecological patterns into practical design recommendations.
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
                <GridItem span={2} start={0}>
                  <p className="fs-xxs h-text cap bl ref">
                    9. Rural-Urban Governance Arrangements and Planning Instruments: Municipal Master Plan of Sintra.
                    Partidário M do R (2018)
                  </p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-s b-h-text  p t-r bl">Sintra as Living Laboratory</p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    In Sintra, forest and buildings blend as castles and towns intersperse the vegetative landscape,
                    with varying ecological communities in close proximity. Facing environmental challenges such as
                    water management, coastal erosion, and desertification<sup>9</sup>, Sintra is ideal for a
                    data-driven responsive design approach.
                  </p>
                  <p className="fs-sm h-text  p t-r ti bl">
                    The Symlink system was trained on Sintra's unique population, climate, and ecological issues,
                    prioritizing the detection of environmental risks in the dataset. For example, due to
                    desertification risk, the system proactively recommended action to address declining soil moisture
                    percentages.
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
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r ti bl">
                    Quantifying changes within complex ecosystems can be challenging. Utilizing data as a mediator
                    between human and non-human communities enables adaptations to occur automatically, such as
                    architectural facade modifications, irrigation pathway changes, or energy-sharing dispersal. For
                    manual behavioral changes, the AI suggestions convert multivariate data into clear directions for
                    individuals or communities.
                  </p>
                </GridItem>
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r ti bl">
                    Emphasizing non-human data points like plant-pollinator interactions and carbon sequestration, this
                    project enables local ecology to influence community decisions through data accessibility. The
                    system's physical design mimics its surroundings—sensors resembling Sea Fig plants collect
                    population data, while Azulejo tile sensors gather microclimate data and visualize changes like
                    declining air quality through altered tile color or pattern.
                  </p>
                </GridItem>
              </Grid>
              <Divider size="s" />
              <Grid>
                <GridItem span={5} start={8}>
                  <p className="fs-sm h-text  p t-r ti bl">
                    This vision enables individuals to improve their communities by concentrating on mediating the
                    effects of climate change in their environments, which also enhances human habitation. Rather than
                    offering a one-size-fits-all solution, Symlink adapts to different communities and their specific
                    needs, serving as a foundation for designing unique, context-specific datascapes that reflect the
                    distinct vernacular and needs of a given environment.
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
