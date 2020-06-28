import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';
import { ACCENT } from '../../constants/theme';
import {
  getRandomCoordinatesArray,
  getNeighbourMines,
  isCoordinateIncluded,
} from '../../utils/minesweeper';

import styles from './styles';

const MineField = ({ level, onLoad }) => {
  const matrixSideLength = level.INDEX * CELL_MULTIPLIER;
  const totalMines = level.MINES;

  const [currentClick, setCurrentClick] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mineLayout, setMineLayout] = useState([]);

  useEffect(() => {
    const exposeEmptyCells = () => {
      // iterate from currentclick outwards
      console.log(currentClick);
    };

    exposeEmptyCells();
  }, [currentClick]);

  useEffect(() => {
    const layoutMineField = () => {
      const minesCoordinates = getRandomCoordinatesArray(
        totalMines,
        matrixSideLength,
      );

      const layout = [...Array(matrixSideLength)].map((_column, columnIdex) => {
        return [...Array(matrixSideLength)].map((_cell, rowIndex) => {
          const cellCoordinate = [columnIdex, rowIndex];

          const hasMine = isCoordinateIncluded(
            cellCoordinate,
            minesCoordinates,
          );
          const neighbourMines = getNeighbourMines(
            cellCoordinate,
            minesCoordinates,
          );

          return {
            coordinateX: columnIdex,
            coordinateY: rowIndex,
            exposed: false,
            hasMine,
            neighbourMines,
          };
        });
      });

      setLoading(false);
      setMineLayout(layout);
    };

    layoutMineField();
  }, [matrixSideLength, onLoad, totalMines]);

  const handleCellClick = (coordinate) => {
    setCurrentClick(coordinate);
  };

  const renderCells = () =>
    mineLayout.map((column) =>
      column.map((cell) => (
        <Cell
          key={`${cell.coordinateX}${cell.coordinateY}`}
          coordinates={{ x: cell.coordinateX, y: cell.coordinateY }}
          exposed={cell.exposed}
          gameOver={gameOver}
          hasMine={cell.hasMine}
          level={level.INDEX}
          matrixSideLength={matrixSideLength}
          neighbourMines={cell.neighbourMines}
          onClick={handleCellClick}
          onGameOver={() => setGameOver(true)}
        />
      )),
    );

  if (loading) {
    return (
      <ActivityIndicator style={styles.extend} color={ACCENT} size="large" />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cells}>{renderCells()}</View>
    </View>
  );
};

MineField.defaultProps = {
  level: LEVELS.BEGINNER,
  onLoad: () => {},
};

MineField.propTypes = {
  level: PropTypes.shape({
    INDEX: PropTypes.number.isRequired,
    MINES: PropTypes.number.isRequired,
  }).isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default MineField;
