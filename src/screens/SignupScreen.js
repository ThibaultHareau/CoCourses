import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';

import { AuthContext } from '../providers/AuthProvider';

export default function SignupScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { register } = useContext(AuthContext);

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
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  }
});