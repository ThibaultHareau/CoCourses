import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';

import { Colors } from '../../styles/index';

export default function SignUpForm({formInfo}) {
  
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Create an account</Text>
    <FormInput
      value={email}
      placeholderText='Email'
      onChangeText={userEmail => setEmail(userEmail)}
      autoCapitalize='none'
      keyboardType='email-address'
      autoCorrect={false}
    />
    <FormInput
      value={password}
      placeholderText='Password'
      onChangeText={userPassword => setPassword(userPassword)}
      secureTextEntry={true}
    />
    <FormInput
      value={firstName}
      placeholderText='Prénom'
      onChangeText={userFirstName => setFirstName(userFirstName)}
    />
    <FormInput
      value={lastName}
      placeholderText='Nom'
      onChangeText={userLastName => setLastName(userLastName)}
    />
    <FormButton
      buttonTitle='Signup'
      onPress={() => register(email, password,firstName,lastName)}
    />
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
  formInput: {
    marginTop:5,
    marginBottom:5
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: Colors.PRIMARY
  },
  signInLink: {
    marginTop:15
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.DARK_GREY
  }
});