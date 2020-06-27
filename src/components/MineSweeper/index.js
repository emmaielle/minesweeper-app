import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import MineField from '../MineField';

import styles from './styles';

const MineSweeper = () => {
  const [startOver, setStartOver] = useState(false);

  return (
    <View style={styles.mineSweeper}>
      <Text style={styles.title}>MineSweeper</Text>
      {startOver ? (
        <View style={styles.levelContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => setStartOver(false)}
              style={styles.button}
            >
              <Text style={styles.levelText}>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setStartOver(false)}
              style={styles.button}
            >
              <Text style={styles.levelText}>Intermediate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setStartOver(false)}
              style={styles.button}
            >
              <Text style={styles.levelText}>Expert</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setStartOver(true)}
            style={styles.button}
          >
            <Text style={styles.levelText}>Start Over</Text>
          </TouchableOpacity>
          <MineField startOver={startOver} />
        </>
      )}
    </View>
  );
};

export default MineSweeper;
