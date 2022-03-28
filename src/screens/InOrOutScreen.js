import React, { useState, useContext , useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ChoiceButton from '../components/atoms/ChoiceButton';
import InOrOut from '../components/molecules/InOrOut';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';

import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function InOrOutScreen( {navigation} ) {
  
  const { inShop, setInShop } = useContext(InShopContext);
  const { getShopsList, getShop, shop, shopsList } = useContext(DatabaseContext);
  
  //const inShopPress = () => {setInShop(1),navigation.navigate('Main')}; 
  const outShopPress = () => {setInShop(-1),navigation.navigate('Main')};

  const shopButtonPress = (shopId) => {
    getShop(shopId);
    navigation.navigate('Main');
  };

  useEffect (() => {
    getShopsList()
  },[])

  return (
    <MainTemplate>
      <View style={styles.container}>
      <Text style={styles.text}>Choisissez votre mode</Text>

      <View style={styles.button}>
        {shopsList.map((shopData) => (
          <ChoiceButton buttonTitle={shopData.name} onPress={() => shopButtonPress(shopData.shopId)} key={"Button"+shopData.shopId}/>
        ))}
      </View>

      <View style={styles.button}>
        <ChoiceButton buttonTitle='Je ne suis pas en magasin' onPress={outShopPress}/>
      </View>

    </View>
    </MainTemplate>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop:20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.DARK_GREY,
    fontSize: 20,
    justifyContent:'center',
    paddingTop: 15,
  }
});