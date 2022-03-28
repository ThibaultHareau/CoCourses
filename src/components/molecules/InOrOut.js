import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import ChoiceButton from '../atoms/ChoiceButton';

import { Colors } from '../../styles/index';

export default function InOrOut({shopsList, inShopPress,outShopPress, shopButtonPress}) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choisissez votre mode</Text>

      <View style={styles.button}>
        {shopsList.map((shop) => (
          <ChoiceButton buttonTitle={shop.name} onPress={inShopPress}/>
        ))}
        
      </View>

      <View style={styles.button}>
        <ChoiceButton buttonTitle='Je ne suis pas en magasin' onPress={outShopPress}/>
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