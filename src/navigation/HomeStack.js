import React , { useState } from 'react';
import {StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ListsScreen from '../screens/ListsScreen';
import ListsChoiceScreen from '../screens/ListsChoiceScreen';
import InOrOutScreen from '../screens/InOrOutScreen';
import ListDetailScreen from '../screens/ListDetailScreen';
import CatalogScreen from '../screens/CatalogScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductScreen from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScanScreen from '../screens/ScanScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavBar from '../components/molecules/NavBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackHome = createStackNavigator();
const StackCatalog = createStackNavigator();

function StackHomeScreen() {
  return (
    <StackHome.Navigator initialRouteName='Home'>
      <StackHome.Screen name='Home' component={HomeScreen} options={{ header: () => null }}/>
      <StackHome.Screen name='Lists' component={ListsScreen} />
      <StackHome.Screen name='ListsChoice' component={ListsChoiceScreen} />
      <StackHome.Screen name='ListDetails' component={ListDetailScreen}/>
    </StackHome.Navigator>
  )
}

function StackCatalogScreen() {
  return (
    <StackCatalog.Navigator initialRouteName='Catalogue'>
      <StackCatalog.Screen name='Catalog' component={CatalogScreen} options={{ header: () => null }}/>
      <StackCatalog.Screen name='ProductDetails' component={ProductDetailScreen}/>
      <StackCatalog.Screen name='Products' component={ProductScreen}/>
    </StackCatalog.Navigator>
  )
}

function TabNav() {
  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />} initialRouteName='Accueil'>
      <Tab.Screen name="Accueil" component={StackHomeScreen} options={{ header: () => null }} />
      <Tab.Screen name="Catalogue" component={StackCatalogScreen} options={{ header: () => null }} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ header: () => null}} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ header: () => null }} />
    </Tab.Navigator>
  )
}

export default function HomeStack() {

  const [inShop,setInShop] = useState(null);

  return (
    <Stack.Navigator initialRouteName='InOrOut'>
      <Stack.Screen name='InOrOut' component={InOrOutScreen} options={{ header: () => null }}/>
      {/* <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Lists' component={ListsScreen} />
      <Stack.Screen name='ListsChoice' component={ListsChoiceScreen} />
      <Stack.Screen name='ListDetails' component={ListDetailScreen}/>
      <Stack.Screen name='Catalog' component={CatalogScreen}/>
      <Stack.Screen name='ProductDetails' component={ProductDetailScreen}/>
      <Stack.Screen name='Products' component={ProductScreen}/> */}
      <Stack.Screen name='Main' component={TabNav} options={{ header: () => null }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp('10%'),
    height: hp('12%'),
    resizeMode: 'contain'
  }
})