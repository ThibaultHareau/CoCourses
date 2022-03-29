import React from 'react';

import { AuthProvider } from './AuthProvider';
import { DatabaseProvider } from './DatabaseProvider';
import { StorageProvider } from './StorageProvider';

import Routes from './Routes';

export default function Providers() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <StorageProvider>
            <Routes />
        </StorageProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}