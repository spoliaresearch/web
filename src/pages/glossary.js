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

  return (
    <div>
      <SEO
        title="Glossary | Terms and Concepts"
        description="Explore our comprehensive glossary of key terms and concepts in design, technology, and sustainability."
        pathname="/glossary"
      />
      <div className="glossary-container">
        <div className="glossary-header">
          <h1 className="glossary-title">Glossary </h1>
        </div>
        <div className="terms-list">
          {terms.map((node) => (
            <div key={node.frontmatter.slug} className="term-container ">
              <Link to={`/glossary/${node.frontmatter.slug}`} className="term-link">
                <div className="term-title ">{node.frontmatter.term}</div>
              </Link>
              {/* <hr className="term-divider" /> */}
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
