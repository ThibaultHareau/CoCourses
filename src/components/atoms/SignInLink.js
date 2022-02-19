import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function SignInLink({ onPress }) {
  return (
    <TouchableOpacity
        onPress={onPress}
    >
        <Text style={styles.signInLink}>New user? Join here</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInLink: {
    fontSize: 20,
    color: Colors.PRIMARY
  }
});