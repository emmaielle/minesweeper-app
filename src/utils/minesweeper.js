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
    // if (cellCoordinate[0] === 0 && cellCoordinate[1] === 3) {
    //   debugger;
    // }
    console.log(minesCoordinates);
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
