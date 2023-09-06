import React from 'react';
import Link from 'gatsby-link';
import './TopNavigation.css'
const TopNavigation = React.forwardRef((props, ref) => {
  return <nav ref={ref}  style={props.style}>
    <hr/> 
    <div className='nav'><Link to="/" className="logo"><span>SPOLIA</span></Link>
    <div><span>DESIGN & TECHNOLOGY</span></div>
    <div>
    <span>  <a href="mailto:hello@spolialab.com">CONTACT</a></span>
    </div>
    </div></nav>;
});

export default TopNavigation;
