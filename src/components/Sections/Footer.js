import React, { useState, useEffect, forwardRef } from 'react';
import './Footer.css';

const Footer = forwardRef((props, ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [time, setTime] = useState(new Date());
  const [OS, setOS] = useState('');

  // Inside your component
// useEffect(() => {
//   // Ensure this is placed outside the useEffect but inside your component
//   const updateDimensions = () => {
//     setDimensions({ width: window?.innerWidth, height: window?.innerHeight });
//   };

//   if (typeof window !== 'undefined') {
//     // Browser Dimensions
//     window.addEventListener('resize', updateDimensions);
//     updateDimensions(); // Set initial dimensions

//     // Operating System
//     setOS(window.navigator.platform);
//   }

//   // Local Time
//   const timerID = setInterval(() => setTime(new Date()), 1000);

//   return () => {
//     if (typeof window !== 'undefined') {
//       window.removeEventListener('resize', updateDimensions);
//     }
//     clearInterval(timerID);
//   };
// }, []);

  return (
    <footer className="Footer" ref={ref} style={props.style}>
      <div className="text">
        Beep us. Reach us. <a>hello@spolialab.com</a>. Propose a design intervention, share a thought, or just say hi.
      </div>
      <div className='smalls'>
        <span>Copyright © 2024 - All rights reserved.</span>
        <span> {dimensions.width}x{dimensions.height}</span>
        <span> {time.toLocaleTimeString()}</span>
        <span>{OS}</span>
      </div>

      
    </footer>
  );
});

export default Footer;
