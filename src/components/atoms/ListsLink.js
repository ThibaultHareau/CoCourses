import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SignInLink({ onPress }) {
  return (
    <TouchableOpacity
        onPress={onPress}
    >
        <Text style={styles.signInLink}>Vos listes</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signInLink: {
    position: 'absolute',
    bottom:370,
    right: wp('11%'),
    color: Colors.DARK_GREY,
    fontWeight: "bold",
    fontSize: 27,
  }
});