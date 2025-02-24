import React from "react";
import { graphql, Link } from "gatsby";
import { SEO } from "../components/seo";
import { DissolveImage } from "../components/DissolveImage";
import "./glossary.css";

const GlossaryPage = ({ data }) => {
  if (!data || !data.allMarkdownRemark || !data.allMarkdownRemark.nodes) {
    return (
      <>
        <div className="glossary-loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  const terms = data.allMarkdownRemark.nodes.sort((a, b) => a.frontmatter.term.localeCompare(b.frontmatter.term));

  // Group terms by first letter
  const groupedTerms = terms.reduce((acc, term) => {
    const firstLetter = term.frontmatter.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});

  return (
    <div style={{ width: "100vw" }}>
      <SEO
        title="Glossary | Terms and Concepts"
        description="Explore our comprehensive glossary of key terms and concepts in design, technology, and sustainability."
        pathname="/glossary"
      />
      <div className="glossary-container">
        <div className="glossary-header">
          <h1 className="glossary-title">LEXICON </h1>
        </div>
        <div className="terms-list">
          {Object.entries(groupedTerms).map(([letter, letterTerms]) => (
            <div key={letter} className="letter-group">
              {letterTerms.map((node) => (
                <div key={node.frontmatter.slug} className="term-container">
                  <Link to={`/glossary/${node.frontmatter.slug}`} className="term-link">
                    <div className="term-title nav-link">{node.frontmatter.term.toUpperCase()}</div>
                  </Link>
                  <hr className="term-divider" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query GlossaryTermsQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/glossary/" } }) {
      nodes {
        frontmatter {
          slug
          term
        }
      }
    }
  }
`;

export default GlossaryPage;
