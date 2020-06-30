import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import GameOverModal from '../GameOverModal';
import { LEVELS, CELL_STATES } from '../../constants/game';
import { countExposedCellsInMatrix } from '../../utils/minesweeper';

import styles from './styles';

const MineField = ({ layout, level, onExposeCells, onNewGame }) => {
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesLeft, setMinesLeft] = useState(level.MINES);

  useEffect(() => {
    const exposedCells = countExposedCellsInMatrix(layout);

    if (exposedCells === level.ROWS * level.COLUMNS - level.MINES) {
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
          level={level}
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
          <Text style={styles.info}>Mines left: {minesLeft}</Text>
        </View>
      </View>
      <GameOverModal onRetry={onNewGame} visible={gameLost || gameWon}>
        <Text>{gameLost ? 'You lose!' : 'You win!'}</Text>
      </GameOverModal>
    </>
  );
};

MineField.defaultProps = {
  level: LEVELS[0].INDEX,
  onExposeEmptyCells: () => {},
  onNewGame: () => {},
};

MineField.propTypes = {
  layout: PropTypes.array,
  level: PropTypes.shape({
    INDEX: PropTypes.number.isRequired,
    NAME: PropTypes.string.isRequired,
    MINES: PropTypes.number.isRequired,
    ROWS: PropTypes.number.isRequired,
    COLUMNS: PropTypes.number.isRequired,
  }).isRequired,
  onExposeEmptyCells: PropTypes.func.isRequired,
  onNewGame: PropTypes.func.isRequired,
};

export default MineField;
