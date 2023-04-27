import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
import "./CanvasGrid.css";

import outputGrid1 from '../../output1.json';
import outputGrid2 from '../../output2.json';
import outputGrid3 from '../../output3.json';
import outputGrid4 from '../../output4.json';
import outputGrid5 from '../../output5.json';
import outputGrid6 from '../../output6.json';
import outputGrid7 from '../../output7.json';
import outputGrid8 from '../../output8.json';
import outputGrid9 from '../../output9.json';
import outputGrid10 from '../../output10.json';
import outputGrid11 from '../../output11.json';
import outputGrid12 from '../../output12.json';
import outputGrid13 from '../../output13.json';
import outputGrid14 from '../../output14.json';
import outputGrid15 from '../../output15.json';
import outputGrid16 from '../../output16.json';
import outputGrid17 from '../../output17.json';
import outputGrid18 from '../../output18.json';
import outputGrid19 from '../../output19.json';
import outputGrid20 from '../../output20.json';
import outputGrid21 from '../../output21.json';
import outputGrid22 from '../../output22.json';
import outputGrid23 from '../../output23.json';
import outputGrid24 from '../../output24.json';
import outputGrid25 from '../../output25.json';
import outputGrid26 from '../../output26.json';
import outputGrid27 from '../../output27.json';
import outputGrid28 from '../../output28.json';
import outputGrid29 from '../../output29.json';
import outputGrid30 from '../../output30.json';

const grids = [
  outputGrid1,
  outputGrid2,
  outputGrid3,
  outputGrid4,
  outputGrid5,
  outputGrid6,
  outputGrid7,
  outputGrid8,
  outputGrid9,
  outputGrid10,
  outputGrid11,
  outputGrid12,
  outputGrid13,
  outputGrid14,
  outputGrid15,
  outputGrid16,
  outputGrid17,
  outputGrid18,
  outputGrid19,
  outputGrid20,
  outputGrid21,
  outputGrid22,
  outputGrid23,
  outputGrid24,
  outputGrid25,
  outputGrid26,
  outputGrid27,
  outputGrid28,
  outputGrid29,
  outputGrid30,
];


const gridSizeX = Math.floor(window.innerWidth / 13.333);
const gridSizeY = Math.floor(window.innerHeight / 13.333);
const squareSize = 13.333;

const Boid = () => {
  const position = {
    x: Math.random() * gridSizeX * squareSize,
    y: Math.random() * gridSizeY * squareSize,
    vx: 0,
    vy: 0,
  };

  return position;
};

const generateShapes = () => {
  let array = [];
  let index = -1;
  for (var i = 0; i < gridSizeY; i++) {
    for (var j = 0; j < gridSizeX; j++) {
      index += 1;
      array.push({
        index: index.toString(),
        x: j,
        y: i,
        rotation: 0,
        isDragging: false,
      });
    }
  }
  return array;
};


const INITIAL_STATE = generateShapes();

const CombinedSketch = (props) => {
  const initializeBoidsFromGrid = (grid) => {
  const newBoids = [];
  grid.forEach((column, x) => {
    column.forEach((cell, y) => {
      if (cell.color === 'white') {
        newBoids.push({
          x: x * squareSize + squareSize / 2,
          y: y * squareSize + squareSize / 2,
          vx: 0,
          vy: 0,
        });
      }
    });
  });
  return newBoids;
};

const layerRef = useRef();

const [boids, setBoids] = useState([]);

// useEffect(() => {
//   setBoids(initializeBoidsFromGrid(grid));
// }, [grid]);


  const [animating, setAnimating] = useState(false);





const initializeGrid = () => {
  // Pick a random grid from the array of grids
  const randomGridIndex = Math.floor(Math.random() * grids.length);
  const outputGrid = grids[randomGridIndex];

  const offsetX = Math.floor((gridSizeX - outputGrid[0].length) / 2);
  const offsetY = Math.floor((gridSizeY - outputGrid.length) / 2);

  const newGrid = Array.from({ length: gridSizeX }, () =>
    Array.from({ length: gridSizeY }, () => ({ color: 'black' }))
  );

  for (let y = 0; y < outputGrid.length; y++) {
    for (let x = 0; x < outputGrid[0].length; x++) {
      newGrid[x + offsetX][y + offsetY] = outputGrid[y][x];
    }
  }

  return newGrid;
};

//   const [grid, setGrid] = useState(
//     Array.from({ length: gridSizeX }, () =>
//       Array.from({ length: gridSizeY }, () => ({ color: 'white' }))
//     )
//   ); 
//empty

const [grid, setGrid] = useState(initializeGrid());


  const [stars, setStars] = useState(INITIAL_STATE);
  const [mouseDown, setMouseDown] = useState(false);
  const [drawing, setDrawing] = useState(true);

  const handleClick = () => {
    const layer = layerRef.current;
    const rects = layer.getChildren();
    let maxTimeout = 0;

    rects.forEach((rect, index) => {
      if (rect.getAttr('fill') === 'white') {
        const timeout = 300 + index * Math.random() / 50;
        maxTimeout = Math.max(maxTimeout, timeout);

        setTimeout(() => {
          const animation = new Konva.Animation((frame) => {
            rect.setAttr('fill', 'black');
          }, layer);
          animation.start();
        }, timeout);
      }
    });

    setTimeout(() => {
      props.setClicked(false);
      console.log('boom')
    }, maxTimeout);
  };




   useEffect(() => {
    if (drawing) return;
    const updateGrid = () => {
      const newGrid = JSON.parse(JSON.stringify(grid));
      for (let x = 0; x < gridSizeX; x++) {
        for (let y = 0; y < gridSizeY; y++) {
          let closestBoidDist = Infinity;
          let closestBoid = null;

          for (const boid of boids) {
            const dist = Math.hypot(
              x * squareSize + squareSize / 2 - boid.x,
              y * squareSize + squareSize / 2 - boid.y
            );
            if (dist < closestBoidDist) {
              closestBoidDist = dist;
              closestBoid = boid;
            }
          }

          if (closestBoidDist < 11.5) {
            newGrid[x][y].color = 'white';
          } else {
            newGrid[x][y].color = 'black';
          }
        }
      }
      setGrid(newGrid);
    };

    

    const interval = setInterval(() => {
      setBoids((prevBoids) =>
        prevBoids.map((boid) => {
          const cohesionRadius = 50;
          const separationRadius = 50;
          const alignmentRadius = 50;
          const maxSpeed = 5;

          let sumPositionCohesion = { x: 0, y: 0 };
          let sumPositionSeparation = { x: 0, y: 0 };
          let sumVelocityAlignment = { x: 0, y: 0 };
          let neighborCountCohesion = 0;
          let neighborCountSeparation = 0;
          let neighborCountAlignment = 0;

          for (const otherBoid of prevBoids) {
            if (boid === otherBoid) {
              continue;
            }

            const dist = Math.hypot(boid.x - otherBoid.x, boid.y - otherBoid.y);

            if (dist < cohesionRadius) {
              sumPositionCohesion.x += otherBoid.x;
              sumPositionCohesion.y += otherBoid.y;
              neighborCountCohesion++;
            }
            

            if (dist < separationRadius) {
              const separationVector = {
                x: boid.x - otherBoid.x,
                y: boid.y - otherBoid.y,
              };
              const separationVectorLength = Math.hypot(separationVector.x, separationVector.y);
              separationVector.x /= separationVectorLength;
              separationVector.y /= separationVectorLength;
              sumPositionSeparation.x += separationVector.x;
              sumPositionSeparation.y += separationVector.y;
              neighborCountSeparation++;
            }
                        if (dist < alignmentRadius) {
              sumVelocityAlignment.x += otherBoid.vx;
              sumVelocityAlignment.y += otherBoid.vy;
              neighborCountAlignment++;
            }
          }


          let cohesionVector = { x: 0, y: 0 };
          let separationVector = { x: 0, y: 0 };
          let alignmentVector = { x: 0, y: 0 };

          // calculate cohesion vector
          if (neighborCountCohesion > 0) {
            cohesionVector = {
              x: sumPositionCohesion.x / neighborCountCohesion - boid.x,
              y: sumPositionCohesion.y / neighborCountCohesion - boid.y,
            };
          }

          // calculate alignment vector
          if (neighborCountAlignment > 0) {
            alignmentVector = {
              x: sumVelocityAlignment.x / neighborCountAlignment,
              y: sumVelocityAlignment.y / neighborCountAlignment,
            };
          }

          // calculate separation vector
          if (neighborCountSeparation > 0) {
            separationVector = {
              x: sumPositionSeparation.x / neighborCountSeparation,
              y: sumPositionSeparation.y / neighborCountSeparation,
            };
          }

          // add the three vectors together
          let combinedVector = {
            x: cohesionVector.x + alignmentVector.x + separationVector.x,
            y: cohesionVector.y + alignmentVector.y + separationVector.y,
          };

          // limit the speed
          let speedLimit = maxSpeed;
          let combinedVectorLength = Math.hypot(combinedVector.x, combinedVector.y);
          if (combinedVectorLength > speedLimit) {
            combinedVector.x *= speedLimit / combinedVectorLength;
            combinedVector.y *= speedLimit / combinedVectorLength;
          }

          // update position and velocity
          boid.vx += combinedVector.x * 0.2;
          boid.vy += combinedVector.y * 0.2;
          boid.x += boid.vx;
          boid.y += boid.vy;

          // wrap around screen edges
          if (boid.x > gridSizeX * squareSize) {
            boid.x = 0;
          }
          if (boid.x < 0) {
            boid.x = gridSizeX * squareSize;
          }
          if (boid.y > gridSizeY * squareSize) {
            boid.y = 0;
          }
          if (boid.y < 0) {
            boid.y = gridSizeY * squareSize;
          }

          return boid;
        })
      );
      updateGrid();
    }, 75);


    return () => {
      clearInterval(interval);
    };
  }, [boids, grid, drawing]);


const handleDragStart = (e) => {
  if (!mouseDown) return;
  const pointerPos = e.target.getStage().getPointerPosition();
  const x = Math.floor(pointerPos.x / squareSize);
  const y = gridSizeY - 1 - Math.floor(pointerPos.y / squareSize);

  if (x < gridSizeX && y < gridSizeY) {
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      newGrid[x][y].color = 'black';
      return newGrid;
    });
  }
};




const toggleDrawing = () => {
  // if (drawing) {
    const newBoids = [];
    grid.forEach((column, x) => {
      column.forEach((cell, y) => {
        if (cell.color === 'black') {
          newBoids.push({
            x: x * squareSize + squareSize / 2,
            y: y * squareSize + squareSize / 2,
            vx: 0,
            vy: 0,
          });
        }
      });
    });
    setBoids(newBoids);
  // }
  // setDrawing(!drawing);
};



  return (
  
    <div className={`stage-container ${props.clicked ? 'visible' : 'hidden'}`}>
           {props.clicked && <>
      <button  class='play' onClick={toggleDrawing}>{drawing ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
  <polygon points="5 0, 25 15, 5 30" fill="#fff" /> Play
</svg>
 : 'Draw'}</button>
      <Stage  className="canvas-grid"  width={gridSizeX * squareSize} height={gridSizeY * squareSize}>
        <Layer ref={layerRef} >
          {grid.map((column, x) =>
  column.map((cell, y) => (
    <MemoizedCell
      x={x}
      y={y}
      gridSizeY={gridSizeY}
      squareSize={squareSize}
      cell={cell}
      handleDragStart={handleDragStart}
      drawing={drawing}
      handleClick={handleClick}
    />
  ))
)}
        </Layer>
      </Stage></>
}
    </div>
  );
};

export default CombinedSketch;



const MemoizedCell = React.memo(({ x, y, gridSizeY, squareSize, cell, handleDragStart, drawing, handleClick }) => (
  <Rect
    key={`cell-${x}-${y}`}
    x={x * squareSize}
    y={(gridSizeY - y - 1) * squareSize} // updated calculation
    width={squareSize}
    height={squareSize}
    fill={cell.color}
    stroke={'#000'}
    strokeWidth={0.25}
    onPointerEnter={drawing ? handleDragStart : null}
    onClick={handleClick}
  />
));

