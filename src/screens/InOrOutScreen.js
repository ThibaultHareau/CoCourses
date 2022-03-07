import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import InOrOutTemplate from '../components/templates/InOrOutTemplate';

import { Colors } from '../styles/index';

import { AuthContext } from '../navigation/AuthProvider';

export default function InOrOutScreen( {navigation} ) {
  
  const [inShop, setInShop] = useState(null);
  const { user, logout } = useContext(AuthContext);
  
  const inShopPress = () => {navigation.navigate('Home');setInShop(1);console.log(inShop)}; 
  const outShopPress = () => {navigation.navigate('Home');setInShop(-1);console.log(inShop)}; 

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