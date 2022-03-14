import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';

import database, {firebase} from '@react-native-firebase/database';
import { uid } from 'uid';


export default function DynamicListScreen ( {navigation} ) {
  const reference = firebase
  .app()
  .database('https://cocourses-cbe6a-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref('Lists');

  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);


  const [name,setName] = useState("");
  const [lists, setLists] = useState([]);
  const [isEdit,setIsEdit] = useState(false);
  const [tempUuid,setTempUuid] = useState("");

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    database()
    .ref('/lists')
    .on('value', snapshot => {
      setLists([]);
      let data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((list) => {
          /*setLists(oldArray => [...oldArray, list])*/
          if (list.owner === user.uid){
            setLists(oldArray => [...oldArray, list])
          } 
        })
      }
    });
  },[]);

  //write
  const writeToDatabase = () => {
    const uuid = uid()
    database()
      .ref('/lists/'+uuid)
      .set({
        uuid,
        name,
        items : {0 : {quantity:0,inCart:false}},
        owner : user.uid,
        creationDate : Date.now(),
        updateDate : Date.now(),
        shopId : inShop
      });
    setName("");
    alert("Liste crée avec succés");
  }

  //delete
  const handleListDelete = async (list) => {
    await database().ref('/lists/'+list.uuid).remove();
  }

  //update
  const handleListUpdate = (list) => {
    setIsEdit(true);
    setTempUuid(list.uuid);
  }
  const handleListSubmitChange = () => {
    database()
      .ref('/lists/'+tempUuid)
      .update({
        name: name,
        updateDate : Date.now()
      })
    setIsEdit(false);
    setName("");
  }


  return (
    <MainTemplate>
      <FormInput
          value={name}
          placeholderText="Nom de la liste"
          onChangeText={handleNameChange}
          style={styles.input}
        />
      {isEdit ? 
        <View style={styles.button}>
          <FormButton buttonTitle='Ecraser' onPress={handleListSubmitChange} />
          <FormButton buttonTitle='X' onPress={() => setIsEdit(false)} />
        </View>
          : 
        <View style={styles.button}>
          <FormButton buttonTitle='Entrer' onPress={writeToDatabase} />
       </View>  
      }
      {lists.map((list) => (
        <View >
          <Text style={styles.listName} key={list.uuid}>{list.name}</Text>
          <FormButton buttonTitle='Supprimer' onPress={() => handleListDelete(list)} key={"delete"+list.uuid.toString()}/>
          <FormButton buttonTitle='Modifier' onPress={() => handleListUpdate(list)} key={"update"+list.uuid.toString()}/>
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