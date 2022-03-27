import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ListsChoiceScreen ( {navigation, route} ) {

  const { inShop, setInShop } = useContext(InShopContext);
  const { user } = useContext(AuthContext);
  const { addItemToList, getLists, listsList } = useContext(DatabaseContext);

  const [name,setName] = useState("");
  const [lists, setLists] = useState([]);

  const userId = route.params.userId;
  const itemName = route.params.itemName;
  const itemId = route.params.itemId;
  const deptId = route.params.deptId;

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    getLists(userId)
  },[]);

  //write
  const writeToDatabase = (listId,listName) => {
    addItemToList(listId,itemId,1);
    alert("Ajout de : "+ itemName+" dans "+listName);
    navigation.navigate("ProductDetails",{deptId:deptId, productId:itemId,userId:userId})
  }

  return (
    <MainTemplate>
      <View>
        <Text>{itemName}</Text>
      </View>
      {listsList.map((list) => (
        <View key={list.uuid}>
          <FormButton buttonTitle={list.name}  key={"Button"+list.uuid} onPress={() => writeToDatabase(list.uuid,list.name)}/>
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