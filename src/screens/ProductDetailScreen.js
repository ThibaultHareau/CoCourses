import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';

import database, {firebase} from '@react-native-firebase/database';
import { uid } from 'uid';


export default function ProductDetailScreen ( {navigation, route} ) {
    const reference = firebase
    .app()
    .database('https://cocourses-cbe6a-default-rtdb.europe-west1.firebasedatabase.app/')
    .ref('/');
  
    const { inShop, setInShop } = useContext(InShopContext);
    const { user, logout } = useContext(AuthContext);
  
  
    const [text,setText] = useState("");
    const [lists, setLists] = useState([]);
    const [isEdit,setIsEdit] = useState(false);

    const listUid = route.params.listUid;
  
    const handleChange=(textInput)=>{
      setText(textInput)
    }
  
    //read in database
    const readDatabase = (path,dbParam,param,setState) => {
      database()
      .ref(path)
      .on('value', snapshot => {
        setState([]);
        let data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((list) => {
            if (list[dbParam] === param){
              setState(oldArray => [...oldArray, list])
            } 
          })
        }
      });
    }
  
    //read
    useEffect(() => {
        readDatabase ('items','uuid',route.params.listUid,setLists)
    },[]);
  
    //delete
    const handleListDelete = async (list) => {
      await database().ref('/items/'+list.uuid).remove();
      navigation.navigate("Products");
    }
  
    //update
    const handleListSubmitChange = () => {
      database()
        .ref('/items/'+listUid)
        .update({
          text: text,
          updateDate : Date.now()
        })
      setIsEdit(false);
      setText("");
    }

  return (
    <MainTemplate>
        {isEdit ?
            <View>
                <FormInput
                value={text}
                placeholderText="Nom du produit"
                onChangeText={handleChange}
                style={styles.input}
                />
                <FormButton buttonTitle='Ecraser' onPress={handleListSubmitChange} />
                <FormButton buttonTitle='X' onPress={() => setIsEdit(false)} />
            </View>
            : null
        }
      {lists.map((list) => (
        <View >
          <Text style={styles.listName} key={list.uuid}>{list.name}</Text>
          <Text key={list.uuid}>{list.text}</Text>
          <FormButton buttonTitle='Supprimer' onPress={() => handleListDelete(list)} key={"delete"+list.uuid.toString()}/>
          <FormButton buttonTitle='Modifier' onPress={() => setIsEdit(true)} key={"update"+list.uuid.toString()}/>
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