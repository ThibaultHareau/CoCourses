import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import InOrOutScreen from '../screens/InOrOutScreen';

const Stack = createStackNavigator();

export default function HomeStack() {

  const [inShop,setInShop] = useState(null);

  return (
    <Stack.Navigator initialRouteName='InOrOut'>
      <Stack.Screen name='InOrOut' component={InOrOutScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}