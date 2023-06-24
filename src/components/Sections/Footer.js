import React from 'react';
import './Footer.css'
const Footer =  React.forwardRef((props, ref) => {
  return (
    <footer className="Footer" ref={ref} style={props.style}>
      <div className="text">
      Beep us. Reach us. <a>hello@spolialab.com</a>.  Propose a design intervention, share a thought, or just say hi.
      <p>
        {/* Follow us on Instagram <a>@spolialab</a>. */}
        <br />
        Copyright © 2023 - All rights reserved.
      </p>
      </div>
    </footer>
  );
});

export default Footer;
