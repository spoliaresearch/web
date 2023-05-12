import React from 'react';
import './HeaderText.css';
import FontSettingsToggle from '../FontSettingsToggle';
const HeaderText = React.forwardRef((props, ref) => {
  return <div className="HeaderText" ref={ref} style={props.style}>


        <div className="HeaderGrid">
           
    <div className="SidebarHeader">   
        <div className='items'>Sort</div> 
         <FontSettingsToggle />
        <hr/></div>
    <div className="ProjectHeader">   <div>Welcome to our corner of the internet</div>
        <hr/></div>
        </div>
        </div>
        });

export default HeaderText;
