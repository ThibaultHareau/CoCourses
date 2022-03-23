import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ListsScreen from '../screens/ListsScreen';
import ListsChoiceScreen from '../screens/ListsChoiceScreen';
import InOrOutScreen from '../screens/InOrOutScreen';
import ListDetailScreen from '../screens/ListDetailScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

export default function HomeStack() {

  const [inShop,setInShop] = useState(null);

  return (
    <Stack.Navigator initialRouteName='InOrOut'>
      <Stack.Screen name='InOrOut' component={InOrOutScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Lists' component={ListsScreen} />
      <Stack.Screen name='ListsChoice' component={ListsChoiceScreen} />
      <Stack.Screen name='ListDetails' component={ListDetailScreen}/>
      <Stack.Screen name='Catalog' component={CatalogScreen}/>
      <Stack.Screen name='ProductDetails' component={ProductDetailScreen}/>
      <Stack.Screen name='Products' component={ProductScreen}/>
    </Stack.Navigator>
  );
}