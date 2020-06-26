import React from 'react';
import { View, Text } from 'react-native';

import MineField from '../MineField';

import styles from './styles';

// Game made up by X*Y Cells
// Cells have specific states: Uncovered, Covered, Flagged

const MineSweeper = () => {
  return (
    <View style={styles.mineSweeper}>
      <Text style={styles.title}>Mine Sweeper</Text>
      <MineField />
    </View>
  );
};

export default MineSweeper;
