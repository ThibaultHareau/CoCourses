import React, { createContext, useState } from 'react';
import database , {firebase} from '@react-native-firebase/database';

export const DatabaseContext = createContext({});

export const DatabaseProvider = ({ children }) => {
    
  const [userData, setUser] = useState(null);
  
  return (

    <DatabaseContext.Provider
      value={{
        userData,
        setUser,
        getUser : (useruid) => {
          database()
          .ref('/users/'+useruid)
          .on('value', snapshot => {
            setUser(null)
            let data = snapshot.val();
            if (data !== null) {
              setUser(data)
            }
          });
        }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};