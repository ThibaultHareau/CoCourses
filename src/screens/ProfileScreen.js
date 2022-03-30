import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LoginButton from '../components/atoms/LoginButton';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../providers/AuthProvider';
import { DatabaseContext } from '../providers/DatabaseProvider';

import { Colors } from '../styles/index';

export default function ProfileScreen ({ navigation, route }) {

    const { user, logout } = useContext(AuthContext);
    const { userData, getUser } = useContext(DatabaseContext);

    useEffect(() => {
        getUser(user.uid)
      },[]);

    return (
        <MainTemplate>
            <View style={styles.container}>
                {userData === null ? null : <Text style={styles.title}>Profil de {userData.firstName+' '+userData.lastName}</Text>}
                <Text style={styles.text}> Votre adresse mail :</Text>
                <Text style={styles.text}>{user.email}</Text>
                <LoginButton buttonTitle='Se déconnecter' onPress={() => logout()} />
            </View>
        </MainTemplate>
    );
}

const styles = StyleSheet.create({
    title: {
        bottom: hp('7%'),
        color:Colors.ORANGE,
        fontWeight: "bold",
        fontSize: 27,
      },
    text: {
        fontWeight: "bold",
        fontSize: 22,
        bottom: hp('5%'),
    },
    container: {
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        gap:hp('10%')
    }
})