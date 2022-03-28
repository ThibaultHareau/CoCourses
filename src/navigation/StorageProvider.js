import React, { createContext, useState } from 'react';

import storage, {getDownloadURL} from '@react-native-firebase/storage';

export const StorageContext = createContext({});

import { uid } from 'uid';

export const StorageProvider = ({ children }) => {

  const [imageUrl,setImageUrl] = useState();

  return (
    <StorageContext.Provider
      value={{
        imageUrl,
        getImage : async (itemId) => {
          let imageRef = storage().ref('items/'+itemId+'.jpg');
          await imageRef.getDownloadURL().then((url) => {
              //from url you can fetched the uploaded image easily
              console.log(url);
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