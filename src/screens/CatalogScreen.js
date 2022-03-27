import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function CatalogScreen ( {navigation, route} ) {

  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);
  const { getUser, addDepartment, departmentList, getDepartments } = useContext(DatabaseContext);

  const [name,setName] = useState("");

  // const userId = route.params.userId;

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    getDepartments(inShop)
  },[]);

  useEffect(() => {
    getUser(user.uid)
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
          placeholderText="Nom du rayon"
          onChangeText={handleNameChange}
          style={styles.input}
          key={"FormListName"}
        />
        <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} key={"AddListButton"}/>
      </View>
      {departmentList.map((list) => (
        <View key={list.uuid}>
          <Text style={styles.listName} key={"Name"+list.uuid}>{list.name}</Text>
          <FormButton buttonTitle="Details" onPress={() => navigation.navigate("Products",{deptId:list.uuid,userId:user.uid})} key={"Details"+list.uuid}/>
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