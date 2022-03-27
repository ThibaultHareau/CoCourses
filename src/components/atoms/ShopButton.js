import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ShopButton({ buttonTitle, ...rest }) {
  
  return (
    <TouchableOpacity style={[styles.buttonContainer, styles.elevation]} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
      <Image source={require('../../assets/images/down_arrow.png')} style={styles.buttonImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: Mixins.windowWidth / 1.3,
    height: Mixins.windowHeight / 13,
    backgroundColor: Colors.PRIMARY,
    padding: 0.1*(Mixins.windowHeight / 15),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection:'row',
    borderRadius: 25,
    position: 'absolute',
    top: hp('23%')
  },
  buttonText: {
    right: wp('18%'),
    fontSize: 23,
    fontWeight:'bold',
    color: Colors.WHITE
  },
  elevation: {
    elevation: 3,
    shadowColor: '#52006A',
  },
  buttonImage: {
    left: wp('18%')
  }
});
