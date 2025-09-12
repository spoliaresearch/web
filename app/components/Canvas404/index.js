"use client";

import React, { useEffect, useContext } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { InteractiveContext } from "../contexts/DisableInteractive";

// Import grid data files
import outputGrid1 from "./grids/output1.json";
import outputGrid2 from "./grids/output2.json";
import outputGrid3 from "./grids/output3.json";
import outputGrid4 from "./grids/output4.json";
import outputGrid5 from "./grids/output5.json";
import outputGrid6 from "./grids/output6.json";
import outputGrid7 from "./grids/output7.json";
import outputGrid8 from "./grids/output8.json";
import outputGrid9 from "./grids/output9.json";
import outputGrid10 from "./grids/output10.json";
import outputGrid11 from "./grids/output11.json";
import outputGrid12 from "./grids/output12.json";
import outputGrid13 from "./grids/output13.json";
import outputGrid14 from "./grids/output14.json";
import outputGrid15 from "./grids/output15.json";
import outputGrid16 from "./grids/output16.json";
import outputGrid17 from "./grids/output17.json";
import outputGrid18 from "./grids/output18.json";
import outputGrid19 from "./grids/output19.json";
import outputGrid20 from "./grids/output20.json";
import outputGrid21 from "./grids/output21.json";
import outputGrid22 from "./grids/output22.json";
import outputGrid23 from "./grids/output23.json";
import outputGrid24 from "./grids/output24.json";
import outputGrid25 from "./grids/output25.json";
import outputGrid26 from "./grids/output26.json";
import outputGrid27 from "./grids/output27.json";
import outputGrid28 from "./grids/output28.json";
import outputGrid29 from "./grids/output29.json";
import outputGrid30 from "./grids/output30.json";

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

  var k,
    n,
    m,
    tempRow,
    newState = [],
    added;

  if (y < state[0][0]) {
    // Add to Head
    newState = [[y, x]];
    for (k = 0; k < state.length; k++) {
      newState[k + 1] = state[k];
    }
    for (k = 0; k < newState.length; k++) {
      state[k] = newState[k];
    }
    return;
  } else if (y > state[state.length - 1][0]) {
    // Add to Tail
    state[state.length] = [y, x];
    return;
  } else {
    // Add to Middle
    for (n = 0; n < state.length; n++) {
      if (state[n][0] === y) {
        // Level Exists
        tempRow = [];
        added = false;
        for (m = 1; m < state[n].length; m++) {
          if (!added && x < state[n][m]) {
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

      if (y < state[n][0]) {
        // Create Level
        newState = [];
        for (k = 0; k < state.length; k++) {
          if (k === n) {
            newState[k] = [y, x];
            newState[k + 1] = state[k];
          } else if (k < n) {
            newState[k] = state[k];
          } else if (k > n) {
            newState[k + 1] = state[k];
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

function getNeighboursFromAlive(x, y, i, possibleNeighboursList) {
  var neighbours = 0,
    k;
  let topPointer = 1,
    bottomPointer = 1;

  // Top
  if (actualState[i - 1] !== undefined) {
    if (actualState[i - 1][0] === y - 1) {
      for (k = topPointer; k < actualState[i - 1].length; k++) {
        if (actualState[i - 1][k] >= x - 1) {
          if (actualState[i - 1][k] === x - 1) {
            possibleNeighboursList[0] = undefined;
            neighbours++;
          }
          if (actualState[i - 1][k] === x) {
            possibleNeighboursList[1] = undefined;
            neighbours++;
          }
          if (actualState[i - 1][k] === x + 1) {
            possibleNeighboursList[2] = undefined;
            neighbours++;
          }
          if (actualState[i - 1][k] > x + 1) {
            break;
          }
        }
      }
    }
  }

  // Middle
  for (k = 1; k < actualState[i].length; k++) {
    if (actualState[i][k] >= x - 1) {
      if (actualState[i][k] === x - 1) {
        possibleNeighboursList[3] = undefined;
        neighbours++;
      }
      if (actualState[i][k] === x + 1) {
        possibleNeighboursList[4] = undefined;
        neighbours++;
      }
      if (actualState[i][k] > x + 1) {
        break;
      }
    }
  }

  // Bottom
  if (actualState[i + 1] !== undefined) {
    if (actualState[i + 1][0] === y + 1) {
      for (k = bottomPointer; k < actualState[i + 1].length; k++) {
        if (actualState[i + 1][k] >= x - 1) {
          if (actualState[i + 1][k] === x - 1) {
            possibleNeighboursList[5] = undefined;
            neighbours++;
          }
          if (actualState[i + 1][k] === x) {
            possibleNeighboursList[6] = undefined;
            neighbours++;
          }
          if (actualState[i + 1][k] === x + 1) {
            possibleNeighboursList[7] = undefined;
            neighbours++;
          }
          if (actualState[i + 1][k] > x + 1) {
            break;
          }
        }
      }
    }
  }

  return neighbours;
}

let cols,
  rows,
  resolution = 7;
let actualState = [];
let age = {};
let colorArray = [];

const globalState = {
  isInteractive: true,
  canvasHeight: 0,
  reloadPattern: null,
};

function sketch(p5) {
  p5.setup = () => {
    console.log("Canvas404 setup running");

    // Reset all global state on each setup
    actualState = [];
    age = {};

    let canvasWidth, canvasHeight;

    if (typeof window !== "undefined") {
      // Try to get dimensions from parent container
      const canvasContainer = p5.canvas?.parentElement;
      if (canvasContainer) {
        canvasWidth = canvasContainer.offsetWidth;
        canvasHeight = window.innerHeight * 1; // 50vh
      } else {
        // Fallback to grid container or window dimensions
        const gridContainer = document.querySelector(".grid");
        if (gridContainer) {
          canvasWidth = gridContainer.offsetWidth;
          canvasHeight = window.innerHeight * 1; // 50vh
        } else {
          canvasWidth = window.innerWidth;
          canvasHeight = window.innerHeight * 1; // 50vh
        }
      }
    } else {
      canvasWidth = 800;
      canvasHeight = 400;
    }

    const isMobile = window.innerWidth <= 768;
    resolution = isMobile ? 4 : 7;

    p5.createCanvas(canvasWidth, canvasHeight);
    cols = p5.width / resolution;
    rows = p5.height / resolution;

    colorArray = [
      p5.color(255), // White
      p5.color(255), // White
      p5.color(155, 255, 255), // Light blue
      p5.color(50, 100, 250), // Blue
      p5.color(50, 185, 25), // Green
      p5.color(255, 225, 225), // Light pink
    ];

    // Use a random grid pattern
    const randomGridIndex = Math.floor(Math.random() * grids.length);
    const outputGrid = grids[randomGridIndex];

    console.log("Selected grid index:", randomGridIndex);
    console.log("Grid data sample:", outputGrid.slice(0, 5));

    const canvasCenterX = p5.width / 2;
    const canvasCenterY = p5.height / 2;

    // Find the bounds of the grid pattern
    let minX = Infinity,
      maxX = -Infinity;
    let minY = Infinity,
      maxY = -Infinity;
    outputGrid.forEach(([y, ...xValues]) => {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      xValues.forEach((x) => {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      });
    });

    // Calculate actual pattern dimensions
    const patternWidth = maxX - minX;
    const patternHeight = maxY - minY;

    // Calculate offsets to center the pattern
    const offsetX = canvasCenterX - (patternWidth * resolution) / 2;
    const offsetY = canvasCenterY - (patternHeight * resolution) / 2;

    // Add initial grid cells with adjusted positioning
    outputGrid.forEach(([y, ...xValues], index) => {
      if (index < 3) {
        console.log(`Item ${index}: y=${y}, xValues=${xValues}`);
      }
      xValues.forEach((x) => {
        let adjustedX = Math.round(x - minX + offsetX / resolution);
        let adjustedY = Math.round(y - minY + offsetY / resolution);
        age[`${adjustedX},${adjustedY}`] = -1;
      });
    });

    console.log("Canvas404 created with dimensions:", canvasWidth, canvasHeight);

    // Set up pattern reload function
    globalState.reloadPattern = () => {
      // Reset state
      actualState = [];
      age = {};

      // Load new random pattern
      const newRandomIndex = Math.floor(Math.random() * grids.length);
      const newOutputGrid = grids[newRandomIndex];

      console.log("Loading new pattern index:", newRandomIndex);

      // Find bounds and center the new pattern
      let newMinX = Infinity,
        newMaxX = -Infinity;
      let newMinY = Infinity,
        newMaxY = -Infinity;
      newOutputGrid.forEach(([y, ...xValues]) => {
        newMinY = Math.min(newMinY, y);
        newMaxY = Math.max(newMaxY, y);
        xValues.forEach((x) => {
          newMinX = Math.min(newMinX, x);
          newMaxX = Math.max(newMaxX, x);
        });
      });

      const newPatternWidth = newMaxX - newMinX;
      const newPatternHeight = newMaxY - newMinY;
      const newOffsetX = canvasCenterX - (newPatternWidth * resolution) / 2;
      const newOffsetY = canvasCenterY - (newPatternHeight * resolution) / 2;

      // Add new pattern cells
      newOutputGrid.forEach(([y, ...xValues]) => {
        xValues.forEach((x) => {
          let adjustedX = Math.round(x - newMinX + newOffsetX / resolution);
          let adjustedY = Math.round(y - newMinY + newOffsetY / resolution);
          age[`${adjustedX},${adjustedY}`] = -1;
        });
      });
    };
  };

  function addCellAtMouse() {
    if (!globalState.isInteractive) return;

    if (p5.mouseX >= 0 && p5.mouseX < p5.width && p5.mouseY >= 0 && p5.mouseY < p5.height) {
      const x = Math.floor(p5.mouseX / resolution);
      const y = Math.floor(p5.mouseY / resolution);
      addCell(x, y, actualState);
      age[`${x},${y}`] = 1;
    }
  }

  p5.mouseDragged = () => {
    if (!globalState.isInteractive) return;
    addCellAtMouse();
  };

  p5.mouseMoved = () => {
    if (!globalState.isInteractive) return;
    addCellAtMouse();
  };

  p5.draw = () => {
    p5.background(0, 0, 0);
    p5.frameRate(10);

    // Draw all cells
    for (let cellKey in age) {
      let [x, y] = cellKey.split(",").map(Number);
      let gridX = x * resolution;
      let gridY = y * resolution;

      if (age[cellKey] === -1) {
        // Initial grid cell
        p5.fill(255);
        p5.stroke(25);
      } else {
        // Live cell
        let cellAge = age[cellKey];
        let ageColorIndex = Math.min(Math.abs(cellAge), colorArray.length - 1);
        p5.fill(colorArray[ageColorIndex]);
      }

      p5.rect(gridX, gridY, resolution, resolution);
    }

    if (!globalState.isInteractive) return;

    // Game of Life logic
    var x,
      y,
      i,
      j,
      m,
      key,
      t1,
      t2,
      alive = 0;
    var neighbours,
      deadNeighbours,
      allDeadNeighbours = {},
      newState = [];

    for (i = 0; i < actualState.length; i++) {
      for (j = 1; j < actualState[i].length; j++) {
        x = actualState[i][j];
        y = actualState[i][0];

        // Possible dead neighbours
        deadNeighbours = [
          [x - 1, y - 1, 1],
          [x, y - 1, 1],
          [x + 1, y - 1, 1],
          [x - 1, y, 1],
          [x + 1, y, 1],
          [x - 1, y + 1, 1],
          [x, y + 1, 1],
          [x + 1, y + 1, 1],
        ];

        neighbours = getNeighboursFromAlive(x, y, i, deadNeighbours);

        // Join dead neighbours to check list
        for (m = 0; m < 8; m++) {
          if (deadNeighbours[m] !== undefined) {
            key = deadNeighbours[m][0] + "," + deadNeighbours[m][1];
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
            alive++;
          }
        } else {
          delete age[`${x},${y}`];
        }
      }
    }

    // Process dead neighbours
    for (key in allDeadNeighbours) {
      if (allDeadNeighbours[key] === 3) {
        key = key.split(",");
        t1 = parseInt(key[0], 10);
        t2 = parseInt(key[1], 10);
        addCell(t1, t2, newState);
        age[`${t1},${t2}`] = 1;
        alive++;
      }
    }

    // Update ages
    Object.keys(age).forEach((cellKey) => {
      if (age[cellKey] > 0) {
        age[cellKey]++;
      }
    });

    actualState = newState;
  };

  p5.windowResized = () => {
    let newWidth, newHeight;

    // Try to get dimensions from parent container
    const canvasContainer = p5.canvas?.parentElement;
    if (canvasContainer) {
      newWidth = canvasContainer.offsetWidth;
      newHeight = window.innerHeight * 1; // 50vh
    } else {
      // Fallback to grid container
      const gridContainer = document.querySelector(".grid");
      if (gridContainer) {
        newWidth = gridContainer.offsetWidth;
        newHeight = window.innerHeight * 1; // 50vh
      } else {
        newWidth = window.innerWidth;
        newHeight = window.innerHeight * 1; // 50vh
      }
    }

    p5.resizeCanvas(newWidth, newHeight);
    cols = p5.width / resolution;
    rows = p5.height / resolution;
  };
}

export function reloadCanvas404Pattern() {
  if (globalState.reloadPattern) {
    globalState.reloadPattern();
  }
}

export default function Canvas404() {
  const { isInteractive } = useContext(InteractiveContext) || { isInteractive: true };

  useEffect(() => {
    globalState.isInteractive = isInteractive;
    console.log("Canvas404 component mounted, interactive:", isInteractive);
  }, [isInteractive]);

  return (
    <div style={{ cursor: "cell" }}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
