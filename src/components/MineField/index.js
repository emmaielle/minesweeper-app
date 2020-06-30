import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import Popup from '../Popup';
import { LEVELS, CELL_STATES } from '../../constants/game';
import { getMatrixSideLength } from '../../utils/minesweeper';

import styles from './styles';

const MineField = ({ layout, level, matrixSideLength, onExposeEmptyCells }) => {
  const [exposedCellCount, setExposedCellCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [minesLeft, setMinesLeft] = useState(level.MINES);

  const handleCellClick = (coordinate) => {
    onExposeEmptyCells(coordinate);
  };

  // const handleExpose = () => {
  //   setExposedCellCount(exposedCellCount + 1);
  // };

  const handleFlag = (status) => {
    let counter = status === CELL_STATES.FLAGGED ? -1 : 1;
    setMinesLeft(minesLeft + counter);
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
          // onExpose={handleExpose}
          onFlag={handleFlag}
          onGameOver={() => setGameOver(true)}
        />
      )),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cells}>{renderCells()}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Mines left: {minesLeft}</Text>
        </View>
      </View>
      <Popup visible={gameOver}>
        <Text>You win!</Text>
      </Popup>
    </>
  );
};

MineField.defaultProps = {
  level: LEVELS[0].INDEX,
  matrixSideLength: getMatrixSideLength(LEVELS[0]),
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
