import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

import styles from './styles';

const Cell = ({ totalCells, coordinates, hasMine }) => {
  const flexBasis = `${100 / totalCells - 2}%`;

  return (
    <View style={styles(flexBasis).cell}>
      <TouchableOpacity>
        <Text>
          <FontAwesomeIcon icon={faFlag} />
          {coordinates.x} {coordinates.y}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Cell.propType = {
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  hasMine: PropTypes.bool.isRequired,
  totalCells: PropTypes.number.isRequired,
};

export default Cell;
