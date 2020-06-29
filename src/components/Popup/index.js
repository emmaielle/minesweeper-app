import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import PropTypes from 'prop-types';

import styles from './styles';

const height = Math.round(Dimensions.get('window').height);

const Popup = ({ visible, children }) => {
  const [show, setShow] = useState(visible);

  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: show ? -(height / 1.8) : 0,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scale, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
      });
    });
  }, [show, translateY, scale]);

  const handleClose = () => setShow(false);

  return (
    <Animated.View
      style={{
        ...styles(visible).centeredView,
        transform: [{ translateY, scale }],
      }}
    >
      <View style={styles().modalView}>
        <TouchableOpacity onPress={handleClose} style={styles().closeIcon}>
          <Text style={styles().closeIconText}>&times;</Text>
        </TouchableOpacity>
        <Text style={styles().text}>{children}</Text>
      </View>
    </Animated.View>
  );
};

Popup.defaultProps = {
  children: <></>,
  visible: false,
};

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Popup;
