import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ListDetailScreen ( {navigation, route} ) {

    const { deleteList, getListDetails, listDetails, updateListName } = useContext(DatabaseContext);
    
    const [name,setName] = useState("");
    const [isEdit,setIsEdit] = useState(false);

    const listUid = route.params.listUid;
  
    const handleNameChange=(textInput)=>{
      setName(textInput)
    }

    //read
    useEffect(() => {
      getListDetails(route.params.listUid)
    },[]);
  
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
      {listDetails.map((list) => (
        <View >
          <Text style={styles.listName} key={list.uuid}>{list.name}</Text>
          <FormButton buttonTitle='Supprimer' key={"Delete"+list.uuid} onPress={() => handleListDelete(list)} key={"delete"+list.uuid.toString()}/>
          <FormButton buttonTitle='Modifier' key={"Update"+list.uuid} onPress={() => setIsEdit(true)} key={"update"+list.uuid.toString()}/>
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