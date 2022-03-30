import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Colors, Mixins, Spacing, Typography } from '../../styles/index';

export default function ProductButton({ buttonTitle, ...rest }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: Mixins.windowWidth / 1.4,
    height: Mixins.windowHeight / 13,
    backgroundColor: Colors.WHITE,
    padding: 0.1*(Mixins.windowHeight / 15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation:2,
    marginBottom:10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.DARK_GREY
  }
});