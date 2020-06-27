import { StyleSheet } from 'react-native';
import { SECONDARY, FONT_SIZE } from '../../constants/theme';
import { NEIGHBOUR_COLORS } from '../../constants/game';

export const styles = (flexBasis, neighbourMines) => {
  return StyleSheet.create({
    cell: {
      alignItems: 'center',
      backgroundColor: SECONDARY,
      borderRadius: 5,
      flexGrow: 1,
      flexShrink: 0,
      flexBasis,
      height: 30,
      margin: '1%',
      justifyContent: 'center',
      width: 30,
    },
    text: {
      color: NEIGHBOUR_COLORS[neighbourMines],
      fontSize: FONT_SIZE.SMALL,
      fontWeight: '900',
    },
  });
};

export default styles;
