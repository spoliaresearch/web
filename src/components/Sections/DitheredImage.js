import React, { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';

const DitheredImage = () => {
  const [imageSource, setImageSource] = useState('dith');
  const data = useStaticQuery(graphql`
    query {
      dithered: file(relativePath: { eq: "dith.JPG" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      undithered: file(relativePath: { eq: "undith.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `);

  const ditheredImage = getImage(data.dithered);
  const unditheredImage = getImage(data.undithered);

  const handleClick = () => {
    setImageSource((prevState) => (prevState === 'dith' ? 'undith' : 'dith'));
  };

  return (
    <div className="img" onClick={handleClick}>
      {imageSource === 'dith' ? (
        <GatsbyImage placeholder='none' image={ditheredImage} alt="Dithered" />
      ) : (
        <GatsbyImage  image={unditheredImage} alt="Undithered" />
      )}
    </div>
  );
};

export default DitheredImage;
