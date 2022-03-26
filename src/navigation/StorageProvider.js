import React, { createContext, useState } from 'react';

import storage from '@react-native-firebase/storage';

export const StorageContext = createContext({});

import { uid } from 'uid';

export const StorageProvider = ({ children }) => {

  const [imageUrl,setImageUrl] = useState('');

  return (
    <StorageContext.Provider
      value={{
        getImage : (itemId) => {
          let imageRef = storage().ref(itemId+'.jpg');
          console.log(imageRef);
          imageRef
            .getDownloadURL()
            .then((url) => {
              //from url you can fetched the uploaded image easily
              setImageUrl(url);
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
        }
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};