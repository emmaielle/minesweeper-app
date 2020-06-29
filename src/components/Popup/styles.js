import { StyleSheet } from 'react-native';
import { BLACK, FONT_SIZE, ACCENT, SECONDARY } from '../../constants/theme';

export const styles = (visible) => {
  return StyleSheet.create({
    centeredView: {
      bottom: -150,
      display: visible ? 'flex' : 'none',
      position: 'absolute',
    },
    modalView: {
      alignItems: 'center',
      backgroundColor: SECONDARY,
      borderRadius: 15,
      elevation: 5,
      margin: 20,
      padding: 35,
      shadowColor: BLACK,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    closeIcon: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      position: 'absolute',
      right: 0,
    },
    closeIconText: {
      color: ACCENT,
      fontSize: FONT_SIZE.MEDIUM,
      fontWeight: 'bold',
    },
    text: {
      color: BLACK,
      fontSize: FONT_SIZE.MEDIUM,
    },
  });
};

export default styles;
