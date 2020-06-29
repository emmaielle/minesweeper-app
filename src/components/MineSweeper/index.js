import React, { useState, useCallback, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';
import { ACCENT } from '../../constants/theme';
import {
  getRandomCoordinatesArray,
  getNeighbourMines,
  getEmptySquareMatrix,
  updateMineFieldWithExposedCells,
  isCoordinateIncluded,
} from '../../utils/minesweeper';
import Header from '../Header';
import MineField from '../MineField';

import styles from './styles';

const MineSweeper = () => {
  const [currentLevel, setCurrentLevel] = useState(LEVELS[0]);
  const [newGame, setNewGame] = useState(true);
  const [mineLayout, setMineLayout] = useState(null);

  const totalMines = currentLevel.MINES;
  const matrixSideLength = currentLevel.INDEX * CELL_MULTIPLIER;

  const handleChangeLevel = (index) => {
    setCurrentLevel(LEVELS[index]);
    setNewGame(true);
    setMineLayout(null);
  };

  const handleExposeEmptyCells = (clickCoordinate) => {
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
    // puedo skipear esto
    const minesCoordinates = getRandomCoordinatesArray(
      totalMines,
      matrixSideLength,
    );

    let layout = getEmptySquareMatrix(matrixSideLength);

    layout = layout.map((column, columnIdex) =>
      column.map((cell, rowIndex) => {
        const cellCoordinate = [columnIdex, rowIndex];
        // const neighCoord = getCoordNeigh()
        // loop layout[i][j].hasMine if !hasMine

        const hasMine = isCoordinateIncluded(cellCoordinate, minesCoordinates);
        const neighbourMines = getNeighbourMines(
          cellCoordinate,
          minesCoordinates,
        );

        return {
          coordinateX: columnIdex,
          coordinateY: rowIndex,
          exposed: false,
          // hasMine: cell.hasMine,
          hasMine,
          neighbourMines,
        };
      }),
    );

    setMineLayout(layout);
  }, [matrixSideLength, totalMines]);

  return (
    <View style={styles.mineSweeper}>
      <Header onChangeLevel={handleChangeLevel} />
      {mineLayout ? (
        <MineField
          level={currentLevel}
          layout={mineLayout}
          matrixSideLength={matrixSideLength}
          onExposeEmptyCells={handleExposeEmptyCells}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator color={ACCENT} size="large" />
        </View>
      )}
      <View>
        <Text>Mines left + Time</Text>
      </View>
    </View>
  );
};

export default MineSweeper;
