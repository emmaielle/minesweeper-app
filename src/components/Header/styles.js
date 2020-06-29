import { StyleSheet } from 'react-native';
import {
  WHITE,
  FONT_SIZE,
  SECONDARY_ACCENT,
  ACCENT,
  BLACK,
} from '../../constants/theme';

const styles = (selected) => {
  return StyleSheet.create({
    title: {
      color: WHITE,
      fontSize: FONT_SIZE.LARGE,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      marginTop: 16,
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
      color: selected ? BLACK : WHITE,
      fontSize: FONT_SIZE.MEDIUM,
      textTransform: 'capitalize',
    },
  });
};

export default styles;
