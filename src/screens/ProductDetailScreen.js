import React, { useContext, useState, useEffect } from 'react';
import { Image,  StyleSheet, Text, View } from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import AddProductModal from '../components/molecules/AddProductModal';
import MainTemplate from '../components/templates/MainTemplate';

import { DatabaseContext } from '../providers/DatabaseProvider';
import { StorageContext } from '../providers/StorageProvider';

import { Colors, Mixins, Spacing, windowWidth, windowHeight } from "../styles/index";

export default function ProductDetailScreen ( {navigation, route} ) {
  
    const { deleteItem, item, getItem, updateItem } = useContext(DatabaseContext);
    const { getImage, imageUrl } = useContext(StorageContext);
    
    const [text,setText] = useState();
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [onEdit,setOnEdit] = useState(null);

    const productId = route.params.productId;
    const deptId = route.params.deptId;
    const userId = route.params.userId;
  
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
      getImage(productId,'/items/')
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
      {/*onEdit !== null ?
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
            <FormButton buttonTitle='Ecraser' onPress={handleListSubmitChange} key={"Save"}/>
            <FormButton buttonTitle='X' onPress={() => setOnEdit(null)} key={"Cancel"} />
          </View>
          : null
      */}
      {(item === null) ? null :
        <View key="MainFrame" style={styles.mainFrame}>
          <View key={"Image"+item.uuid} style={styles.imageContainer}>
            {(imageUrl===null) ? null :<Image style={styles.imageStyle} source={{uri : imageUrl}} />}
          </View> 
          <View key={item.uuid}>
            <View key="TitleBlock" style={styles.titleBlock}>
              <Text style={styles.listName} key={"Name"+item.uuid}>{item.name}</Text>
            </View>
            <View key="DescriptionBlock" style={styles.descriptionBlock}>
              {("text" in item )? <Text key={"Text"+item.uuid} style={styles.listDesc}>Description : {item.text}</Text> : null}
              {("bilanCarbone" in item )? <Text key={"blianCarbone"+item.uuid} style={styles.listDesc}>Bilan Carbone : {item.bilanCarbone}</Text> : null}
              {("origine" in item )? <Text key={"origine"+item.uuid} style={styles.listDesc}>Origine : {item.origine}</Text> : null}
            </View>
            {/* <FormButton buttonTitle='Supprimer' onPress={() => handleListDelete(list)} key={"delete"+list.uuid}/> */}
            {/* <FormButton buttonTitle='Modifier' onPress={() => setOnEdit(list)} key={"update"+list.uuid}/> */}
            {/* <FormButton buttonTitle='Ajouter' onPress={() => navigation.navigate("ListsChoice",{itemName:list.name,itemId:list.uuid,userId:userId,deptId:deptId})} key={"add"+list.uuid}/> */}
            {/* <PlusButton onPress={() => navigation.navigate("ListsChoice",{itemName:list.name,itemId:list.uuid,userId:userId,deptId:deptId})} key={"add"+list.uuid}/> */}
            {/* <AddProductModal itemName={list.name} deptId={deptId} itemId={list.uuid} />}*/}
            <AddProductModal itemId={item.uuid} itemName={item.name} userId={userId} deptId={deptId} />
          </View>
        </View>
      }
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
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:0
    },
    descriptionBlock: {
      marginTop:"2%",
      marginLeft:"2%",
      width:"96%",
      justifyContent:"center"
    },
    imageContainer: {
      width:Mixins.windowWidth,
      backgroundColor:Colors.WHITE,
    },
    imageStyle: {
      width:Mixins.windowWidth/2,
      height:Mixins.windowWidth/2,
      marginLeft:Mixins.windowWidth/4
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
      fontSize: 28,
      marginTop:"5%",
      textAlign: 'center'
    },
    listDesc: {
    },
    mainFrame: {
      position:"absolute",
      right:0,
      top:0,
      width:"100%"
    },
    containerModal: {
      position:'absolute',
      zIndex:2
    },
    titleBlock: {
      width:"80%",
      marginLeft:"10%",
    }
  });