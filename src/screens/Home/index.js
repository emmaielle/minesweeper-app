import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import styles from './styles';

const Home = () => {
  const handlePress = () => {};

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        contentInsetAdjustmentBehavior="automatic"
        persistentScrollbar
      >
        <View style={styles.centeredView}>
          <Text style={styles.title}>Henlo 💣</Text>
          <TouchableOpacity
            style={styles.containerBase}
            activeOpacity={0.6}
            onPress={handlePress}
          >
            <Text style={styles.titleBase}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
