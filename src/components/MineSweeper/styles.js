import { StyleSheet } from 'react-native';

import {
  PRIMARY,
  WHITE,
  FONT_SIZE,
  ACCENT,
  SECONDARY_ACCENT,
} from '../../constants/theme';

export const styles = (selected) => {
  return StyleSheet.create({
    mineSweeper: {
      alignItems: 'center',
      backgroundColor: PRIMARY,
      borderRadius: 5,
      // flex: 0,
      height: '100%',
      flexGrow: 1,
      padding: '5%',
      justifyContent: 'space-between',
    },
    title: {
      color: WHITE,
      fontSize: FONT_SIZE.LARGE,
    },
    levelContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    buttonsContainer: {
      alignItems: 'center',
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: selected ? SECONDARY_ACCENT : ACCENT,
      borderRadius: 10,
      marginHorizontal: 3,
      marginVertical: 10,
      paddingHorizontal: 11,
      paddingVertical: 5,
    },
    levelText: {
      color: WHITE,
      fontSize: FONT_SIZE.MEDIUM,
      textTransform: 'capitalize',
    },
  });
};

export default styles;
