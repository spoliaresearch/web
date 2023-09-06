import {Link, graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React, {useEffect} from "react"
import '../templates/page.css'
const IndexPage = ({
  data: {
    page: {
      name,
      cover,
      childMarkdownRemark: {html},
    comments
    },
  },
}) => {

  return (
    <div class="ProjectContent">
  
      {/* <h1>{name}</h1> */}
    
      <div className="mainContent">
  
  <div dangerouslySetInnerHTML={{__html: html}} />

      </div>

      <div className="context">  {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
         
          </div>
        ))}</div>
          
      {/*
        To add a cover:
        Add an image in your Google Doc first page header
        https://support.google.com/docs/answer/86629
      */}
      {/* {cover && <GatsbyImage image={getImage(cover.image)} />}
 */}
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPage {
    page: googleDocs(name: {eq: "Welcome to Spolia Lab"}) {
      cover {
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      name
      comments {
        content

        }
      childMarkdownRemark {
        html
      }
    }
  }
`