import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Colors } from '../styles/index';

export default function ProfileScreen ({ navigation, route }) {

    return (
        <MainTemplate>
            <Text style={styles.title}>
                Fonctionnalité à venir :-)
            </Text>
        </MainTemplate>
    );
}

const styles = StyleSheet.create({
    title: {
        top: hp('5%'),
        color:Colors.ORANGE,
        fontWeight: "bold",
        fontSize: 27,
      }
})