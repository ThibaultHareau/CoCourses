import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavBar from '../components/molecules/NavBar';

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

import { Colors } from '../styles/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackHome = createStackNavigator();
const StackCatalog = createStackNavigator();
const { width, height } = Dimensions.get("window")

function StackHomeScreen() {
  return (
    <StackHome.Navigator initialRouteName='Home' screenOptions={{
      headerStyle: styles.header,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackImageSource:"../assets/images/BackArrow.png",
    }}>
      <StackHome.Screen name='Home' component={HomeScreen} options={{ header: () => null }} />
      {/* <StackHome.Screen name='Lists' component={ListsScreen} />
      <StackHome.Screen name='ListsChoice' component={ListsChoiceScreen} /> */}
      <StackHome.Screen name='ListDetails' component={ListDetailScreen} options={({ route }) => ({ title: route.params.listName })} />
    </StackHome.Navigator>
  )
}

function StackCatalogScreen() {
  return (
    <StackCatalog.Navigator initialRouteName='Catalogue' screenOptions={{
      headerStyle: styles.header,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackImageSource:'../assets/images/BackArrow.png',
    }}>
      <StackCatalog.Screen name='Catalog' component={CatalogScreen} options={{ header: () => null }} />
      <StackCatalog.Screen name='ProductDetails' component={ProductDetailScreen} options={({ route }) => ({ title: route.params.productName })} />
      <StackCatalog.Screen name='Products' component={ProductScreen} options={({ route }) => ({ title: route.params.deptName })} />
    </StackCatalog.Navigator>
  )
}

function TabNav() {
  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />} initialRouteName='Accueil' screenOptions={{ tabBarHideOnKeyboard: true }} >
      <Tab.Screen name="Accueil" component={StackHomeScreen} options={{ header: () => null }} />
      <Tab.Screen name="Catalogue" component={StackCatalogScreen} options={{ header: () => null }} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ header: () => null }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ header: () => null }} />
    </Tab.Navigator>
  )
}

export default function HomeStack() {

  const [inShop, setInShop] = useState(null);

  return (
    <View style={{ width, height, }}>
      <Stack.Navigator initialRouteName='InOrOut'>
        <Stack.Screen name='InOrOut' component={InOrOutScreen} options={{ header: () => null }} />
        <Stack.Screen name='Main' component={TabNav} options={{ header: () => null }} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp('10%'),
    height: hp('12%'),
    resizeMode: 'contain'
  },
  header: {
    backgroundColor: '#F7E7D5'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
})