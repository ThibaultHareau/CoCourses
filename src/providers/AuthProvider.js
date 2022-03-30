import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import database, {firebase} from '@react-native-firebase/database';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password,firstName,lastName) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.database().ref('users/' + res.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                uid: res.user.uid
              })
          })
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};