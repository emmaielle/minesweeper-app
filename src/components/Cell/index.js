import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { CELL_STATES } from '../../constants/game';

import styles from './styles';

const Cell = ({
  coordinates,
  gameOver,
  hasMine,
  matrixSideLength,
  neighbourMines,
  onClick,
  onGameOver,
}) => {
  const [status, setStatus] = useState(CELL_STATES.INCOGNITO);

  const flexBasis = `${100 / matrixSideLength - 2}%`;

  useEffect(() => {
    if (status === CELL_STATES.EXPOSED && hasMine) {
      onGameOver();
    }
  }, [status, hasMine, onGameOver]);

  useEffect(() => {
    if (gameOver && hasMine) {
      setStatus(CELL_STATES.EXPOSED);
    }
  }, [gameOver, hasMine]);

  const handleExpose = () => {
    if (status !== CELL_STATES.EXPOSED && status !== CELL_STATES.FLAGGED) {
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

  const renderExposedIcon = () => {
    // TODO: dont show number if neighbourMines === 0
    return hasMine ? (
      <FontAwesomeIcon color="maroon" icon={faBomb} />
    ) : (
      <Text style={styles(flexBasis, neighbourMines).text}>
        {neighbourMines}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={handleExpose}
      onLongPress={toggleFlag}
      style={styles(flexBasis, neighbourMines).cell}
    >
      <View>
        {status === CELL_STATES.FLAGGED && (
          <FontAwesomeIcon color="green" icon={faFlag} />
        )}
        {status === CELL_STATES.EXPOSED && renderExposedIcon()}
      </View>
    </TouchableOpacity>
  );
};

Cell.propType = {
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  gameOver: PropTypes.bool.isRequired,
  hasMine: PropTypes.bool.isRequired,
  matrixSideLength: PropTypes.number.isRequired,
  neighbourMines: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default Cell;
