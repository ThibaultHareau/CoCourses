import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DynamicListScreen from '../screens/DynamicListScreen';
import InOrOutScreen from '../screens/InOrOutScreen';
import ListDetailScreen from '../screens/ListDetailScreen';
import CatalogScreen from '../screens/CatalogScreen';
import CatalogDetailScreen from '../screens/CatalogDetailScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

export default function HomeStack() {

  const [inShop,setInShop] = useState(null);

  return (
    <Stack.Navigator initialRouteName='InOrOut'>
      <Stack.Screen name='InOrOut' component={InOrOutScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Lists' component={DynamicListScreen} />
      <Stack.Screen name='ListDetails' component={ListDetailScreen}/>
      <Stack.Screen name='Catalog' component={CatalogScreen}/>
      <Stack.Screen name='CatalogDetails' component={CatalogDetailScreen}/>
      <Stack.Screen name='Products' component={ProductScreen}/>
    </Stack.Navigator>
  );
}