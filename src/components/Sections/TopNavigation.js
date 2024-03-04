import React from 'react';
import Link from 'gatsby-link';
import './TopNavigation.css'
const TopNavigation = React.forwardRef((props, ref) => {
  return <nav ref={ref}  style={props.style}>
    <hr/> 
    <div className='nav'><Link to="/" className="logo"><span>SPOLIA</span></Link>
    <div className='nav-middle'><span>DESIGN & TECHNOLOGY</span></div>
    <div>
      {/* need more work first */}
        {/* <Link to="/work" className="nav-link"><span>INDEX</span></Link> */}
         {/* <Link to="/information" className="nav-link"><span>OFFICE</span></Link> */}
        
    <span>  <a className='nav-link' href="mailto:hello@spolialab.com">CONTACT</a></span>
    </div>
    </div></nav>;
});

export default TopNavigation;
