import React, {useContext} from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import FormButton from '../atoms/FormButton';
import FormInput from '../atoms/FormInput';
import SignInLink from '../atoms/SignInLink';
import LoginButton from '../atoms/LoginButton';
import LoginInput from '../atoms/LoginInput';

import { LoginDataContext } from '../../navigation/LoginDataProvider';

import { Colors } from '../../styles/index';
import { color } from 'react-native-reanimated';

export default function LoginForm({signInOnPress}) {

  const { emailData, passwordData, loginOnPress } = useContext(LoginDataContext);
  
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Logo.png")} style={styles.image}/>
      <Text style={styles.text}>Bienvenue sur CoCourses</Text>
  
      <View style={styles.formInput}>
        <LoginInput
          value={emailData.email}
          placeholderText='Email'
          onChangeText={emailData.setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
      </View>

      <View style={styles.formInput}>
        <LoginInput
          value={passwordData.password}
          placeholderText='Mot de passe'
          onChangeText={passwordData.setPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.button}>
        <LoginButton buttonTitle='Se connecter' onPress={loginOnPress}/>
      </View>

      <View style={styles.signInLink}>
        <SignInLink onPress={signInOnPress}/>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop:hp('10%')
  },
  image: {
    width: wp('27%'),
    height: hp('13%'),
    marginBottom:hp('5%')
  },
  container: {
    display:'flex',
    // marginLeft: 10,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    gap:hp('10%')
  },
  formInput: {
    marginTop:5,
    marginBottom:5,
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
    marginBottom: hp('5%'),
    color: Colors.WHITE,
    fontWeight:'bold'
  }
});