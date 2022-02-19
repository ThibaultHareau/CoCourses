import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import LoginTemplate from '../components/templates/LoginTemplate';

import { AuthContext } from '../navigation/AuthProvider';

import { Colors } from '../styles/index';


export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const setEmailValue = (userEmail) => {setEmail(userEmail)}
  const setPasswordValue = (userPassword) => {setPassword(userPassword)}
  const loginOnPress = () => {login(email, password) }
  const signInOnPress = () => {navigation.navigate('Signup')}

  const formInfo = {
    emailInfo : {
      value:email,
      change:setEmailValue
    },
    passwordInfo : {
      value:password,
      change:setPasswordValue
    },
    loginInfo: {
      press:loginOnPress
    },
    signInInfo: {
      press:signInOnPress
    }
  }

  return (
    <LoginTemplate
      formInfo={formInfo}
    />
  )
}