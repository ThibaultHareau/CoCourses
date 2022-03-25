import React from 'react';
import {StyleSheet,StatusBar} from 'react-native';

import LoginForm from '../molecules/LoginForm';

import LinearGradient from 'react-native-linear-gradient';

export default function LoginTemplate({signInOnPress}) {
  return (
    <LinearGradient colors={["#C5E1A5", "#C5E1A5"]} style={styles.container}>
      <StatusBar 
      barStyle='light-content' 
      backgroundColor='transparent' 
      translucent={true} 
      /> 
      <LoginForm signInOnPress={signInOnPress}/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

