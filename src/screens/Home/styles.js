import { StyleSheet } from 'react-native';
import { PRIMARY, WHITE } from '../../constants/theme';

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: PRIMARY,
  },
  container: {
    alignItems: 'center',
    backgroundColor: PRIMARY,
    flexGrow: 1,
    justifyContent: 'center',
  },
  centeredView: {
    alignItems: 'center',
  },
  splash: {
    justifyContent: 'center',
  },
  text: {
    color: WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
  },
});

export default styles;
