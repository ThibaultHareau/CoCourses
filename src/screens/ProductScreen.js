import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

import database, {firebase} from '@react-native-firebase/database';
import { uid } from 'uid';


export default function ProductScreen ( {navigation, route} ) {

  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);
  const { addItem, getItems, itemList } = useContext(DatabaseContext);


  const [name,setName] = useState("");
  const [price,setPrice] = useState(null);
  const [isEdit,setIsEdit] = useState(false);
  const [tempUuid,setTempUuid] = useState("");

  const deptUid = route.params.deptUid;

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }
  const handlePriceChange=(priceInput)=>{
    setPrice(parseFloat(priceInput))
  }

  //read
  useEffect(() => {
    getItems(deptUid)
  },[]);

  const writeToDatabase = () => {
    addItem(name,price,deptUid);
    alert("Produit crée avec succès");
    setName("");
    setPrice(null);
  }

  return (
    <MainTemplate>
      <View>
        <FormInput
          value={name}
          placeholderText="Nom du produit"
          onChangeText={handleNameChange}
          style={styles.input}
        />
        <FormInput
          value={price}
          placeholderText="Prix"
          onChangeText={handlePriceChange}
          style={styles.input}
          numeric
          keyboardType="numeric"
        />
        <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} />
      </View>
      {itemList.map((list) => (
        <View >
          <Text style={styles.listName} key={list.uuid}>{list.name}</Text>
          <FormButton buttonTitle="Details" onPress={() => navigation.navigate("ProductDetails",{listUid:list.uuid})}/>
        </View>
      ))}
    </MainTemplate>
  );
}
  
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      marginTop:20
    },
    container: {
      flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
    },
    input: {
      padding:10,
      borderWidth:1,
      borderColor:'#CCC',
      width:'90%',
      marginBottom:1,
      borderRadius:5
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    listName: {
      fontSize: 28
    }
  });