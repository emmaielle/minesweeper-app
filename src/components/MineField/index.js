import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import Popup from '../Popup';
import { LEVELS, CELL_STATES } from '../../constants/game';
import {
  getMatrixSideLength,
  countExposedCellsInMatrix,
} from '../../utils/minesweeper';

import styles from './styles';

const MineField = ({ layout, level, matrixSideLength, onExposeCells }) => {
  const [exposed, setExposed] = useState(0);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesLeft, setMinesLeft] = useState(level.MINES);

  useEffect(() => {
    const exposedCells = countExposedCellsInMatrix(layout);
    const sideLength = getMatrixSideLength(level);
    setExposed(exposedCells);
    if (exposedCells === sideLength * sideLength - level.MINES) {
      setGameWon(true);
    }
  }, [layout, level, setGameWon]);

  const handleCellClick = (coordinate) => {
    onExposeCells(coordinate);
  };

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
          gameLost={gameLost}
          hasMine={cell.hasMine}
          level={level.INDEX}
          matrixSideLength={matrixSideLength}
          neighbourMines={cell.neighbourMines}
          onClick={handleCellClick}
          onFlag={handleFlag}
          onGameLost={() => setGameLost(true)}
        />
      )),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cells}>{renderCells()}</View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Mines left: {exposed}</Text>
        </View>
      </View>
      <Popup visible={gameLost || gameWon}>
        <Text>{gameLost ? 'You lose!' : 'You win!'}</Text>
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
