import { Canvas } from 'konva/lib/Canvas';
import React from 'react';
import { render } from 'react-dom';
import { Rect, Layer, Stage } from 'react-konva';
import { StyleSheetManager } from 'styled-components';
import "./CanvasGrid.css";



function generateShapes() {

  if (typeof window == "undefined") {
    return [];
  }

    let array = [];
    let index = -1;
      for (var j = 0; j < window.innerWidth ; j=j+40){
       for (var i = 0; i < window.innerHeight; i = i+40){
           console.log(i)
           index +=1
            array.push({
    index: index.toString(),
    x:  j,
    y:  i,
    rotation: 0,
    isDragging: false,
  })}}
  return array;
    

}

const INITIAL_STATE = generateShapes();


const CanvasGrid = () => {
  
  
  const [stars, setStars] = React.useState(INITIAL_STATE);
  const [mouseDown, setMouseDown] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [screenHeight, setScreenHeight] = React.useState(
    typeof window !== "undefined" ? window.innerheight : 1080
  );
  const handleDragStart = (e) => {
      if (!mouseDown)  return;
    const index = e.target.id();

    setStars(
          stars.map((item,i) => {
            if (i !== parseInt(index)) {
          
                return item;
            }
            else {
        
                 return {
    ...item, isDragging: true 
    }
            }
          }
          )
    );
        };
//   const handleDragEnd = (e) => {
//     setStars(
//       stars.map((star) => {
//         return {
//           ...star,
//           isDragging: false,
//         };
//       })
//     );
//   };

  return (
      <div className="canvas-grid">
    <Stage width={screenWidth} height={screenHeight}>
      <Layer>
        {stars.map((star) => (
          <Rect
            key={star.index}
            id={star.index}
            x={star.x}
            y={star.y}
            width={40}
            height={40}
            fill={star.isDragging ? 'black' : "white"}
            onMouseEnter={handleDragStart}
            onMouseDown={() => (setMouseDown(true))}
            onMouseUp={() => (setMouseDown(false))}

          />
        ))}
      </Layer>
    </Stage>
    </div>
  );
};

export default CanvasGrid;
