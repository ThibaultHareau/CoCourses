import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      defaultValue={labelValue}
      style={[styles.input, styles.elevation]}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor={Colors.WHITE}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    width: Mixins.windowWidth / 1.5,
    height: Mixins.windowHeight / 15,
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
    paddingLeft:15,
    borderColor:Colors.ORANGE,
    backgroundColor:Colors.DARK_GREEN
  },
  elevation: {
    elevation: 3,
    shadowColor: '#52006A',
  },
});