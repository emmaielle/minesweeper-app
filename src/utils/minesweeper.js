export const getEmptySquareMatrix = (sideLength) => {
  return [...Array(sideLength)].map(() => {
    return [...Array(sideLength)].map(() => {
      // const hasMine = true;
      return {
        // hasMine,
      };
    });
  });
};

export const getRandomNumber = (inclusiveMaxNum) => {
  return Math.floor(Math.random() * inclusiveMaxNum);
};

export const getRandomCoordinatesArray = (arrayLength, matrixSideLength) => {
  const coordinates = [];
  let index = 0;

  while (index < arrayLength) {
    const coordinate = [
      getRandomNumber(matrixSideLength),
      getRandomNumber(matrixSideLength),
    ];

    if (!coordinates.length || !isCoordinateIncluded(coordinate, coordinates)) {
      coordinates.push(coordinate);
      index++;
    }
  }
  return coordinates;
};

export const isCoordinateIncluded = (coordinate, containerArray) => {
  const result = containerArray.some(
    (item) => item[0] === coordinate[0] && item[1] === coordinate[1],
  );
  return result;
};

export const getNeighbourMines = (cellCoordinate, minesCoordinates) => {
  let counter = 0;
  minesCoordinates.forEach((coordinate) => {
    const neighbouringX =
      cellCoordinate[0] >= coordinate[0] - 1 &&
      cellCoordinate[0] <= coordinate[0] + 1;

    const neighbouringY =
      cellCoordinate[1] >= coordinate[1] - 1 &&
      cellCoordinate[1] <= coordinate[1] + 1;

    if (neighbouringX && neighbouringY) {
      counter++;
    }
  });

  return counter;
};

// TODO: hacer mas entendible
export const getNeighbourCoordinates = (currentCoordinate, matrixLength) => {
  const array = [];
  for (let x = currentCoordinate[0] - 1; x <= currentCoordinate[0] + 1; x++) {
    if (x >= 0 && x < matrixLength) {
      for (
        let y = currentCoordinate[1] - 1;
        y <= currentCoordinate[1] + 1;
        y++
      ) {
        if (
          y < 0 ||
          (currentCoordinate[0] === x && currentCoordinate[1] === y) ||
          y >= matrixLength
        ) {
          continue;
        }
        array.push([x, y]);
      }
    }
  }

  return array;
};

export const updateMineFieldWithExposedCells = (
  currentLayout,
  currentCoordinate,
) => {
  recursiveExposedCellsSearch(currentLayout, currentCoordinate);
  return currentLayout;
};

export const recursiveExposedCellsSearch = (
  currentLayout,
  currentCoordinate,
) => {
  const neighbourCoordinates = getNeighbourCoordinates(
    currentCoordinate,
    currentLayout[0].length,
  );

  neighbourCoordinates.forEach((neighbourCoord) => {
    const currentNeighbourX = neighbourCoord[0];
    const currentNeighbourY = neighbourCoord[1];

    const currentNeighbour =
      currentLayout[currentNeighbourX] &&
      currentLayout[currentNeighbourX][currentNeighbourY];

    if (!currentNeighbour || currentNeighbour.exposed) {
      return;
    }

    currentLayout[currentNeighbourX][currentNeighbourY].exposed = true;

    if (currentNeighbour.neighbourMines > 0) {
      return;
    }
    recursiveExposedCellsSearch(currentLayout, [
      currentNeighbourX,
      currentNeighbourY,
    ]);
  });
};

// const fixedCoordinates = [
//   [3, 7],
//   [2, 1],
//   [6, 3],
//   [2, 0],
//   [7, 3],
//   [7, 2],
//   [4, 0],
//   [1, 5],
//   [5, 3],
//   [3, 7],
//   [5, 7],
//   [2, 4],
//   [3, 5],
//   [0, 4],
//   [4, 4],
//   [6, 1],
//   [0, 1],
//   [4, 0],
//   [1, 4],
//   [4, 0],
//   [7, 3],
//   [2, 4],
//   [6, 0],
//   [1, 4],
//   [7, 1],
//   [5, 4],
//   [6, 3],
//   [1, 4],
//   [2, 2],
//   [2, 7],
// ];
