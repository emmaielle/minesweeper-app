import { StyleSheet } from 'react-native';

import { PRIMARY } from '../../constants/theme';

export const styles = StyleSheet.create({
  mineSweeper: {
    alignItems: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 5,
    height: '100%',
    flexGrow: 1,
    padding: '5%',
    justifyContent: 'space-between',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
