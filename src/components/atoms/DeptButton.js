import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Colors, Mixins, Typography } from '../../styles/index';

export default function DeptButton({ buttonTitle,imageUrl, ...rest }) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Image style={styles.imageStyle} source={{uri : imageUrl}}/>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: Mixins.windowWidth / 2.5,
    height: Mixins.windowHeight / 13,
    backgroundColor: Colors.WHITE,
    padding: 0.1*(Mixins.windowHeight / 15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation:2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.DARK_GREY,
    textAlign:"center"
  },
  imageStyle : {
    alignItems: 'center',
    justifyContent: 'center',
    width:Mixins.windowWidth / 3,
    height:Mixins.windowWidth / 3,
    borderColor:Colors.ORANGE,
    borderWidth:5,
    marginLeft:1.5*Mixins.windowWidth/30
  }
});
