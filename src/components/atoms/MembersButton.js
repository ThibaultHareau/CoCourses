import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PlusButton({ ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <Image source={require("../../assets/images/Members.png")} style={styles.icon} />
        </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
      icon: {
        width: wp('10%'),
        resizeMode:'contain'
      }
  });