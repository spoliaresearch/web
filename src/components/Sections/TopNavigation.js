import React from 'react';
import './TopNavigation.css'
const TopNavigation = React.forwardRef((props, ref) => {
  return <nav ref={ref}  style={props.style}>
    <hr/> 
    <div className='nav'><div className="logo"><span>SPOLIA</span></div>
    <div>
    <span><a>Information</a></span>
    <span><a>Contact</a></span>
    </div>
    </div></nav>;
});

export default TopNavigation;
