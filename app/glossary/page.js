import Header from "../components/Header";
import Footer from "../components/Footer";
import { GridContainer, Grid, GridItem } from "../components/Grid";
import Link from "next/link";
import { getAllGlossaryTerms } from "../../lib/glossary-data";
import styles from "./page.module.css";
import Line from "../components/Line";
export async function generateMetadata() {
  const terms = getAllGlossaryTerms();

  return {
    title: "Spolia - Glossary",
    description: `Comprehensive glossary of ${terms.length} key terms in design, technology, and sustainability. Explore definitions, examples, and connections between concepts.`,
    keywords:
      "glossary, design terms, technology definitions, sustainability concepts, spolia, architectural terminology",
    openGraph: {
      title: "Spolia - Glossary",
      description: `Comprehensive glossary of ${terms.length} key terms in design, technology, and sustainability.`,
      type: "website",
    },
    alternates: {
      canonical: "/glossary",
    },
  };
}

export default function GlossaryPage() {
  const terms = getAllGlossaryTerms();

  // JSON-LD structured data for the glossary page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Spolia Design Glossary",
    description: "A comprehensive glossary of key terms and concepts in design, technology, and sustainability",
    numberOfItems: terms.length,
    itemListElement: terms.map((term, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DefinedTerm",
        name: term.term,
        description: term.shortDefinition,
        url: `/glossary/${term.slug}`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "Spolia Design Glossary",
          url: "/glossary",
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Header />
      <GridContainer>
        <Grid>
          <GridItem start={0} span={12}>
            <h1 className="fs-m h-text">GLOSSARY</h1>
            <Line />
            <div className={styles["terms-list"]}>
              {terms.map((term) => (
                <div key={term.slug} className={styles["term-item"]}>
                  <Link href={`/glossary/${term.slug}`}>
                    <h3 className=" fs-m t-text">{term.term}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </GridItem>
        </Grid>
      </GridContainer>
      <Footer />
    </>
  );
}
