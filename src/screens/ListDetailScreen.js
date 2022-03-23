import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';

import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ListDetailScreen ( {navigation, route} ) {

    const { deleteList, getItemsList, getListDetails, itemList, listDetails, updateInCart , updateListName } = useContext(DatabaseContext);
    
    const [name,setName] = useState("");
    const [isEdit,setIsEdit] = useState(false);
    const [items,setItems] = useState({});

    const listUid = route.params.listUid;
    const listName = route.params.listName;
    const userId = route.params.userId;
  
    const handleNameChange=(textInput)=>{
      setName(textInput)
    }

    const getItems=()=>{
      listDetails.map((list) => (
        setItems(list["itemsList"])
      ))
    }

    //read
    useEffect(() => {
      getListDetails(route.params.listUid)
    },[]);

    useEffect(() => {
      getItems()
    },[listDetails])

    useEffect(() => {
      getItemsList(items)
    },[items])
  
    //delete
    const handleListDelete = async (list) => {
      deleteList(list.uuid)
      navigation.navigate("Lists");
    }
  
    //update
    const handleListSubmitChange = () => {
      updateListName(name,listUid);
      setIsEdit(false);
      setName("");
    }

    const handleInCartChange = (value,itemId) => {
      updateInCart(value,listUid,itemId);
    }

  return (
    <MainTemplate>
        {isEdit ?
            <View>
                <FormInput
                value={name}
                placeholderText="Nom de la liste"
                onChangeText={handleNameChange}
                style={styles.input}
                />
                <FormButton buttonTitle='Ecraser' onPress={handleListSubmitChange} />
                <FormButton buttonTitle='X' onPress={() => setIsEdit(false)} />
            </View>
            : null
        }
        <View >
          <Text style={styles.listName} key={listUid}>{listName}</Text>
          <FormButton buttonTitle='Supprimer' key={"Delete"+listUid} onPress={() => handleListDelete(list)} key={"delete"+listUid.toString()}/>
          <FormButton buttonTitle='Modifier' key={"Update"+listUid} onPress={() => setIsEdit(true)} key={"update"+listUid.toString()}/>
        </View>
      {itemList.map((item) => (
        <View style={(item['inCart']) ? styles.productIn : styles.productOut}>
          <Text style={styles.listName} key={"Name"+item.uuid.toString()}>{item.name}</Text>
          <Text style={styles.listName} key={"Price"+item.uuid.toString()}>{item.price+"€ "}</Text>
          <Text style={styles.listName} key={item.uuid.toString()}>{"Quantité : "+item['quantity']}</Text>
          <FormButton buttonTitle={(item['inCart']) ? "Je ne l'ai pas" : "Je l'ai"} onPress={() => handleInCartChange(!item['inCart'],item.uuid)} key={"Change"+item.uuid.toString()}/>
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
    },
    productIn: {
      marginBottom:5,
      marginTop:5,
      backgroundColor:Colors.GREEN
    },
    productOut: {
      marginBottom:5,
      marginTop:5,
      backgroundColor:Colors.RED
    }
  });