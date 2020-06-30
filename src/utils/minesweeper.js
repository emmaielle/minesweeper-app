import { getRandomNumber } from './math';

export const getEmptySquareMatrix = (level) => {
  const randomCoordinatesSet = getRandomCoordinatesSet(
    level.MINES,
    level.ROWS,
    level.COLUMNS,
  );

  return [...Array(level.ROWS)].map((_row, rowIndex) => {
    return [...Array(level.COLUMNS)].map((_col, colIndex) => {
      const formattedCoordinate = `${rowIndex}-${colIndex}`;
      const hasMine = randomCoordinatesSet.has(formattedCoordinate);

      return {
        hasMine,
      };
    });
  });
};

export const getRandomCoordinatesSet = (maxMines, rowLength, columnLength) => {
  const coordinates = new Set();
  let index = 0;

  while (index < maxMines) {
    const coordinate = `${getRandomNumber(rowLength)}-${getRandomNumber(
      columnLength,
    )}`;

    if (!coordinates.has(coordinate)) {
      coordinates.add(coordinate);
      index++;
    }
  }
  return coordinates;
};

export const getNeighbourCoordinates = (currentCoordinate, level) => {
  const rowLength = level.ROWS;
  const columnLength = level.COLUMNS;
  const array = [];

  for (
    let row = currentCoordinate[0] - 1;
    row <= currentCoordinate[0] + 1;
    row++
  ) {
    if (row >= 0 && row < rowLength) {
      for (
        let column = currentCoordinate[1] - 1;
        column <= currentCoordinate[1] + 1;
        column++
      ) {
        if (
          column < 0 ||
          (currentCoordinate[0] === row && currentCoordinate[1] === column) ||
          column >= columnLength
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
  level,
) => {
  recursiveExposedCellsSearch(currentLayout, currentCoordinate, level);
  return currentLayout;
};

export const recursiveExposedCellsSearch = (
  currentLayout,
  currentCoordinate,
  level,
) => {
  const neighbourCoordinates = getNeighbourCoordinates(
    currentCoordinate,
    level,
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
    recursiveExposedCellsSearch(
      currentLayout,
      [currentNeighbourX, currentNeighbourY],
      level,
    );
  });
};
