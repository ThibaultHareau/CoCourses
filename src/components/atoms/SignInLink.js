import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function SignInLink({ onPress }) {
  return (
    <TouchableOpacity
        onPress={onPress}
    >
        <Text style={styles.signInLink}>Se créer un compte</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInLink: {
    fontSize: 20,
    fontStyle: 'italic',
    color: Colors.WHITE
  }
});