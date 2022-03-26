import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function HomeScreen( {navigation} ) {
  
  const { user, logout } = useContext(AuthContext);
  const { inShop } = useContext(InShopContext);
  const { userData, getUser } = useContext(DatabaseContext);

  useEffect(() => {
    getUser(user.uid)
  },[]);
  
  return (
    <MainTemplate>
      <Text style={styles.text}>Bienvenue {userData===null ? "" : userData.firstName}</Text>
      <Text style={styles.text}>
        {inShop===-1 ? 
        "Vous êtes en mode hors magasin" :
        "Bienvenue dans le magasin " + inShop
        }
       </Text>
      <View style={styles.button}>
        <FormButton buttonTitle='Listes' onPress={() => navigation.navigate('Lists',{userId:user.uid})} />
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
  },
  text: {
    color: Colors.DARK_GREY,
    fontSize: 20,
    justifyContent:'center',
    paddingTop: 15,
  }
});