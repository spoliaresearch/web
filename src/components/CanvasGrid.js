import { Canvas } from 'konva/lib/Canvas';
import React from 'react';
import { render } from 'react-dom';
import { Rect, Layer, Stage } from 'react-konva';
import { StyleSheetManager } from 'styled-components';
import "./CanvasGrid.css";



function generateShapes() {
  if ( typeof window == "undefined" ) {
    return;
  }
    let array = [];
    let index = -1;
      for (var j = 0; j < window.innerWidth ; j=j+25){
       for (var i = 0; i < window.innerHeight; i = i+25){
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


const CanvasGrid = (props) => {
  
  
  const [stars, setStars] = React.useState(INITIAL_STATE);
  const [mouseDown, setMouseDown] = React.useState(false);

  const handleDragStart = (e) => {
    console.log(stars)
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
        {typeof window !== "undefined" && props.clicked && 

    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {stars.map((star) => (
          <Rect
            key={star.index}
            id={star.index}
            x={star.x}
            y={star.y}
            width={25}
            height={25}
            stroke={'#DEE0ED'}
            strokeWidth={.15}
            fill={star.isDragging ? 'black' : "white"}
            onPointerEnter={handleDragStart}
            onPointerDown={() => (setMouseDown(true))}
            onPointerUp={() => (setMouseDown(false))}

          />
        ))}
      </Layer>
    </Stage>
}
    </div>
  );
};

export default CanvasGrid;
