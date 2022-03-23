import React, { createContext, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import LoginTemplate from '../components/templates/LoginTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { LoginDataContext, LoginDataProvider } from '../navigation/LoginDataProvider';


import { Colors } from '../styles/index';

export const LoginInfoContext = createContext({});

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { emailData, passwordData, loginOnPress, signInOnPress } = useContext(LoginDataContext);

  return (
    <LoginDataProvider>
      <LoginTemplate signInOnPress={() => {navigation.navigate('Signup')}}/>
    </LoginDataProvider>
  )
}