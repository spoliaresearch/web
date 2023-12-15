import './Canvas.css';
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
// import "./CanvasGrid.css";

const secondaryColor = "black";

const Canvas = React.forwardRef((props, ref) => {

const layerRef = useRef();
const cellRefs = useRef({});
const [forceUpdate, setForceUpdate] = useState(0); 
const [gridSizeX, setGridSizeX] = useState(0);
const [gridSizeY, setGridSizeY] = useState(0);
  const [liveCells, setLiveCells] = useState(new Set());
const squareSize = 9;
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

// Modify startSimulation to pass the initial liveCells state
const startSimulation = () => {
  if (!isRunning) {
    setIsRunning(true);
    nextGeneration(liveCells); // Start the first generation
  }
};
  // Function to stop the simulation
 const stopSimulation = () => {
  if (isRunning) {
    setIsRunning(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }
};


  // Function to reset the simulation
  const resetSimulation = () => {
    stopSimulation();
    // Reset to initial state or any other desired state
    const initialLiveCells = initializeGrid(gridSizeX, gridSizeY);
    setLiveCells(initialLiveCells);
  };

  // Effect to clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

 // Updated Function to draw the world
  const drawWorld = () => {
    for (let i = 0; i < gridSizeX; i++) {
      for (let j = 0; j < gridSizeY; j++) {
        const index = i + j * gridSizeX;
        // Change: Use .has for Set
        const isAlive = liveCells.has(index);
        const cellKey = `cell-${i}-${j}`;
        const cell = cellRefs.current[cellKey];
        if (cell) {
          cell.fill(isAlive ? 'black' : 'white');
        }
      }
    }
    layerRef.current.batchDraw();
  };
const nextGeneration = (currentLiveCells) => {
  let newLiveCells = new Set();
  let cellsToConsider = new Set();

  // Add all live cells and their neighbors to the cellsToConsider
  currentLiveCells.forEach(index => {
    let x = index % gridSizeX;
    let y = Math.floor(index / gridSizeX);
    cellsToConsider.add(index);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        let neighborIndex = (x + dx) + (y + dy) * gridSizeX;
        if (neighborIndex >= 0 && neighborIndex < gridSizeX * gridSizeY) {
          cellsToConsider.add(neighborIndex);
        }
      }
    }
  });

  // Determine which cells will be alive in the next generation
  cellsToConsider.forEach(index => {
    let x = index % gridSizeX;
    let y = Math.floor(index / gridSizeX);
    let liveNeighbors = countLiveNeighbors(x, y, currentLiveCells);

    if (currentLiveCells.has(index)) {
      if (liveNeighbors === 2 || liveNeighbors === 3) {
        newLiveCells.add(index);
      }
    } else {
      if (liveNeighbors === 3) {
        newLiveCells.add(index);
      }
    }
  });

  setLiveCells(newLiveCells);
  setForceUpdate(prev => prev + 1); // Increment to force re-render

  console.log(isRunning)
  // Schedule the next generation


    setTimeout(() => nextGeneration(newLiveCells), 100);
};



const countLiveNeighbors = (x, y, currentLiveCells) => {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      let neighborX = x + dx;
      let neighborY = y + dy;
      if (neighborX >= 0 && neighborX < gridSizeX && neighborY >= 0 && neighborY < gridSizeY) {
        let neighborIndex = neighborX + neighborY * gridSizeX;
        if (currentLiveCells.has(neighborIndex)) {
          count++;
        }
      }
    }
  }
  return count;
};


useEffect(() => {
  drawWorld();
}, [liveCells, forceUpdate]);

 const initializeGrid = (gridSizeX, gridSizeY, liveCellPercentage = 5) => {
    const totalCells = gridSizeX * gridSizeY;
    const liveCellCount = Math.floor((liveCellPercentage / 100) * totalCells);
    let liveCells = new Set();
    while (liveCells.size < liveCellCount) {
      const randomCell = Math.floor(Math.random() * totalCells);
      liveCells.add(randomCell);
    }
    return liveCells;
  };



  // useEffect for setting grid size
useEffect(() => {
  if (typeof window !== 'undefined') {
    const computedGridSizeX = Math.floor(window.innerWidth / squareSize - 1.5);
    const computedGridSizeY = Math.floor(window.innerHeight / squareSize - 3);
    setGridSizeX(computedGridSizeX);
    setGridSizeY(computedGridSizeY);
  }
}, []);

// useEffect for initializing live cells
useEffect(() => {
  if (gridSizeX > 0 && gridSizeY > 0) {
    const initialLiveCells = initializeGrid(gridSizeX, gridSizeY);
    setLiveCells(initialLiveCells);
  }
}, [gridSizeX, gridSizeY]);

// useEffect for starting the simulation
useEffect(() => {
  if (liveCells.size > 0) {
    const timeoutId = setTimeout(() => {
      startSimulation();
    }, 2000); // 2 second delay

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }
}, [liveCells]);


  

  return (
   <div ref={ref} style={props.style}>
      <Stage className="canvas-grid" width={gridSizeX * squareSize} height={gridSizeY * squareSize}>
        <Layer ref={layerRef}>
          {Array.from({ length: gridSizeX * gridSizeY }).map((_, index) => {
            const x = index % gridSizeX;
            const y = Math.floor(index / gridSizeX);
            const cellKey = `cell-${x}-${y}`;

            return (
              <Rect
                key={cellKey}
                ref={(el) => (cellRefs.current[cellKey] = el)}
                x={x * squareSize}
                y={(gridSizeY - y - 1) * squareSize}
                width={squareSize}
                height={squareSize}
                fill={'white'} // default color
                stroke={secondaryColor}
                strokeWidth={0.25}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
)});

export default Canvas;



// const MemoizedCell = React.memo(({ x, y, gridSizeY, squareSize, cell }) => (
//   <Rect
//     key={`cell-${x}-${y}`}
//     x={x * squareSize}
//     y={(gridSizeY - y - 1) * squareSize} // updated calculation
//     width={squareSize}
//     height={squareSize}
//     fill={cell.color}
//     stroke={secondaryColor}
//     strokeWidth={0.25}

//   />
// ));


//OLD ONE BASED OFF INPUT GRID
// const initializeGrid = (gridSizeX,gridSizeY) => {
//   // Pick a random grid from the array of grids
//   const randomGridIndex = Math.floor(Math.random() * grids.length);
//   const outputGrid = grids[randomGridIndex];

//   const offsetX = Math.floor((gridSizeX - outputGrid[0].length) / 2);
//   const offsetY = Math.floor((gridSizeY - outputGrid.length) / 2);

//   const newGrid = Array.from({ length: gridSizeX }, () =>
//     Array.from({ length: gridSizeY }, () => ({ color: secondaryColor }))
//   );

//   for (let y = 0; y < outputGrid.length; y++) {
//     for (let x = 0; x < outputGrid[0].length; x++) {
//       newGrid[x + offsetX][y + offsetY] = outputGrid[y][x];
//     }
//   }
// console.log(JSON.stringify(newGrid))
//   return newGrid;

// };


// import outputGrid1 from './grids/output1.json';
// import outputGrid2 from './grids/output2.json';
// import outputGrid3 from './grids/output3.json';
// import outputGrid4 from './grids/output4.json';
// import outputGrid5 from './grids/output5.json';
// import outputGrid6 from './grids/output6.json';
// import outputGrid7 from './grids/output7.json';
// import outputGrid8 from './grids/output8.json';
// import outputGrid9 from './grids/output9.json';
// import outputGrid10 from './grids/output10.json';
// import outputGrid11 from './grids/output11.json';
// import outputGrid12 from './grids/output12.json';
// import outputGrid13 from './grids/output13.json';
// import outputGrid14 from './grids/output14.json';
// import outputGrid15 from './grids/output15.json';
// import outputGrid16 from './grids/output16.json';
// import outputGrid17 from './grids/output17.json';
// import outputGrid18 from './grids/output18.json';
// import outputGrid19 from './grids/output19.json';
// import outputGrid20 from './grids/output20.json';
// import outputGrid21 from './grids/output21.json';
// import outputGrid22 from './grids/output22.json';
// import outputGrid23 from './grids/output23.json';
// import outputGrid24 from './grids/output24.json';
// import outputGrid25 from './grids/output25.json';
// import outputGrid26 from './grids/output26.json';
// import outputGrid27 from './grids/output27.json';
// import outputGrid28 from './grids/output28.json';
// import outputGrid29 from './grids/output29.json';
// import outputGrid30 from './grids/output30.json';


// const grids = [
//   outputGrid1,
//   outputGrid2,
//   outputGrid3,
//   outputGrid4,
//   outputGrid5,
//   outputGrid6,
//   outputGrid7,
//   outputGrid8,
//   outputGrid9,
//   outputGrid10,
//   outputGrid11,
//   outputGrid12,
//   outputGrid13,
//   outputGrid14,
//   outputGrid15,
//   outputGrid16,
//   outputGrid17,
//   outputGrid18,
//   outputGrid19,
//   outputGrid20,
//   outputGrid21,
//   outputGrid22,
//   outputGrid23,
//   outputGrid24,
//   outputGrid25,
//   outputGrid26,
//   outputGrid27,
//   outputGrid28,
//   outputGrid29,
//   outputGrid30,
// ];