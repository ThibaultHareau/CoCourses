import React from 'react';
import { AuthProvider } from './AuthProvider';
import { InShopProvider } from './InShopProvider';
import Routes from './Routes';
export default function Providers() {
  return (
    <AuthProvider>
      <InShopProvider>
        <Routes />
      </InShopProvider>
    </AuthProvider>
  );
}