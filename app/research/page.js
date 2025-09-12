import styles from "../page.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GridContainer, Grid, GridItem } from "../components/Grid";
import Link from "next/link";

const research = [
  {
    slug: "material-intelligence",
    title: "Material Intelligence",
    subtitle: "Essay 001",
    description: "As we face larger concerns from our neighbors, now is the time to ask the needs of the many.",
    year: "2024",
    type: "Research Essay",
    category: "Material Studies",
  },
];

export default function ResearchPage() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <GridContainer>
          {/* Header Section */}
          <Grid style={{ paddingBottom: "4rem" }}>
            <GridItem span={8} style={{ paddingTop: "4rem", paddingBottom: "0rem" }}>
              <h1
                style={{
                  fontSize: "4rem",
                  fontWeight: "normal",
                  margin: "0",
                  lineHeight: "1.1",
                }}
              >
                Research
              </h1>
            </GridItem>
            <GridItem
              span={4}
              style={{
                paddingTop: "4rem",
                paddingBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "1rem",
                  lineHeight: "1.4",
                }}
              >
                Discover our ongoing research initiatives and architectural investigations.
              </p>
            </GridItem>
          </Grid>

          {/* Research List */}
          {research.map((item, index) => (
            <Grid
              key={item.slug}
              style={{
                borderBottom: "1px solid var(--color-border, #000)",
                paddingBottom: "2rem",
                marginBottom: "2rem",
              }}
            >
              <GridItem span={8}>
                <Link href={`/research/${item.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h2 style={{ fontSize: "2rem", margin: "0 0 0.5rem 0", fontWeight: "normal" }}>{item.title}</h2>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      margin: "0 0 1rem 0",
                      color: "var(--color-text-secondary, #666)",
                      fontWeight: "normal",
                    }}
                  >
                    {item.subtitle}
                  </h3>
                  <p style={{ margin: "0", lineHeight: "1.6" }}>{item.description}</p>
                </Link>
              </GridItem>
              <GridItem span={4} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary, #666)" }}>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Year:</strong> {item.year}
                  </p>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Type:</strong> {item.type}
                  </p>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <Link
                    href={`/research/${item.slug}`}
                    style={{
                      color: "var(--color-text)",
                      textDecoration: "underline",
                      marginTop: "1rem",
                      display: "inline-block",
                    }}
                  >
                    Read More →
                  </Link>
                </div>
              </GridItem>
            </Grid>
          ))}
        </GridContainer>
      </main>
      <Footer />
    </div>
  );
}
