import React, { useState, useEffect } from 'react';

import { ReactP5Wrapper } from "react-p5-wrapper";


import outputGrid1 from './grids/output1.json';
import outputGrid2 from './grids/output2.json';
import outputGrid3 from './grids/output3.json';
import outputGrid4 from './grids/output4.json';
import outputGrid5 from './grids/output5.json';
import outputGrid6 from './grids/output6.json';
import outputGrid7 from './grids/output7.json';
import outputGrid8 from './grids/output8.json';
import outputGrid9 from './grids/output9.json';
import outputGrid10 from './grids/output10.json';
import outputGrid11 from './grids/output11.json';
import outputGrid12 from './grids/output12.json';
import outputGrid13 from './grids/output13.json';
import outputGrid14 from './grids/output14.json';
import outputGrid15 from './grids/output15.json';
import outputGrid16 from './grids/output16.json';
import outputGrid17 from './grids/output17.json';
import outputGrid18 from './grids/output18.json';
import outputGrid19 from './grids/output19.json';
import outputGrid20 from './grids/output20.json';
import outputGrid21 from './grids/output21.json';
import outputGrid22 from './grids/output22.json';
import outputGrid23 from './grids/output23.json';
import outputGrid24 from './grids/output24.json';
import outputGrid25 from './grids/output25.json';
import outputGrid26 from './grids/output26.json';
import outputGrid27 from './grids/output27.json';
import outputGrid28 from './grids/output28.json';
import outputGrid29 from './grids/output29.json';
import outputGrid30 from './grids/output30.json';


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





 
      function addCell(x, y, state) {
        if (state.length === 0) {
          state.push([y, x]);
          return;
        }

        var k, n, m, tempRow, newState = [], added;

        if (y < state[0][0]) { // Add to Head
          newState = [[y,x]];
          for (k = 0; k < state.length; k++) {
            newState[k+1] = state[k];
          }

          for (k = 0; k < newState.length; k++) {
            state[k] = newState[k];
          }

          return;

        } else if (y > state[state.length - 1][0]) { // Add to Tail
          state[state.length] = [y, x];
          return;

        } else { // Add to Middle

          for (n = 0; n < state.length; n++) {
            if (state[n][0] === y) { // Level Exists
              tempRow = [];
              added = false;
              for (m = 1; m < state[n].length; m++) {
                if ((!added) && (x < state[n][m])) {
                  tempRow.push(x);
                  added = !added;
                }
                tempRow.push(state[n][m]);
              }
              tempRow.unshift(y);
              if (!added) {
                tempRow.push(x);
              }
              state[n] = tempRow;
              return;
            }

            if (y < state[n][0]) { // Create Level
              newState = [];
              for (k = 0; k < state.length; k++) {
                if (k === n) {
                  newState[k] = [y,x];
                  newState[k+1] = state[k];
                } else if (k < n) {
                  newState[k] = state[k];
                } else if (k > n) {
                  newState[k+1] = state[k];
                }
              }

              for (k = 0; k < newState.length; k++) {
                state[k] = newState[k];
              }

              return;
            }
          }
        }
      }

        function removeCell(x, y, state) {
        var i, j;

        for (i = 0; i < state.length; i++) {
          if (state[i][0] === y) {

            if (state[i].length === 2) { // Remove all Row
              state.splice(i, 1);
            } else { // Remove Element
              for (j = 1; j < state[i].length; j++) {
                if (state[i][j] === x) {
                  state[i].splice(j, 1);
                }
              }
            }
          }
        }
      }

       function getNeighboursFromAlive(x, y, i, possibleNeighboursList) {
        var neighbours = 0, k;

        // Top
        if (actualState[i-1] !== undefined) {
          if (actualState[i-1][0] === (y - 1)) {
            for (k = topPointer; k < actualState[i-1].length; k++) {

              if (actualState[i-1][k] >= (x-1) ) {

                if (actualState[i-1][k] === (x - 1)) {
                  possibleNeighboursList[0] = undefined;
                  topPointer = k + 1;
                  neighbours++;
                }

                if (actualState[i-1][k] === x) {
                  possibleNeighboursList[1] = undefined;
                  topPointer = k;
                  neighbours++;
                }

                if (actualState[i-1][k] === (x + 1)) {
                  possibleNeighboursList[2] = undefined;

                  if (k == 1) {
                    topPointer = 1;
                  } else {
                    topPointer = k - 1;
                  }

                  neighbours++;
                }

                if (actualState[i-1][k] > (x + 1)) {
                  break;
                }
              }
            }
          }
        }

        // Middle
        for (k = 1; k < actualState[i].length; k++) {
          if (actualState[i][k] >= (x - 1)) {

            if (actualState[i][k] === (x - 1)) {
              possibleNeighboursList[3] = undefined;
              neighbours++;
            }

            if (actualState[i][k] === (x + 1)) {
              possibleNeighboursList[4] = undefined;
              neighbours++;
            }

            if (actualState[i][k] > (x + 1)) {
              break;
            }
          }
        }

        // Bottom
        if (actualState[i+1] !== undefined) {
          if (actualState[i+1][0] === (y + 1)) {
            for (k = bottomPointer; k < actualState[i+1].length; k++) {
              if (actualState[i+1][k] >= (x - 1)) {

                if (actualState[i+1][k] === (x - 1)) {
                  possibleNeighboursList[5] = undefined;
                  bottomPointer = k + 1;
                  neighbours++;
                }

                if (actualState[i+1][k] === x) {
                  possibleNeighboursList[6] = undefined;
                  bottomPointer = k;
                  neighbours++;
                }

                if (actualState[i+1][k] === (x + 1)) {
                  possibleNeighboursList[7] = undefined;

                  if (k == 1) {
                    bottomPointer = 1;
                  } else {
                    bottomPointer = k - 1;
                  }

                  neighbours++;
                }

                if (actualState[i+1][k] > (x + 1)) {
                  break;
                }
              }
            }
          }
        }

        return neighbours;
      }




let cols;
  let rows;
  let resolution = 7;
  let grid;
  let actualState = [];
  let age = []
  let  topPointer= 1;
   let middlePointer= 1;
    let  bottomPointer= 1;
    let colorArray = [];
   
function sketch(p5) {

  p5.setup = () => {
    let canvasWidth, canvasHeight;
if (typeof window !== 'undefined') {
    canvasWidth = window.innerWidth - 15;
    canvasHeight = window.innerHeight - 100;
} else {
    // Define default sizes or use a responsive approach
    canvasWidth = 800; // Example default width
    canvasHeight = 600; // Example default height
}

    p5.createCanvas(canvasWidth, canvasHeight);
    cols = p5.width / resolution;
    rows = (p5.height) / resolution;
 
     colorArray = [ // Define the color array
        p5.color(255),  // 
             p5.color(255),   // 
               p5.color(155, 255, 255),// 3: yellow
                 p5.color(50,100,250),       // 0: blue
      
                 p5.color(50, 185, 25),  // 2:green
                  p5.color(255, 225, 225),  // 2:green
                
      
        
      
      
      

    ];

      const randomGridIndex = Math.floor(Math.random() * grids.length);
  const outputGrid = grids[randomGridIndex];

        const canvasCenterX = p5.width / 2;
        const canvasCenterY = p5.height / 2;

        // Assuming grid size is known (example: 80x80)
        const gridWidth = 80; // adjust based on your grid's width
        const gridHeight = 80; // adjust based on your grid's height

        // Calculate the center of the grid
        const gridCenterX = gridWidth / 2;
        const gridCenterY = gridHeight / 2;

        // Calculate the offset
        const offsetX = canvasCenterX - gridCenterX * resolution;
        const offsetY = canvasCenterY - gridCenterY * resolution;


// Add initial grid cells to the age grid with a value of -1
    outputGrid.forEach(([y, ...xValues]) => {
        xValues.forEach(x => {
       let adjustedX = Math.round(x + offsetX / resolution);
        let adjustedY = Math.round(y + offsetY / resolution);

        age[`${adjustedX},${adjustedY}`] = -1; // -1 indicates an initial grid cell
        });
    });

    age[`100,1`] = -1;
    age[`100,2`] = -1;
    age[`100,3`] = -1;
    age[`100,4`] = -1;
    age[`100,5`] = -1;
    age[`100,6`] = -1;
    age[`100,7`] = -1;
    age[`101,7`] = -1;
        age[`100,8`] = -1;
    age[`99,7`] = -1;
     age[`98,6`] = -1;
      age[`102,6`] = -1;
  };

 function addCellAtMouse() {
        if (p5.mouseX >= 0 && p5.mouseX < p5.width && p5.mouseY >= 0 && p5.mouseY < p5.height) {
            const x = Math.floor(p5.mouseX / resolution);
            const y = Math.floor(p5.mouseY / resolution);

            addCell(x, y, actualState);
            age[`${x},${y}`] = 1; // Set age for new cell
          
        }
    }

    // p5.mousePressed = () => {
    //      if (!sketchStarted) {
    //   sketchStarted = true; // Set the flag to true when mouse is pressed
    // }
    //     addCellAtMouse();
    // };

    p5.mouseDragged = () => {
        addCellAtMouse();
    };

//    p5.mousePressed = () => {
//     // Iterate through all cells in the age object
//     for (let cellKey in age) {
//         if (age[cellKey] === -1) {
//             // Split the cellKey to get x and y coordinates
//             let [x, y] = cellKey.split(',').map(Number);
//             // Add cell to the actualState
//             addCell(x, y, actualState);
//         }
//     }
//     colorArray[0] =  p5.color(0, 200, 100);
//     // Optionally, add additional actions here if needed, like starting the sketch
// };



      p5.mouseMoved = () => {
        addCellAtMouse();
    };

  p5.draw = () => {
    p5.background(0, 0, 0);
      p5.frameRate(10);
    //  for (let i = 0; i < actualState.length; i++) {
    //   let y = actualState[i][0];
    //   for (let j = 1; j < actualState[i].length; j++) {
    //     let x = actualState[i][j];
    //     let gridX = x * resolution;
    //     let gridY = y * resolution;
    //     let cellKey = `${x},${y}`;
    //     let ageColorIndex = age[cellKey] !== undefined ? age[cellKey] : 1;
    //     p5.fill(255 - ageColorIndex,  255 + ageColorIndex, 255 - ageColorIndex ); // Alive cell color
    //     p5.rect(gridX, gridY, resolution, resolution);
    //   }
    // }

     for (let cellKey in age) {
        let [x, y] = cellKey.split(',').map(Number);
        let gridX = x * resolution;
        let gridY = y * resolution;
        let cellAge = age[cellKey];
let ageColorIndex = age[cellKey] !== undefined ? age[cellKey] : 1;

if (age[cellKey] === -1) {
            // Initial grid cell, draw in white
            p5.fill(255);
            p5.stroke(25);
        } else {
            // Live cell
            let cellAge = age[cellKey];
            // let ageColorIndex = cellAge > 4 ? 4 : cellAge;
              let ageColorIndex = Math.min(Math.abs(cellAge), colorArray.length - 1);
            p5.fill(colorArray[ageColorIndex]);
        }

       
        p5.rect(gridX, gridY, resolution, resolution);
    }
      
  
     var x, y, i, j, m, n, key, t1, t2, alive = 0, neighbours, deadNeighbours, allDeadNeighbours = {}, newState = [];
     let redrawList = [];

        for (i = 0; i < actualState.length; i++) {
         topPointer = 1;
          bottomPointer = 1;

          for (j = 1; j < actualState[i].length; j++) {
            x = actualState[i][j];
            y = actualState[i][0];

            // Possible dead neighbours
            deadNeighbours = [[x-1, y-1, 1], [x, y-1, 1], [x+1, y-1, 1], [x-1, y, 1], [x+1, y, 1], [x-1, y+1, 1], [x, y+1, 1], [x+1, y+1, 1]];

            // Get number of live neighbours and remove alive neighbours from deadNeighbours
            neighbours = getNeighboursFromAlive(x, y, i, deadNeighbours);

            // Join dead neighbours to check list
            for (m = 0; m < 8; m++) {
              if (deadNeighbours[m] !== undefined) {
                key = deadNeighbours[m][0] + ',' + deadNeighbours[m][1]; // Create hashtable key

                if (allDeadNeighbours[key] === undefined) {
                  allDeadNeighbours[key] = 1;
                } else {
                  allDeadNeighbours[key]++;
                }
              }
            }

            if (!(neighbours === 0 || neighbours === 1 || neighbours > 3)) {
              addCell(x, y, newState);
               if (age[`${x},${y}`] > 0) {
          alive++; // Increment alive only if age is positive
        }
              // alive++;
              redrawList.push([x, y, 2]); // Keep alive
            } else {
              redrawList.push([x, y, 0]); // Kill cell
            }
          }
        }

        // Process dead neighbours
        for (key in allDeadNeighbours) {
          if (allDeadNeighbours[key] === 3) { // Add new Cell
            key = key.split(',');
            t1 = parseInt(key[0], 10);
            t2 = parseInt(key[1], 10);

            addCell(t1, t2, newState);
            alive++;
            redrawList.push([t1, t2, 1]);
          }
        }

    redrawList.forEach(item => {
      let [x, y, state] = item;
      let cellKey = `${x},${y}`;

      if (state === 1) { // New cell
        age[cellKey] = 1; // Initialize age
      } else if (state === 2) { // Existing cell
        age[cellKey] = (age[cellKey] || 0) + 1; // Increment age
      } 
      // else   { // Cell is dead
      //   delete age[cellKey]
      // }
    
        else {
            age[cellKey] = -age[cellKey] - 2;
        }
       
      
    });
        actualState = newState;
          

        return alive;
  };
}

export function App() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Check if the code is running in a browser
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return (
    <>
      {isBrowser && <ReactP5Wrapper sketch={sketch} />}
    </>
  );
}