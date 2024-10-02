import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import "../components/Layout2.css";
import "./page.css";
const TemplatePage = ({
  data: {
    page: {
      name,
      cover,
      childMarkdownRemark: { html },
      comments,
    },
  },
}) => {
  useEffect(() => {
    const element = document.getElementById("my-anchor-2");
    element.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div class="ProjectContent">
      {/* <h1>{name}</h1> */}

      <div className="mainContent">{/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}</div>

      <div className="context">
        {" "}
        {/* {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
             {comment.replies.map(reply => (
              <p key={reply.id}>{reply.content}</p>
            ))} 
          </div>
        ))} */}
      </div>

      {/*
        To add a cover:
        Add an image in your Google Doc first page header
        https://support.google.com/docs/answer/86629
      */}
      {/* {cover && <GatsbyImage image={getImage(cover.image)} />}
       */}
    </div>
  );
};

export default TemplatePage;

export const pageQuery = graphql`
  query Page($path: String!) {
    page: googleDocs(slug: { eq: $path }) {
      cover {
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      name
      childMarkdownRemark {
        html
      }
    }
  }
`;
// below name in pageQuery
// comments {
//   content
//   }
