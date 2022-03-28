import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PlusButton({ ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <Image source={require("../../assets/images/Plus.png")} style={styles.icon} />
        </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
      icon: {
        width: wp('20%'),
        resizeMode:'contain'
      }
  });