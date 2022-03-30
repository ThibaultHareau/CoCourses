import React, { createContext, useState } from 'react';

import storage, {getDownloadURL} from '@react-native-firebase/storage';

export const StorageContext = createContext({});

import { uid } from 'uid';

export const StorageProvider = ({ children }) => {

  const [imageUrl,setImageUrl] = useState(null);

  return (
    <StorageContext.Provider
      value={{
        imageUrl,
        getImage : async (elementId,path) => {
          setImageUrl(null);
          let imageRef = storage().ref(path+elementId+'.jpg');
          await imageRef.getDownloadURL().then((url) => {
              setImageUrl(url)
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
        }
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};