import React, { createContext, useState } from 'react';

export const InShopContext = createContext({});

export const InShopProvider = ({children}) => {

  const [inShop, setInShop] = useState(null);
  
  return (
    <InShopContext.Provider value={{inShop,setInShop}}>
        {children}
    </InShopContext.Provider>
  );
};