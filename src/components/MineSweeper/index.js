import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { LEVELS } from '../../constants/game';
import MineField from '../MineField';

import styles from './styles';

const MineSweeper = () => {
  const [currentLevel, setLevel] = useState(LEVELS.BEGINNER);

  const handleChangeLevel = () => {
    setLevel(LEVELS.INTERMEDIATE);
  };

  return (
    <View style={styles().mineSweeper}>
      <Text style={styles().title}>MineSweeper</Text>
      <View style={styles().levelContainer}>
        <View style={styles().buttonsContainer}>
          {Object.keys(LEVELS).map((level) => (
            <TouchableOpacity
              onPress={() => handleChangeLevel(true)}
              style={styles(level === currentLevel).button}
            >
              <Text style={styles().levelText}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <MineField level={currentLevel} />
    </View>
  );
};

export default MineSweeper;
