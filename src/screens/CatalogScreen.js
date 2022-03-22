import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function CatalogScreen ( {navigation} ) {

  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);
  const { addDepartment, departmentList, getDepartments } = useContext(DatabaseContext);


  const [name,setName] = useState("");

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    getDepartments(inShop)
  },[]);

  //write
  const writeToDatabase = () => {
    addDepartment(name,inShop);
    setName("");
    alert("Rayon crée avec succés");
  }

  return (
    <MainTemplate>
      <View>
        <FormInput
          value={name}
          placeholderText="Nom de la liste"
          onChangeText={handleNameChange}
          style={styles.input}
        />
        <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} />
      </View>
      {departmentList.map((list) => (
        <View >
          <Text style={styles.listName} key={list.uuid}>{list.name}</Text>
          <FormButton buttonTitle="Details" onPress={() => navigation.navigate("Products",{deptUid:list.uuid})}/>
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