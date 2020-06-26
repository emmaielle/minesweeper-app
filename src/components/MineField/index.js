import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Cell from '../Cell';
import { LEVELS, CELL_MULTIPLIER } from '../../constants/game';

import styles from './styles';

const MineField = ({ level }) => {
  const renderCells = () => {
    const cellNumber = level * CELL_MULTIPLIER;
    return (
      <>
        {[...Array(cellNumber)].map((_cell, i) => {
          return <Cell key={i} />;
        })}
      </>
    );
  };

  return <View style={styles.container}>{renderCells()}</View>;
};

MineField.defaultProps = {
  level: LEVELS.BEGINNER,
};

MineField.propTypes = {
  level: PropTypes.number.isRequired,
};

export default MineField;
