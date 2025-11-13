import styles from "../page.module.css";
import studioStyles from "../studio/page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GridContainer, Grid, GridItem } from "../components/Grid";
import WorkPreviews from "../components/WorkPreviews3";
import Divider from "../components/Divider";
export default function WorkPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Divider size="s" />
        <GridContainer>
          {/* Header Section */}
          <Grid style={{ paddingBottom: "8rem" }}>
            <GridItem span={5}>
              <div className={studioStyles.section}>
                <h1 className={studioStyles.pageTitle}>
                  {" "}
                  Projects
                </h1>
              </div>
            </GridItem>
            <GridItem start={8} span={6}>
              <div className={studioStyles.section}>
                <h2 className={studioStyles.pageSubtitle}>
                  {" "}
                  <span>Working between disciplines,  </span> we turn research into physical, spatial, and digital outcomes.
                </h2>
              </div>
            </GridItem>
          </Grid>
          {/* Projects Table Header */}
          <Grid style={{ marginTop: "2rem" }}>
            <GridItem start={1} span={1} style={{ padding: "1rem 0", fontWeight: "bold" }}>
              Index
            </GridItem>
            <GridItem start={2} span={2} style={{ padding: "1rem 0", fontWeight: "bold" }}>
              Project
            </GridItem>
            <GridItem start={9} span={1} style={{ padding: "1rem 0", fontWeight: "bold" }}>
              Client
            </GridItem>
            <GridItem start={11} span={1} style={{ padding: "1rem 0", fontWeight: "bold" }}>
              Type
            </GridItem>
            <GridItem start={12} span={1} style={{ padding: "1rem 0", fontWeight: "bold" }}>
              Year
            </GridItem>
          </Grid>
          <WorkPreviews showAll={true} />
          {/* 
    
          {projects.map((project, index) => (
            <Grid key={index} style={{ borderBottom: "1px solid #000", paddingBottom: "4rem" }}>
              <GridItem span={2} style={{ padding: "1.5rem 0" }}>
                <strong>{project.name}</strong>
              </GridItem>
              <GridItem span={2} style={{ padding: "1.5rem 0" }}>
                {project.client}
              </GridItem>
              <GridItem span={2} style={{ padding: "1.5rem 0" }}>
                {project.venue}
              </GridItem>
              <GridItem span={2} style={{ padding: "1.5rem 0" }}>
                {project.type}
              </GridItem>
              <GridItem span={1} style={{ padding: "1.5rem 0" }}>
                {project.year}
              </GridItem>
              <GridItem span={3} style={{ padding: "1.5rem 0" }}>
                {project.purpose}
              </GridItem>

              <GridItem span={2} style={{ padding: "0 0 1.5rem 0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#ddd",
                    marginBottom: "0.5rem",
                  }}
                ></div>
              </GridItem>
              <GridItem span={2} style={{ padding: "0 0 1.5rem 0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#ddd",
                    marginBottom: "0.5rem",
                  }}
                ></div>
              </GridItem>
              <GridItem span={2} style={{ padding: "0 0 1.5rem 0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#ddd",
                    marginBottom: "0.5rem",
                  }}
                ></div>
              </GridItem>
              <GridItem span={2} style={{ padding: "0 0 1.5rem 0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "170px",
                    backgroundColor: "#ddd",
                    marginBottom: "0.5rem",
                  }}
                ></div>
              </GridItem>
              <GridItem span={1} style={{ padding: "0 0 1.5rem 0" }}>
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#ddd",
                    marginBottom: "0.5rem",
                  }}
                ></div>
              </GridItem>
              <GridItem span={3} style={{ padding: "0 0 1.5rem 0" }}>
                <p
                  style={{
                    margin: "0",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                    color: "#333",
                  }}
                >
                  {project.description}
                </p>
              </GridItem>
            </Grid>
          ))}{" "}
          */}
        </GridContainer>
      </main>
      <Footer />
    </div>
  );
}
