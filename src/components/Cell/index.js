import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { CELL_STATES, LEVELS } from '../../constants/game';
import { getMatrixSideLength } from '../../utils/minesweeper';

import styles from './styles';

const Cell = ({
  coordinates,
  exposed,
  gameLost,
  hasMine,
  matrixSideLength,
  neighbourMines,
  onClick,
  onFlag,
  onGameLost,
}) => {
  const [status, setStatus] = useState(CELL_STATES.INCOGNITO);

  const flexBasis = `${100 / matrixSideLength - 2}%`;

  useEffect(() => {
    if (exposed && status !== CELL_STATES.FLAGGED) {
      setStatus(CELL_STATES.EXPOSED);
    }
  }, [exposed, status]);

  useEffect(() => {
    if (status === CELL_STATES.EXPOSED && hasMine) {
      onGameLost();
    }
  }, [status, hasMine, onGameLost]);

  useEffect(() => {
    if (gameLost && hasMine) {
      setStatus(CELL_STATES.EXPOSED);
    }
  }, [gameLost, hasMine]);

  const handleExpose = () => {
    if (
      !gameLost &&
      status !== CELL_STATES.EXPOSED &&
      status !== CELL_STATES.FLAGGED
    ) {
      setStatus(CELL_STATES.EXPOSED);

      if (!hasMine) {
        onClick(coordinates);
      }
    }
  };

  const handleToggleFlag = () => {
    if (!gameLost && status !== CELL_STATES.EXPOSED) {
      const newStatus =
        status === CELL_STATES.INCOGNITO
          ? CELL_STATES.FLAGGED
          : CELL_STATES.INCOGNITO;

      setStatus(newStatus);
      onFlag(newStatus);
    }
  };

  const renderExposedIcon = () => {
    const safeCellContent =
      neighbourMines !== 0 ? (
        <Text style={styles(flexBasis, neighbourMines).text}>
          {neighbourMines}
        </Text>
      ) : null;

    return hasMine ? (
      <FontAwesomeIcon color="maroon" icon={faBomb} />
    ) : (
      safeCellContent
    );
  };

  return (
    <TouchableOpacity
      onPress={handleExpose}
      onLongPress={handleToggleFlag}
      style={
        styles(flexBasis, neighbourMines, status === CELL_STATES.EXPOSED).cell
      }
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

Cell.defaultProps = {
  exposed: false,
  gameLost: false,
  hasMine: false,
  matrixSideLength: getMatrixSideLength(LEVELS[0]),
  neighbourMines: 0,
  onClick: () => {},
  onFlag: () => {},
  onGameLost: () => {},
};

Cell.propType = {
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  exposed: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  hasMine: PropTypes.bool.isRequired,
  matrixSideLength: PropTypes.number.isRequired,
  neighbourMines: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onFlag: PropTypes.func.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default Cell;
