import React, { useState, useContext , useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import InOrOut from '../components/molecules/InOrOut';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';

import { InShopContext } from '../navigation/InShopProvider';

export default function InOrOutScreen( {navigation} ) {
  
  const { inShop, setInShop } = useContext(InShopContext);
  
  const inShopPress = () => {setInShop(1),navigation.navigate('Home')}; 
  const outShopPress = () => {setInShop(-1),navigation.navigate('Home')}; 

  return (
    <MainTemplate>
      <InOrOut inShopPress={inShopPress} outShopPress={outShopPress} />
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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  text: {
    color: Colors.DARK_GREY,
    fontSize: 20,
    justifyContent:'center',
    paddingTop: 15,
  }
});