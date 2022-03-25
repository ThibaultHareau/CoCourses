import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function LoginButton({ buttonTitle, ...rest }) {

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!textInputName.trim()) {
      alert('Please Enter Name');
      return;
    }
    //Check for the Email TextInput
    if (!textInputEmail.trim()) {
      alert('Please Enter Email');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    alert('Success');
  };
  
  return (
    <TouchableOpacity style={[styles.buttonContainer, styles.elevation]} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: Mixins.windowWidth / 1.7,
    height: Mixins.windowHeight / 15,
    backgroundColor: Colors.PRIMARY,
    padding: 0.1*(Mixins.windowHeight / 15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.ORANGE
  },
  buttonText: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.WHITE
  },
  elevation: {
    elevation: 7,
    shadowColor: '#52006A',
  },
});
