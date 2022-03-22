import React from 'react';
import { AuthProvider } from './AuthProvider';
import { InShopProvider } from './InShopProvider';
import { DatabaseProvider } from './DatabaseProvider';
import Routes from './Routes';
export default function Providers() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <InShopProvider>
          <Routes />
        </InShopProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}