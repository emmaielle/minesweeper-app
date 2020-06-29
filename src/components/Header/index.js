import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { LEVELS } from '../../constants/game';

import styles from './styles';

const Header = ({ currentLevel, onChangeLevel }) => (
  <>
    <Text style={styles().title}>MineSweeper</Text>
    <View style={styles().buttonsContainer}>
      {LEVELS.map((level, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onChangeLevel(index)}
          style={styles(level.NAME === currentLevel.NAME).button}
        >
          <Text style={styles(level.NAME === currentLevel.NAME).levelText}>
            {level.NAME}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </>
);

Header.defaultProps = {
  currentLevel: LEVELS[0],
  onChangeLevel: () => {},
};

Header.propTypes = {
  currentLevel: PropTypes.shape(),
  onChangeLevel: PropTypes.func.isRequired,
};

export default Header;
