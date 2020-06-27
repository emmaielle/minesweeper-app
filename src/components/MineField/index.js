import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';

import styles from './styles';

const MineField = ({ level }) => {
  const totalCells = level * CELL_MULTIPLIER;

  const handleCellClick = () => {
    console.log('click');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cells}>
        {[...Array(totalCells)].map((_column, columnIdex) => {
          return [...Array(totalCells)].map((_cell, rowIndex) => {
            return (
              <Cell
                key={`${rowIndex}${columnIdex}`}
                coordinates={{ x: rowIndex, y: columnIdex }}
                totalCells={totalCells}
                onClick={handleCellClick}
              />
            );
          });
        })}
      </View>
    </View>
  );
};

MineField.defaultProps = {
  level: LEVELS.BEGINNER,
};

MineField.propTypes = {
  level: PropTypes.number.isRequired,
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
