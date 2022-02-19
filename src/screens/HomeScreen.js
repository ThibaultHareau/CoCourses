import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormButton from '../components/atoms/FormButton';

import { Colors } from '../styles/index';

import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen() {
  
  const { user, logout } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome user {user.uid}</Text>
      <View style={styles.button}>
        <FormButton buttonTitle='Logout' onPress={() => logout()} />
      </View>
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