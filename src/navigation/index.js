import React from 'react';

import { AuthProvider } from './AuthProvider';
import { InShopProvider } from './InShopProvider';
import { DatabaseProvider } from './DatabaseProvider';
import { StorageProvider } from './StorageProvider';

import Routes from './Routes';

export default function Providers() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <StorageProvider>
          <InShopProvider>
            <Routes />
          </InShopProvider>
        </StorageProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}