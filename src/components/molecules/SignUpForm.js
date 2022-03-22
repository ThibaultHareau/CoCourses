import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FormButton from '../atoms/FormButton';
import FormInput from '../atoms/FormInput';
import SignInLink from '../atoms/SignInLink';

import { Colors } from '../../styles/index';

export default function SignUpForm({formInfo}) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur CoCourses</Text>
  
      <View style={styles.formInput}>
        <FormInput
          value={formInfo["emailInfo"]["value"]}
          placeholderText='Email'
          onChangeText={formInfo["emailInfo"]["change"]}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
      </View>

      <View style={styles.formInput}>
        <FormInput
          value={formInfo["passwordInfo"]["value"]}
          placeholderText='Password'
          onChangeText={formInfo["passwordInfo"]["change"]}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.button}>
        <FormButton buttonTitle='Login' onPress={formInfo["loginInfo"]["press"]}/>
      </View>

      <View style={styles.signInLink}>
        <SignInLink onPress={formInfo["signInInfo"]["press"]}/>
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