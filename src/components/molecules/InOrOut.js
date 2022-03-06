import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import ChoiceButton from '../atoms/ChoiceButton';

import { Colors } from '../../styles/index';

export default function InOrOut() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choisissez votre mode</Text>

      <View style={styles.button}>
        <ChoiceButton buttonTitle='Je suis en magasin'/>
      </View>

      <View style={styles.button}>
        <ChoiceButton buttonTitle='Je ne suis pas en magasin'/>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop:10
  },
  container: {
    marginLeft: 10
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 10,
    color: Colors.PRIMARY
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.DARK_GREY
  }
});