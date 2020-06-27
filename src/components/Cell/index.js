import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { CELL_STATES } from '../../constants/game';

import styles from './styles';

const Cell = ({ coordinates, hasMine, onClick, totalCells }) => {
  const [status, setStatus] = useState(CELL_STATES.INCOGNITO);

  const flexBasis = `${100 / totalCells - 2}%`;

  const handleClick = () => {
    if (status !== CELL_STATES.EXPOSED) {
      setStatus(CELL_STATES.EXPOSED);
    }
  };

  const toggleFlag = () => {
    if (status !== CELL_STATES.EXPOSED) {
      const newStatus =
        status === CELL_STATES.INCOGNITO
          ? CELL_STATES.FLAGGED
          : CELL_STATES.INCOGNITO;
      setStatus(newStatus);
    }
  };

  return (
    <View style={styles(flexBasis).cell}>
      <TouchableOpacity onPress={handleClick} onLongPress={toggleFlag}>
        {status === CELL_STATES.INCOGNITO && (
          <Text>
            {coordinates.x} {coordinates.y}
          </Text>
        )}
        {status === CELL_STATES.FLAGGED && <FontAwesomeIcon icon={faFlag} />}
        {status === CELL_STATES.EXPOSED && <FontAwesomeIcon icon={faBomb} />}
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
  onClick: PropTypes.func.isRequired,
  totalCells: PropTypes.number.isRequired,
};

export default Cell;
