import React from "react";
import { graphql } from "gatsby";
import { SEO } from "../components/seo";
import Layout2 from "../components/Layout2";
import GlossarySidebar from "../components/GlossarySidebar/GlossarySidebar";
import "../pages/glossary.css";
import "./glossaryTerm.css";

const GlossaryTerm = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <>
      <SEO
        title={frontmatter.seoTitle}
        description={frontmatter.seoDescription}
        pathname={`/glossary/${frontmatter.slug}`}
      />
      <div className="glossary-term-container" style={{ display: "flex" }}>
        <GlossarySidebar currentSlug={frontmatter.slug} />
        <article
          className="glossary-term"
          style={{
            margin: "0 auto",
            padding: "2rem",
            flex: 1,
            marginLeft: "200px", // Match sidebar width
          }}
        >
          <script type="application/ld+json">{JSON.stringify(frontmatter.schema)}</script>
          <h1>{frontmatter.term}</h1>
          <div className="glossary-term-content" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        term
        seoTitle
        seoDescription
        datePublished
        dateModified
        schema {
          type: _type
          mainEntity {
            type: _type
            name
            acceptedAnswer {
              type: _type
              text
            }
          }
        }
      }
    }
  }
`;

export default GlossaryTerm;
