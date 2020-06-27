import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';
import {
  getRandomCoordinatesArray,
  getNeighbourMines,
} from '../../utils/minesweeper';

import styles from './styles';

const MineField = ({ level, totalMines }) => {
  const matrixSideLength = level * CELL_MULTIPLIER;

  const [mineLayout, setMineLayout] = useState([]);
  const [currentClick, setCurrentClick] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const layoutMineField = useCallback(() => {
    const minesCoordinates = getRandomCoordinatesArray(
      totalMines,
      matrixSideLength,
    );

    const layout = [...Array(matrixSideLength)].map((_column, columnIdex) => {
      return [...Array(matrixSideLength)].map((_cell, rowIndex) => {
        const cellCoordinate = [columnIdex, rowIndex];

        const hasMine =
          minesCoordinates.filter(
            (coordinate) =>
              coordinate[0] === cellCoordinate[0] &&
              coordinate[1] === cellCoordinate[1],
          ).length > 0;

        const neighbourMines = getNeighbourMines(
          cellCoordinate,
          minesCoordinates,
        );

        return {
          coordinateX: columnIdex,
          coordinateY: rowIndex,
          hasMine,
          neighbourMines,
        };
      });
    });
    setMineLayout(layout);
  }, [matrixSideLength, totalMines]);

  useEffect(() => {
    layoutMineField();
  }, [layoutMineField]);

  const handleCellClick = (coordinate) => {
    console.log('click');
    setCurrentClick(coordinate);
  };

  const renderCells = () =>
    mineLayout.map((column) =>
      column.map((cell) => (
        <Cell
          key={`${cell.coordinateX}${cell.coordinateY}`}
          coordinates={{ x: cell.coordinateX, y: cell.coordinateY }}
          gameOver={gameOver}
          hasMine={cell.hasMine}
          matrixSideLength={matrixSideLength}
          neighbourMines={cell.neighbourMines}
          onClick={handleCellClick}
          onGameOver={() => setGameOver(true)}
        />
      )),
    );

  return (
    <View style={styles.container}>
      <View style={styles.cells}>{renderCells()}</View>
    </View>
  );
};

MineField.defaultProps = {
  level: LEVELS.BEGINNER.INDEX,
  totalMines: LEVELS.BEGINNER.MINES,
};

MineField.propTypes = {
  level: PropTypes.number.isRequired,
  totalMines: PropTypes.number.isRequired,
};

export default MineField;

/**
 *
 * Cell Layout
 *
 * [0,0][0,1][0,2]
 * [1,0][1,1][1,2]
 * [2,0][2,1][2,2]
 *
 * Cell: coordinates = [x, y]
 *
 */
