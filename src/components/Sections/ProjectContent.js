import React, {useState} from 'react';
import './ProjectContent.css';
import DitheredImage from './DitheredImage';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const ProjectContent = React.forwardRef((props, ref) => {
    const data = useStaticQuery(graphql`
    query {
      googleDocs(id: { eq: "1uSJwMe4-U3TSu87ApzVJPh-EzZE-TaGS0aynYqW_Zhk" }) {
        comments {
          content
          replies {
            content
          }
        }
        markdown
      }
    }
  `);

    const documentData = data.googleDocs;
  const { markdown, comments } = documentData;
    const [imageSource, setImageSource] = useState('dith');
  const [hoverText, setHoverText] = useState('');

  const handleMouseEnter = () => {
    setHoverText('Image size: 200KB'); // Replace with the actual size
  };

  const handleMouseLeave = () => {
    setHoverText('');
  };

  const handleClick = () => {
    if (imageSource === 'dith') {
      setImageSource('undith'); // Replace with the name of the second image
    } else {
      setImageSource('dith');
    }
  };
 return (
    <div className="ProjectContent" ref={ref} style={props.style}>
      <div className="mainContent">
           <MDXRenderer>{markdown}</MDXRenderer>
        {/* Render other content sections */}
      </div>

    

      <div className="context">
{comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            {comment.replies.map(reply => (
              <p key={reply.id}>{reply.content}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default ProjectContent;
