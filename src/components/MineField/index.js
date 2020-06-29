import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';

import styles from './styles';

const MineField = ({ layout, level, matrixSideLength, onExposeEmptyCells }) => {
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (coordinate) => {
    onExposeEmptyCells(coordinate);
  };

  const renderCells = () => {
    return layout.map((column) =>
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.cells}>{renderCells()}</View>
    </View>
  );
};

MineField.defaultProps = {
  level: LEVELS[0].INDEX,
  matrixSideLength: LEVELS[0].INDEX * CELL_MULTIPLIER,
  onExposeEmptyCells: () => {},
};

MineField.propTypes = {
  layout: PropTypes.array,
  level: PropTypes.shape({
    INDEX: PropTypes.number.isRequired,
    NAME: PropTypes.string.isRequired,
    MINES: PropTypes.number.isRequired,
  }).isRequired,
  matrixSideLength: PropTypes.number.isRequired,
  onExposeEmptyCells: PropTypes.func.isRequired,
};

export default MineField;
