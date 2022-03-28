import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ListsScreen ( {navigation, route} ) {

  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);
  const { addList, getLists, listsList } = useContext(DatabaseContext);

  const [name,setName] = useState("");
  const [lists, setLists] = useState([]);

  // const userId = route.params.userId;

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    getLists(user.uid)
  },[]);

  //write
  const writeToDatabase = () => {
    addList(name,user.uid,inShop,user.email);
    alert("Liste crée avec succés");
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
      {(listsList === null || listsList === undefined) ? null : 
      listsList.map((list) => (
        <View key={list.uuid}>
          <Text style={styles.listName} key={'Name'+list.uuid}>{list.name}</Text>
<<<<<<< HEAD
          <FormButton buttonTitle="Details"  key={"Button"+list.uuid} onPress={() => navigation.navigate("ListDetails",{listUid:list.uuid,listName:list.name,userId:userId,listOwner:list.owner})}/>
=======
          <FormButton buttonTitle="Details"  key={"Button"+list.uuid} onPress={() => navigation.navigate("ListDetails",{listUid:list.uuid,listName:list.name,userId:user.uid})}/>
>>>>>>> 3eeacf9c636783f4101d897aff3a7326cf42d422
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