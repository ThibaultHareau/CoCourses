import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';

import database, {firebase} from '@react-native-firebase/database';
import { uid } from 'uid';


export default function ProductScreen ( {navigation, route} ) {
  const reference = firebase
  .app()
  .database('https://cocourses-cbe6a-default-rtdb.europe-west1.firebasedatabase.app/')
  .ref('/');

  const { inShop, setInShop } = useContext(InShopContext);
  const { user, logout } = useContext(AuthContext);


  const [name,setName] = useState("");
  const [price,setPrice] = useState(null);
  const [lists, setLists] = useState([]);
  const [isEdit,setIsEdit] = useState(false);
  const [tempUuid,setTempUuid] = useState("");

  const deptUid = route.params.deptUid;

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }
  const handlePriceChange=(priceInput)=>{
    setPrice(parseFloat(priceInput))
  }

  //read in database
  const getFilteredDatabase = (path1,path2,param1,value1,param2,param3,setState) => {
    database()
    .ref('/')
    .on('value', snapshot => {
      setState([]);
      let targets = [];
      let data = snapshot.val();
      if (data !== null) {
        Object.values(data[path1]).map((list) => {
          if (value1 === list[param1]){
            targets = [...targets, list[param2]]
          } 
        })
        console.log("ID à afficher : " + targets)
        Object.values(data[path2]).map((list) => {
          if (targets.includes(list[param3])){
            setState(oldArray => [...oldArray,list])
          } 
        })
      }
    });
  }

  //read
  useEffect(() => {
    getFilteredDatabase ('department-items','items','deptId',deptUid,'itemId','uuid',setLists)
  },[]);

  //write
  const writeToDatabase = () => {
    const uuid = uid()
    const uuid2 = uid()
    database()
      .ref('/items/'+uuid)
      .set({
        uuid,
        name,
        creationDate : Date.now(),
        updateDate : Date.now(),
        text : "Description",
        price : price
      });
    database()
      .ref('/department-items/'+uuid2)
      .set({
        uuid : uuid2,
        deptId : deptUid,
        itemId : uuid
      });
    setName("");
    alert("Produit crée avec succés");
  }

  //delete
  const handleListDelete = async (list) => {
    await database().ref('/items/'+list.uuid).remove();
  }

  //update
  const handleListUpdate = (list) => {
    setIsEdit(true);
    setTempUuid(list.uuid);
  }
  const handleListSubmitChange = () => {
    database()
      .ref('/items/'+tempUuid)
      .update({
        name: name,
        updateDate : Date.now()
      })
    setIsEdit(false);
    setName("");
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
      {lists.map((list) => (
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