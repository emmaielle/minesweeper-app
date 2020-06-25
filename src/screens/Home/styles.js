import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: '100%',
    justifyContent: 'space-evenly',
  },
  centeredView: {
    alignItems: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
  },
});

export default styles;
