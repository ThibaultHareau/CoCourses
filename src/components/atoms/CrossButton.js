import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function CrossButton({ ...rest }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>x</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: Mixins.windowWidth / 7,
    height: Mixins.windowHeight / 14,
    backgroundColor: Colors.RED,
    // padding: 0.1*(Mixins.windowHeight / 20),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation:2,
    marginBottom:10,
    marginLeft:5
  },
  buttonText: {
    fontSize: 30,
    // fontWeight:'bold',
    color: Colors.DARK_GREY,
    marginBottom:8
  }
});
