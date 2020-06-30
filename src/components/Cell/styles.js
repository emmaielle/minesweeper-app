import { StyleSheet } from 'react-native';

import {
  SECONDARY,
  FONT_SIZE,
  SECONDARY_ACCENT,
  NEIGHBOUR_COLORS,
} from '../../constants/theme';

export const styles = (level, neighbourMines, exposed) => {
  return StyleSheet.create({
    cell: {
      alignItems: 'center',
      backgroundColor: exposed ? SECONDARY_ACCENT : SECONDARY,
      borderRadius: 5,
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: `${100 / level.ROWS - 2}%`,
      height: level.INDEX > 1 ? 20 : 30,
      margin: '1%',
      justifyContent: 'center',
    },
    text: {
      color: NEIGHBOUR_COLORS[neighbourMines],
      fontSize: FONT_SIZE.SMALL,
      fontWeight: '900',
    },
  });
};

export default styles;
