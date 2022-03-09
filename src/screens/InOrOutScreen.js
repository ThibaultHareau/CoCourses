import React, { useState, useContext , useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import InOrOutTemplate from '../components/templates/InOrOutTemplate';

import { Colors } from '../styles/index';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';

export default function InOrOutScreen( {navigation} ) {
  
  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);
  
  const inShopPress = () => {setInShop(1),navigation.navigate('Home')}; 
  const outShopPress = () => {setInShop(-1),navigation.navigate('Home')}; 

  return (
    <View style={styles.container}>
      <InOrOutTemplate inShopPress={inShopPress} outShopPress={outShopPress} />
    </View>
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