import React, {useContext} from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FormButton from '../atoms/FormButton';
import FormInput from '../atoms/FormInput';
import SignInLink from '../atoms/SignInLink';

import { LoginDataContext } from '../../navigation/LoginDataProvider';

import { Colors } from '../../styles/index';

export default function LoginForm({signInOnPress}) {

  const { emailData, passwordData, loginOnPress } = useContext(LoginDataContext);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur CoCourses</Text>
  
      <View style={styles.formInput}>
        <FormInput
          value={emailData.email}
          placeholderText='Email'
          onChangeText={emailData.setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
      </View>

      <View style={styles.formInput}>
        <FormInput
          value={passwordData.password}
          placeholderText='Password'
          onChangeText={passwordData.setPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.button}>
        <FormButton buttonTitle='Login' onPress={loginOnPress}/>
      </View>

      <View style={styles.signInLink}>
        <SignInLink onPress={signInOnPress}/>
      </View>

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