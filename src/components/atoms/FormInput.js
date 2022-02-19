import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      defaultValue={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor={Colors.MIDDLE_GREY}
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
    borderRadius: 8,
    borderWidth: 1
  }
});