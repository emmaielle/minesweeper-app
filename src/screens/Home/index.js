import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import styles from './styles';
import MineSweeper from '../../components/MineSweeper';

const ScreenStates = {
  intro: 'INTRO',
  game: 'GAME',
  gameOver: 'GAME_OVER',
};

const Home = () => {
  const [screenState, setScreenState] = useState(ScreenStates.intro);

  const handlePress = () => setScreenState(ScreenStates.game);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="scrollableAxes"
        persistentScrollbar
      >
        {screenState === ScreenStates.intro && (
          <View style={styles.centeredView}>
            <Text style={{ ...styles.title, ...styles.text }}>Henlo 💣</Text>
            <TouchableOpacity
              style={styles.containerBase}
              activeOpacity={0.6}
              onPress={handlePress}
            >
              <Text style={{ ...styles.titleBase, ...styles.text }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {screenState === ScreenStates.game && <MineSweeper />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
