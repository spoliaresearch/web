import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";






  function isAlive(x, y) {
        var i, j;

        for (i = 0; i < actualState.length; i++) {
          if (actualState[i][0] === y) {
            for (j = 1; j < actualState[i].length; j++) {
              if (actualState[i][j] === x) {
                return true;
              }
            }
          }
        }
        return false;
      }

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
  let resolution = 10;
  let grid;
  let actualState = [];
  let age = []
  let  topPointer= 1;
   let middlePointer= 1;
    let  bottomPointer= 1;
    let colorArray = [];
   
function sketch(p5) {


  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    cols = p5.width / resolution;
    rows = p5.height / resolution;
     colorArray = [ // Define the color array
        p5.color(0, 255, 100),  // 1: green
             p5.color(255, 100, 0),   // 4: red
               p5.color(255, 255, 0),// 3: yellow
                 p5.color(0, 0, 255),  // 2: blue
                
        p5.color(255)       // 0: white
      
      
      

    ];

        // Initialize actualState with some live cells
    actualState.push([5, 10]); // Example: A live cell at (10, 5)

  };

 function addCellAtMouse() {
        if (p5.mouseX >= 0 && p5.mouseX < p5.width && p5.mouseY >= 0 && p5.mouseY < p5.height) {
            const x = Math.floor(p5.mouseX / resolution);
            const y = Math.floor(p5.mouseY / resolution);

            addCell(x, y, actualState);
            age[`${x},${y}`] = 1; // Set age for new cell
        }
    }

    p5.mousePressed = () => {
        addCellAtMouse();
    };

    p5.mouseDragged = () => {
        addCellAtMouse();
    };
  p5.draw = () => {
    p5.background(0);
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
        if (ageColorIndex > 4) {
            ageColorIndex = 4;

        }
        p5.fill(colorArray[ageColorIndex]); // Alive cell color
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
              alive++;
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
      else  { // Cell is dead
        age[cellKey] = 0; // Remove from age array
      }
    });

        actualState = newState;
        console.log(age)

        return alive;
  };
}

export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
