import React from 'react';
import './HeaderText.css';
import FontSettingsToggle from '../FontSettingsToggle';
import ThemeToggle from '../ThemeToggle';
const HeaderText = React.forwardRef((props, ref) => {
  return <div className="HeaderText" ref={ref} style={props.style}>


        <div className="HeaderGrid">
           
    <div className="SidebarHeader">   
        <div className='items'><span>Sort</span></div> 
         <FontSettingsToggle />
         <ThemeToggle/>
        <hr/></div>
    <div className="ProjectHeader">   <div><span id="my-anchor">Welcome to our corner of the internet</span></div>
        <hr/></div>
        </div>
        </div>
        });

export default HeaderText;
