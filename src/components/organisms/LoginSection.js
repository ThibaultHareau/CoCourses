import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LoginForm from '../molecules/LoginForm';

import { Colors } from '../../styles/index';

export default function LoginSection( {formInfo} ) {
  
  return (
    <LoginForm 
        formInfo={formInfo}
    />
  );
}
