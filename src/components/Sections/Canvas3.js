import React, { useState, useEffect, Suspense, useContext } from "react";
import { InteractiveContext } from "../../components/DisableInteractive";

const ReactP5Wrapper = React.lazy(() =>
  import("react-p5-wrapper").then((module) => ({ default: module.ReactP5Wrapper }))
);

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

function removeCell(x, y, state) {
  var i, j;

  for (i = 0; i < state.length; i++) {
    if (state[i][0] === y) {
      if (state[i].length === 2) {
        // Remove all Row
        state.splice(i, 1);
      } else {
        // Remove Element
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
  var neighbours = 0,
    k;

  // Top
  if (actualState[i - 1] !== undefined) {
    if (actualState[i - 1][0] === y - 1) {
      for (k = topPointer; k < actualState[i - 1].length; k++) {
        if (actualState[i - 1][k] >= x - 1) {
          if (actualState[i - 1][k] === x - 1) {
            possibleNeighboursList[0] = undefined;
            topPointer = k + 1;
            neighbours++;
          }

          if (actualState[i - 1][k] === x) {
            possibleNeighboursList[1] = undefined;
            topPointer = k;
            neighbours++;
          }

          if (actualState[i - 1][k] === x + 1) {
            possibleNeighboursList[2] = undefined;

            if (k == 1) {
              topPointer = 1;
            } else {
              topPointer = k - 1;
            }

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
            bottomPointer = k + 1;
            neighbours++;
          }

          if (actualState[i + 1][k] === x) {
            possibleNeighboursList[6] = undefined;
            bottomPointer = k;
            neighbours++;
          }

          if (actualState[i + 1][k] === x + 1) {
            possibleNeighboursList[7] = undefined;

            if (k == 1) {
              bottomPointer = 1;
            } else {
              bottomPointer = k - 1;
            }

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

let cols;
let rows;
let resolution = 7;
let grid;
let actualState = [];
let age = [];
let topPointer = 1;
let middlePointer = 1;
let bottomPointer = 1;
let colorArray = [];

const p5Instance = {
  instance: null,
  initialized: false,
  sketch: null,
};

const globalState = {
  isInteractive: true,
  canvasHeight: 0,
};

function sketch(p5) {
  p5.setup = () => {
    let canvasWidth;
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      const footerElement = document.querySelector(".Footer");

      globalState.canvasHeight = footerElement ? footerElement.offsetHeight : window.innerHeight - 20;
      resolution = isMobile ? 5 : 7;
      canvasWidth = document.documentElement.clientWidth - 15;

      // Set up resize observer here instead of useEffect
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === footerElement) {
            globalState.canvasHeight = entry.target.offsetHeight;
            p5.resizeCanvas(document.documentElement.clientWidth - 20, entry.target.offsetHeight);
          }
        }
      });

      if (footerElement) {
        resizeObserver.observe(footerElement);
      }
    } else {
      canvasWidth = 800;
      globalState.canvasHeight = 600;
      resolution = 7;
    }

    p5.createCanvas(canvasWidth, globalState.canvasHeight);
    cols = p5.width / resolution;
    rows = p5.height / resolution;

    colorArray = [
      p5.color(255, 255, 255), // White
      p5.color(255, 255, 255), // White
      p5.color(155, 255, 255), // Light blue
      p5.color(50, 100, 250), // Blue
      p5.color(50, 185, 25), // Green
      p5.color(255, 225, 225), // Light pink
    ];
  };

  p5.windowResized = () => {
    const oldWidth = p5.width;
    const newWidth = document.documentElement.clientWidth - 20;
    const footerElement = document.querySelector(".Footer");

    globalState.canvasHeight = footerElement ? footerElement.offsetHeight : window.innerHeight - 20;

    const deltaX = (newWidth - oldWidth) / (2 * resolution);
    p5.resizeCanvas(newWidth, globalState.canvasHeight);
    cols = p5.width / resolution;

    // Update cell positions
    const newAge = {};
    Object.entries(age).forEach(([key, value]) => {
      const [x, y] = key.split(",").map(Number);
      const newX = Math.round(x + deltaX);
      newAge[`${newX},${y}`] = value;
    });
    age = newAge;

    // Update actualState array
    for (let i = 0; i < actualState.length; i++) {
      for (let j = 1; j < actualState[i].length; j++) {
        actualState[i][j] = Math.round(actualState[i][j] + deltaX);
      }
    }
  };

  function addCellAtMouse() {
    if (!globalState.isInteractive) return;

    if (p5.mouseX >= 0 && p5.mouseX < p5.width && p5.mouseY >= 0 && p5.mouseY < p5.height) {
      const x = Math.floor(p5.mouseX / resolution);
      const y = Math.floor(p5.mouseY / resolution);

      addCell(x, y, actualState);
      age[`${x},${y}`] = 1; // Set age for new cell
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
    // Draw current state first
    p5.background(0, 0, 0);
    p5.frameRate(10);

    // Draw all cells in their current state
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

    // If not interactive, stop here - don't process any updates
    if (!globalState.isInteractive) return;

    // Rest of the game of life logic continues here...
    var x,
      y,
      i,
      j,
      m,
      n,
      key,
      t1,
      t2,
      alive = 0,
      neighbours,
      deadNeighbours,
      allDeadNeighbours = {},
      newState = [];
    let redrawList = [];

    for (i = 0; i < actualState.length; i++) {
      topPointer = 1;
      bottomPointer = 1;

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

        // Get number of live neighbours and remove alive neighbours from deadNeighbours
        neighbours = getNeighboursFromAlive(x, y, i, deadNeighbours);

        // Join dead neighbours to check list
        for (m = 0; m < 8; m++) {
          if (deadNeighbours[m] !== undefined) {
            key = deadNeighbours[m][0] + "," + deadNeighbours[m][1]; // Create hashtable key

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
      if (allDeadNeighbours[key] === 3) {
        // Add new Cell
        key = key.split(",");
        t1 = parseInt(key[0], 10);
        t2 = parseInt(key[1], 10);

        addCell(t1, t2, newState);
        alive++;
        redrawList.push([t1, t2, 1]);
      }
    }

    redrawList.forEach((item) => {
      let [x, y, state] = item;
      let cellKey = `${x},${y}`;

      if (state === 1) {
        // New cell
        age[cellKey] = 1;
      } else if (state === 2 && age[cellKey] !== -1) {
        // Only increment age for non-initial cells
        age[cellKey] = (age[cellKey] || 0) + 1;
      } else if (state === 0) {
        // Completely remove dead cells
        delete age[cellKey];
      }
    });
    actualState = newState;

    return alive;
  };
}

export function App() {
  const [isSSR, setIsSSR] = useState(false);
  const { isInteractive = true } = useContext(InteractiveContext) || {};

  useEffect(() => {
    globalState.isInteractive = isInteractive;
  }, [isInteractive]);

  useEffect(() => {
    setIsSSR(typeof window !== "undefined");
  }, []);

  return (
    <>
      {isSSR && (
        <Suspense fallback={<div>Loading...</div>}>
          <ReactP5Wrapper sketch={sketch} />
        </Suspense>
      )}
    </>
  );
}
