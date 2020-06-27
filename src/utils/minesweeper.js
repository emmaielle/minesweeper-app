// Temp location of business logic

// get matrix

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
    if (!coordinates.includes(coordinates)) {
      coordinates.push(coordinate);
      index++;
    }
  }
  return coordinates;
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
