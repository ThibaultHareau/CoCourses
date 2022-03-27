import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import { AuthContext } from '../navigation/AuthProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';
import LoginButton from '../components/atoms/LoginButton';

export default function ProfileScreen ({ navigation, route }) {

    const { user, logout } = useContext(AuthContext);
    const { userData, getUser } = useContext(DatabaseContext);

    useEffect(() => {
        getUser(user.uid)
      },[]);

    return (
        <MainTemplate>
            {userData === null ? null : <Text>Profil de {userData.firstName+' '+userData.lastName}</Text>}
            <Text>{user.email}</Text>
            <LoginButton buttonTitle='Se déconnecter' onPress={() => logout()} />
        </MainTemplate>
    );
}