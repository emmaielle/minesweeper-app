import React, { useState, useCallback, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';
import { ACCENT } from '../../constants/theme';
import {
  getNeighbourCoordinates,
  getEmptySquareMatrix,
  updateMineFieldWithExposedCells,
} from '../../utils/minesweeper';
import Header from '../Header';
import MineField from '../MineField';

import styles from './styles';

const MineSweeper = () => {
  const [currentLevel, setCurrentLevel] = useState(LEVELS[0]);
  const [newGame, setNewGame] = useState(true);
  const [mineLayout, setMineLayout] = useState(null);

  const matrixSideLength = currentLevel.INDEX * CELL_MULTIPLIER;

  const handleChangeLevel = (index) => {
    setCurrentLevel(LEVELS[index]);
    setNewGame(true);
    setMineLayout(null);
  };

  const handleExposeCells = (clickCoordinate) => {
    const isEmpty =
      mineLayout[clickCoordinate.x][clickCoordinate.y].neighbourMines === 0;
    if (isEmpty) {
      exposeEmptyCells(clickCoordinate);
    } else {
      const layout = [...mineLayout];
      layout[clickCoordinate.x][clickCoordinate.y].exposed = true;
      setMineLayout([...layout]);
    }
  };

  const exposeEmptyCells = (clickCoordinate) => {
    const layout = updateMineFieldWithExposedCells(mineLayout, [
      clickCoordinate.x,
      clickCoordinate.y,
    ]);
    setMineLayout([...layout]);
  };

  useEffect(() => {
    if (newGame) {
      layoutMineField();
      setNewGame(false);
    }
  }, [layoutMineField, newGame]);

  const layoutMineField = useCallback(() => {
    let layout = getEmptySquareMatrix(matrixSideLength, currentLevel.MINES);

    layout = layout.map((column, columnIdex) =>
      column.map((cell, rowIndex) => {
        const cellCoordinate = [columnIdex, rowIndex];
        const neighbourCoordinates = getNeighbourCoordinates(
          cellCoordinate,
          matrixSideLength,
        );

        let neighbourMines = 0;
        neighbourCoordinates.forEach((coord) => {
          if (layout[coord[0]][coord[1]].hasMine) {
            neighbourMines++;
          }
        });

        return {
          coordinateX: columnIdex,
          coordinateY: rowIndex,
          exposed: false,
          hasMine: cell.hasMine,
          neighbourMines,
        };
      }),
    );

    setMineLayout(layout);
  }, [currentLevel.MINES, matrixSideLength]);

  return (
    <View style={styles.mineSweeper}>
      <Header currentLevel={currentLevel} onChangeLevel={handleChangeLevel} />
      {mineLayout ? (
        <MineField
          level={currentLevel}
          layout={mineLayout}
          matrixSideLength={matrixSideLength}
          onExposeCells={handleExposeCells}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator color={ACCENT} size="large" />
        </View>
      )}
    </View>
  );
};

export default MineSweeper;
