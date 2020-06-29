import { CELL_MULTIPLIER } from '../constants/game';

export const getMatrixSideLength = (level) => {
  return level.INDEX * CELL_MULTIPLIER;
};

export const getEmptySquareMatrix = (sideLength, totalMines) => {
  const randomCoordinatesSet = getRandomCoordinatesSet(totalMines, sideLength);

  return [...Array(sideLength)].map((_row, rowIndex) => {
    return [...Array(sideLength)].map((_col, colIndex) => {
      const formattedCoordinate = `${rowIndex}-${colIndex}`;
      const hasMine = randomCoordinatesSet.has(formattedCoordinate);

      return {
        hasMine,
      };
    });
  });
};

export const getRandomCoordinatesSet = (maxMines, matrixSideLength) => {
  const coordinates = new Set();
  let index = 0;

  while (index < maxMines) {
    const coordinate = `${getRandomNumber(matrixSideLength)}-${getRandomNumber(
      matrixSideLength,
    )}`;

    if (!coordinates.has(coordinate)) {
      coordinates.add(coordinate);
      index++;
    }
  }
  return coordinates;
};

/** unused */
export const getRandomNumber = (inclusiveMaxNum) => {
  return Math.floor(Math.random() * inclusiveMaxNum);
};

export const isCoordinateIncluded = (coordinate, containerArray) => {
  const result = containerArray.some(
    (item) => item[0] === coordinate[0] && item[1] === coordinate[1],
  );
  return result;
};
/** unused */

export const getNeighbourCoordinates = (currentCoordinate, matrixLength) => {
  const array = [];
  for (
    let row = currentCoordinate[0] - 1;
    row <= currentCoordinate[0] + 1;
    row++
  ) {
    if (row >= 0 && row < matrixLength) {
      for (
        let column = currentCoordinate[1] - 1;
        column <= currentCoordinate[1] + 1;
        column++
      ) {
        if (
          column < 0 ||
          (currentCoordinate[0] === row && currentCoordinate[1] === column) ||
          column >= matrixLength
        ) {
          continue;
        }
        array.push([row, column]);
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
