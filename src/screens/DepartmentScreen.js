import React, { Components, useContext, useState, useEffect } from 'react';
import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import DeptButton from '../components/atoms/DeptButton';
import MainTemplate from '../components/templates/MainTemplate';

import { DatabaseContext } from '../navigation/DatabaseProvider';
import { StorageContext } from '../navigation/StorageProvider';

export default function DepartmentScreen({ navigation, route }) {

  const { /*addItem,*/ getItems, itemList } = useContext(DatabaseContext); // Données sur les produits d'un rayon
  const { userData } = useContext(DatabaseContext); // Données utilisateur 
  const { getImage } = useContext(StorageContext); // Données utilisateur 

  // const [name, setName] = useState(""); // Formulaire pour créer un produit
  // const handleNameChange = (textInput) => {
  //   setName(textInput)
  // }
  
  // const [price, setPrice] = useState(null);  // Formulaire pour créer un produit
  // const handlePriceChange = (priceInput) => {
  //   setPrice(parseFloat(priceInput))
  // }

  // const writeToDatabase = () => {
  //   addItem(name, price, deptId);
  //   alert("Produit crée avec succès");
  //   setName("");
  //   setPrice(null);
  // }

  const deptId = route.params.deptId;
  const deptName = route.params.deptName;

  // Récupération des produits de la liste
  useEffect(() => {
    getItems(deptId)
  }, []);

  return (
    <MainTemplate>
      {/* <View> */}
      {/* <FormInput
          value={name}
          placeholderText="Nom du produit"
          onChangeText={handleNameChange}
          style={styles.input}
          key={"Name"}
        />
        <FormInput
          value={price}
          placeholderText="Prix"
          onChangeText={handlePriceChange}
          style={styles.input}
          numeric
          keyboardType="numeric"
          key={"Price"}
        />
        <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} /> */}
      <Text style={styles.listName}>Vous êtes dans le rayon {deptName}</Text>
      {/* </View> */}
      {itemList.map((list) => (
        <View key={list.uuid}>
          {/* <Text style={styles.listName} key={'Name'+list.uuid}>{list.name}</Text> */}
          <DeptButton buttonTitle={list.name} onPress={() => navigation.navigate("ProductDetails", { deptId: deptId, productId: list.uuid, userId: userData.uid, productName:list.name })} key={"Details" + list.uuid} />
        </View>
      ))}
    </MainTemplate>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    width: '90%',
    marginBottom: 1,
    borderRadius: 5
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  listName: {
    fontSize: 28,
    // top: 0,
    marginBottom: 40,
    textAlign: 'center'
  }
});