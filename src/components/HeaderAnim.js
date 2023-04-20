import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import "./CanvasGrid.css";
const gridSizeX = Math.floor(window.innerWidth / 25);
const gridSizeY = Math.floor(window.innerHeight / 25);
const squareSize = 25;

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
  const [boids, setBoids] = useState(Array.from({ length: 50 }, () => new Boid()));
  const [grid, setGrid] = useState(
    Array.from({ length: gridSizeX }, () =>
      Array.from({ length: gridSizeY }, () => ({ color: 'white' }))
    )
  );
  const [stars, setStars] = useState(INITIAL_STATE);
  const [mouseDown, setMouseDown] = useState(false);
  const [drawing, setDrawing] = useState(true);


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

          if (closestBoidDist < 15) {
            newGrid[x][y].color = 'black';
          } else {
            newGrid[x][y].color = 'white';
          }
        }
      }
      setGrid(newGrid);
    };

    

    const interval = setInterval(() => {
      setBoids((prevBoids) =>
        prevBoids.map((boid) => {
          const cohesionRadius = 500;
          const separationRadius = 800;
          const alignmentRadius = 250;
          const maxSpeed = 1;

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
  if (drawing) {
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
  }
  setDrawing(!drawing);
};



  return (
  
    <div>
           {props.clicked && <>
      <button  class='play' onClick={toggleDrawing}>{drawing ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
  <polygon points="5 0, 25 15, 5 30" fill="#fff" /> Play
</svg>
 : 'Draw'}</button>
      <Stage  className="canvas-grid" width={gridSizeX * squareSize} height={gridSizeY * squareSize}>
        <Layer>
          {grid.map((column, x) =>
            column.map((cell, y) => (
           <Rect
  key={`cell-${x}-${y}`}
  x={x * squareSize}
  y={(gridSizeY - y - 1) * squareSize} // updated calculation
  width={squareSize}
  height={squareSize}
  fill={cell.color}
  stroke={'#DEE0ED'}
  strokeWidth={0.25}
  onPointerEnter={drawing ? handleDragStart : null}
  onPointerDown={() => (drawing ? setMouseDown(true) : null)}
  onPointerUp={() => (drawing ? setMouseDown(false) : null)}
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