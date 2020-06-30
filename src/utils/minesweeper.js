import { CELL_MULTIPLIER } from '../constants/game';
import { getRandomNumber } from './math';

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

export const countExposedCellsInMatrix = (matrix) => {
  let counter = 0;

  matrix.forEach((row) => {
    const exposedByRow = row.filter((cell) => cell.exposed).length;
    counter += exposedByRow;
  });

  return counter;
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
