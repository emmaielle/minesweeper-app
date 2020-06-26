import { StyleSheet } from 'react-native';

import { PRIMARY, WHITE, FONT_SIZE } from '../../constants/theme';

const styles = StyleSheet.create({
  mineSweeper: {
    alignItems: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 5,
    flexGrow: 1,
    padding: '5%',
    justifyContent: 'space-between',
  },
  title: {
    color: WHITE,
    fontSize: FONT_SIZE.LARGE,
  },
});

export default styles;
