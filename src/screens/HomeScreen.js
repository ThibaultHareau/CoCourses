import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';

export default function HomeScreen( {navigation} ) {
  
  const { user, logout } = useContext(AuthContext);
  const { inShop } = useContext(InShopContext);
  
  return (
    <MainTemplate>
      <Text style={styles.text}>Welcome {user.email}</Text>
      <Text style={styles.text}>
        {inShop===-1 ? 
        "Vous êtes en mode hors magasin" :
        "Bienvenue dans le magasin " + inShop
        }
       </Text>
      <View style={styles.button}>
        <FormButton buttonTitle='Logout' onPress={() => logout()} />
        <FormButton buttonTitle='Listes' onPress={() => navigation.navigate('Lists')} />
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