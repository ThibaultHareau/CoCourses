import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ProductDetailScreen ( {navigation, route} ) {
  
    const { deleteItem, item, getItem, updateItem } = useContext(DatabaseContext);
    
    const [text,setText] = useState();
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [onEdit,setOnEdit] = useState(null);

    const productId = route.params.productId;
    const deptId = route.params.deptId;
  
    const handleTextChange=(textInput)=>{
      setText(textInput)
    }
    const handleNameChange=(textInput)=>{
      setName(textInput)
    }
    const handlePriceChange=(textInput)=>{
      setPrice(textInput)
    }
  
    //read
    useEffect(() => {
      getItem(productId)
    },[]);
  
    //delete
    const handleListDelete = async (list) => {
      deleteItem(list.uuid);
      navigation.navigate("Products",{deptId:deptId});
    }
  
    //update
    const handleListSubmitChange = () => {
      updateItem(productId,name,text);
      setOnEdit(null);
      setText("");
    }

  return (
    <MainTemplate>
        {onEdit !== null ?
            <View>
              <FormInput
                value={name}
                defaultValue={onEdit.name}
                onChangeText={handleNameChange}
                style={styles.input}
                key={"Name"}
              />
              <FormInput
                value={text}
                defaultValue={onEdit.text}
                onChangeText={handleTextChange}
                style={styles.input}
                key={"Text"}
              />
              <FormButton buttonTitle='Ecraser' onPress={handleListSubmitChange} />
              <FormButton buttonTitle='X' onPress={() => setOnEdit(null)} />
            </View>
            : null
        }
      {(item === null) ? <View></View> : item.map((list) => (
        <View >
          <Text style={styles.listName} key={list.uuid}>{list.name}</Text>
          <Text key={list.uuid}>{list.text}</Text>
          <FormButton buttonTitle='Supprimer' onPress={() => handleListDelete(list)} key={"delete"+list.uuid.toString()}/>
          <FormButton buttonTitle='Modifier' onPress={() => setOnEdit(list)} key={"update"+list.uuid.toString()}/>
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