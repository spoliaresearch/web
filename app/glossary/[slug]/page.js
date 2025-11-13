import { notFound } from "next/navigation";
import { getAllGlossaryTerms, getGlossaryTerm, generateTermContent, getReadingTime } from "../../../lib/glossary-data";
import Header from "../../components/Header";
import { GridContainer, Grid, GridItem } from "../../components/Grid";
import Link from "next/link";
import CustomImage from "../../components/Image";
import TableOfContents from "../../components/TableOfContents";
import styles from "./page.module.css";
import Line from "../../components/Line";
import Divider from "../../components/Divider";
import { GlossaryText, GlossaryLink } from "../../components/GlossaryProvider";
import Footer from "../../components/Footer";
import glossaryMentions from "../../../lib/glossary-mentions.json";

// Utility function to get all glossary terms for static generation
export function generateStaticParams() {
  return getAllGlossaryTerms().map((term) => ({ slug: term.slug }));
}

export function generateMetadata({ params }) {
  const term = getGlossaryTerm(params.slug);

  if (!term) {
    return {
      title: "Term Not Found",
    };
  }

  return {
    title: term.seo.title,
    description: term.seo.description,
    keywords: term.seo.keywords?.join(", "),
    openGraph: {
      title: term.seo.title,
      description: term.seo.description,
      type: "article",
      modifiedTime: term.dateModified,
      images: term.content?.images?.map((img) => ({
        url: img.src,
        alt: img.alt,
      })),
    },
    alternates: {
      canonical: `/glossary/${term.slug}`,
    },
  };
}

// Breadcrumbs Component
function Breadcrumbs({ breadcrumbs }) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
        {breadcrumbs.map((crumb, index) => (
          <li key={index}>
            {crumb.current ? (
              <span aria-current="page" className="b-text fs-s">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.url} className="b-text fs-s">
                {crumb.label}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && <span className={styles.separator}>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Content Section Component with proper heading hierarchy
function ContentSection({ section, level = 2, excludeTerms = [] }) {
  const HeadingTag = `h${level}`;

  return (
    <section id={section.id} className={styles.contentSection}>
      <HeadingTag className={level === 2 ? "h-text fs-m" : "b-h-text fs-s"}>{section.heading}</HeadingTag>
      <div className={`${styles.sectionContent} b-text fs-s`}>
        <GlossaryText excludeTerms={excludeTerms}>{convertMarkdownLinks(section.content)}</GlossaryText>
      </div>
      {section.subsections?.map((subsection, index) => (
        <ContentSection key={index} section={subsection} level={level + 1} excludeTerms={excludeTerms} />
      ))}
    </section>
  );
}

// Convert markdown-style links to HTML
function convertMarkdownLinks(content) {
  // Split content by markdown links to preserve structure for GlossaryText
  const parts = content.split(/(\[([^\]]+)\]\(([^)]+)\))/);
  return parts.map((part, index) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      return (
        <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

// Related Terms Component
function RelatedTerms({ relatedTerms, excludeTerms = [] }) {
  if (!relatedTerms || relatedTerms.length === 0) return null;

  return (
    <section className={styles.relatedTerms}>
      <h2 className="b-h-text fs-s">See also</h2>
      <ul style={{ marginBottom: "2rem" }}>
        {relatedTerms.map((term) => (
          <li key={term.slug}>
            <span style={{ position: "relative" }}>
              <GlossaryLink slug={term.slug}>{term.term}</GlossaryLink>
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  left: "0",
                  width: "100%",
                  height: "0",
                  borderBottom: "1.5px dotted #85827e",
                }}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Referenced On Component
function ReferencedOn({ slug }) {
  const pages = glossaryMentions[slug];
  
  if (!pages || pages.length === 0) return null;

  // Map page paths to readable names
  const pageNames = {
    "/": "Home",
    "/work/pixelframe": "Pixelframe",
    "/research/material-intelligence": "Material Intelligence",
  };

  return (
    <p className="b-text fs-s" style={{ marginTop: "0.5rem" }}>
      Referenced on{" "}
      {pages.map((pagePath, index) => (
        <span key={pagePath}>
          <Link href={pagePath} className="b-text fs-s">
            {pageNames[pagePath] || pagePath}
          </Link>
          {index < pages.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

export default function GlossaryTermPage({ params }) {
  const termData = generateTermContent(params.slug);
  const readingTime = getReadingTime(params.slug);
  const relatedTerms = termData?.relatedTerms?.map((slug) => getGlossaryTerm(slug)).filter(Boolean);

  if (!termData) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termData.structuredData) }}
      />
      <Header />
      <Divider size="s" mobileSize="l" />
      <GridContainer>
        <Grid>
          <GridItem start={0} span={5}>
            {/* Header section - above grid for SEO */}
            <div className={styles.glossaryHeader}>
              <header>
                <h1 className="fs-l t-text  ">{termData.term}</h1>
              </header>
            </div>
          </GridItem>
          <GridItem start={6} span={5}>
            {" "}
            <Breadcrumbs breadcrumbs={termData.breadcrumbs} />
            <ReferencedOn slug={params.slug} />
          </GridItem>
          <GridItem start={9} span={3}></GridItem>
          <GridItem start={0} span={12}>
            {" "}
            <Line />
          </GridItem>
          <GridItem start={6} span={6}>
            <div className={`${styles.metadata} c`}>
              {termData.tags && (
                <div className={styles.tags}>
                  {termData.tags.map((tag) => (
                    <span key={tag} className={`${styles.tag} b-text`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </GridItem>
          <Divider size="m" />

          {/* Table of Contents positioned on the left - columns 0-3 */}
          <GridItem start={0} span={2}>
            <TableOfContents tableOfContents={termData.tableOfContents} readingTime={readingTime} />
          </GridItem>

          {/* Main content area - columns 6-12 (span 6) */}
          <GridItem start={6} span={6}>
            <article className={styles["glossary-content"]}>
              <main>
                <section className={styles.leadSection}>
                  {/* {termData.etymology && <h2 className={`${styles.etymology} b-text fs-s`}>{termData.etymology}</h2>} */}
                  <p className="h-text fs-m">Overview</p>
                  <GlossaryText className={`${styles.definition} b-text fs-s`} excludeTerms={[params.slug]}>
                    {termData.fullDefinition}
                  </GlossaryText>
                </section>
                {termData.content?.images && termData.content.images.length > 0 && (
                  <section className={styles.imageSection}>
                    <CustomImage
                      src={termData.content.images[0].src}
                      alt={termData.content.images[0].alt}
                      className={styles.termImage}
                      priority={false}
                      rootMargin="200px"
                    />
                    {termData.content.images[0].caption && (
                      <GlossaryText excludeTerms={[params.slug]}>
                        <p className={`${styles.imageCaption} c-text fs-xs`}>{termData.content.images[0].caption}</p>
                      </GlossaryText>
                    )}
                  </section>
                )}
                {termData.examples && termData.examples.length > 0 && (
                  <section id="examples">
                    <h2 className="b-h-text fs-s">Examples</h2>
                    <ul className="b-text fs-s">
                      {termData.examples.map((example, index) => (
                        <li key={index}>
                          <GlossaryText excludeTerms={[params.slug]}>{example}</GlossaryText>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                <Divider size="s" />
                {termData.content?.sections?.map((section, index) => (
                  <ContentSection key={index} section={section} excludeTerms={[params.slug]} />
                ))}

                <RelatedTerms relatedTerms={relatedTerms} excludeTerms={[params.slug]} />

                {termData.content?.furtherReading && termData.content.furtherReading.length > 0 && (
                  <section id="further-reading">
                    <h2 className="b-h-text fs-s">Further Reading</h2>
                    <ul className={`${styles.furtherReading} b-text fs-s`}>
                      {termData.content.furtherReading.map((item, index) => (
                        <li key={index}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="b-text fs-s">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </main>
            </article>
          </GridItem>
        </Grid>
        <Divider size="s" />
        <h6 className="fs-xxl xl-text" style={{ textAlign: "center" }}>
          {" "}
          <Link href="/glossary">Back to Glossary</Link>
        </h6>
        <Divider size="m" />
      </GridContainer>
      <Footer />
    </>
  );
}
