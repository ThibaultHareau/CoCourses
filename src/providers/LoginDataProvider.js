import React, { createContext, useContext, useState } from 'react';

import { AuthContext } from './AuthProvider';

export const LoginDataContext = createContext({});

export const LoginDataProvider = ({ children , navigation }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

  return (
    <LoginDataContext.Provider
        value={{
            emailData : {
              email,
              setEmail
            },
            passwordData : {
              password,
              setPassword
            },
            loginOnPress : () => {login(email, password) }
        }}
    >
      {children}
    </LoginDataContext.Provider>
  );
};