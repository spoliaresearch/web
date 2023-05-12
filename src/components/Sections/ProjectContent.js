import React, {useState} from 'react';
import './ProjectContent.css';
import { StaticImage } from 'gatsby-plugin-image';
const ProjectContent = React.forwardRef((props, ref) => {

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
      
    <p>Welcome to Spolia Lab, our dedicated space on the internet for design research and open collaboration. We are delighted to have you join us as we explore the fascinating intersections of innovation, technology, and sustainability.</p>
    <p>At Spolia Lab, we draw inspiration from the concept of architectural spolia, a practice of repurposing materials from older buildings for new constructions. This approach encourages lateral thinking and helps us reimagine the ways we engage with technology. To learn more about the connection between spolia and technology, we invite you to read our comprehensive post <a href="#link">here</a>.</p>
    <p>Our website is designed with user-friendliness in mind, making it easy for you to navigate and engage with our content. We share our projects, essays, thoughts, and other resources in a format similar to an email inbox. To access these resources, simply refer to the left side of the screen, where you will find a sortable, filterable, and searchable list of content.</p>
    <p>To stay updated on our latest work, we encourage you to sign up for our newsletter, which will deliver fresh insights directly to your inbox. We have also integrated accessibility settings within the top-left settings icon to ensure a comfortable reading experience for all users. If you prefer, you can add our content feed to your RSS reader using <a href="#rss">this link</a>.</p>
    <p>In line with our commitment to sustainability, we have chosen to dither images on our website to reduce page load times and minimize energy usage. To view an image in high resolution, simply click on it, and the hi-res version will load. Give it a try with the sample image below:</p>
    
    
    <p>Moreover, our site is built as a static site to limit resource consumption by reducing the need for data transfers to and from servers.</p>
    <p>We are excited to welcome you to the Spolia Lab community as we delve deeper into design research and sustainable practices. Join us on this journey as we unlock the full potential of technological spolia and work together to create a brighter future.</p>
 </div>

 <div className="context">
  <p>Spolia (Latin: 'spoils') is repurposed building stone for new construction or decorative sculpture reused in new monuments. </p>
       <div  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
        {imageSource === 'dith' ? (
          <StaticImage src="../../images/dith.JPG" alt="Dith" />
        ) : (
          <StaticImage src="../../images/undith.jpg" alt="Second Image" /> // Replace with the correct path and alt text
        )}
      </div>
      <div>{hoverText}</div>
 </div>
 </div>
  );
});

export default ProjectContent;
