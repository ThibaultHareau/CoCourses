import React from 'react';

import { AuthProvider } from '../providers/AuthProvider';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { StorageProvider } from '../providers/StorageProvider';

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