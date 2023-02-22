import * as React from "react"
import CanvasGrid from "../components/CanvasGrid"
import './Button.css';
const pageStyles = {
  color: "#232129",
  padding: 96,
  maxWidth: '100vw',
  height: '100vh',
  backgroundColor: "white",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}



// markup
const IndexPage = () => {
    const [clicked, setClicked] = React.useState(false);
  return (
    <main style={pageStyles}>
      <title>Spolia Lab</title>
     
      <CanvasGrid clicked={clicked}></CanvasGrid>
      <div className="text" style={ {  pointerEvents:clicked &&' none'}}>
        <h2>👋</h2>
Spolia is a design-research lab building creative technologies. <br/>
We design products with startups and help in their implementation.  <br/>
Sometimes, we build cool things ourselves too.  <br/>
 <br/>
Our mindful time-management app, <a href='https://apps.apple.com/us/app/hone-one-thing-at-a-time/id1624789090?mt=12' target="_blank"><span>Hone</span></a>, is now in public release on the Mac App Store. <br/>

If you want to chat about working with us, or want to join our design collaborative,  <br/>
contact us at <a href="mailto:hello@spolialab.com">hello@spolialab.com</a>. <br/> <br/>
<span className="noMobile">
If you just want something fun to do on this {new Date().toLocaleString('en-us', {  weekday: 'long' })},  <br/>
you’re welcome to <span  onClick={() => setClicked(!clicked)} className="draw"> {!clicked ? "draw" : "stop drawing"}</span>  over this website.
</span>
<span className="btLeft"> ⛘</span>
<span className="btRight"> Spolia <br/> Lab</span>

      </div>


     
    
    </main>
  )
}

export default IndexPage
