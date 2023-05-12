import React, { useEffect, useState } from 'react';
import './Button.css';
// import HeaderAnim from "../components/HeaderAnim";
import Layout from "../components/Layout";
const pageStyles = {
  color: "#232129",
  padding: 0,
  zIndex: 10,
  maxWidth: '100vw',
  height: '100vh',
  backgroundColor: "white",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}



// markup
const IndexPage = () => {
      const [isGridActive, setGridActive] = React.useState(true);
  const [drawing, setDrawing] = React.useState(false);
  const [gridState, setGridState] = useState(true);

  const handleGridStateChange = (newState) => {
    setGridState(newState);
  };

   const handleGridActiveChange = (newState) => {
    setGridActive(newState);
  };
  const toggleDrawing = () => {
  ;
  };
  return (
    <Layout>
 <title>Spolia Lab</title>
    <main style={pageStyles}>

     
                {/* <HeaderAnim   loading={gridState} setLoading={handleGridStateChange}  setClicked={handleGridActiveChange} clicked={isGridActive}/> */}
<h2 className='text'>Spolia is an indie design research lab.<br/>
We build mindful & creative technology inspired by the past.</h2>
      {/* <CanvasGrid clicked={clicked} ></CanvasGrid> */}
          { <>
      <div className="text" style={ {  pointerEvents:isGridActive &&' none'}}>
        
{/* Spolia is a design-research lab building creative technologies. <br/>
We design products with startups and help in their implementation.  <br/>
Sometimes, we build cool things ourselves too.  <br/>
 <br/>
Our mindful time-management app, <a href='https://apps.apple.com/us/app/hone-one-thing-at-a-time/id1624789090?mt=12' target="_blank"><span>Hone</span></a>, is now in public release on the Mac App Store. <br/>

If you want to chat about working with us, or want to join our design collaborative,  <br/>
contact us at <a href="mailto:hello@spolialab.com">hello@spolialab.com</a>. <br/> <br/>
<span className="noMobile">
If you just want something fun to do on this {new Date().toLocaleString('en-us', {  weekday: 'long' })},  <br/>
you’re welcome to <span  onClick={() => setGridActive(!isGridActive)} className="draw"> {!isGridActive ? "draw" : "stop drawing"}</span>  over this website.
  
</span> */}

<span className="btLeft"> ⛘</span>
<span className="btRight"> Spolia <br/> Lab</span>

      </div>
</>}

     
    
    </main>
    </Layout>
  )
}

export default IndexPage
