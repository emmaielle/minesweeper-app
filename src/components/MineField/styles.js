import { StyleSheet } from 'react-native';

import { WHITE, FONT_SIZE } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '1%',
  },
  cells: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    padding: 4,
  },
  info: {
    color: WHITE,
    fontSize: FONT_SIZE.SMALL,
  },
});

export default styles;
