import { StyleSheet } from 'react-native';
import { SECONDARY } from '../../constants/theme';

export const styles = (flexBasis) => {
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
  });
};

export default styles;
