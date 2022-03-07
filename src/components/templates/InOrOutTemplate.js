import React from 'react';

import InOrOut from '../molecules/InOrOut';

export default function InOrOutTemplate( {inShopPress,outShopPress}) {
  
  return (
    <InOrOut inShopPress={inShopPress} outShopPress={outShopPress} />
  );
}