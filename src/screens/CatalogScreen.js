import React, {Components, useContext, useState, useEffect} from 'react';
import {Alert ,StyleSheet, Text, TextInput, TouchableOpacity ,View} from 'react-native'; 

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import DeptButton from '../components/atoms/DeptButton';
import MainTemplate from '../components/templates/MainTemplate';

import { AuthContext } from '../providers/AuthProvider';
import { DatabaseContext } from '../providers/DatabaseProvider';

import { Colors, Mixins, Spacing } from '../styles/index';

export default function CatalogScreen ( { navigation } ) {

  //const { user } = useContext(AuthContext); // Données sur l'utilisateur (liées à la connexion)
  const { userData } = useContext(DatabaseContext); // Données utilisateur 
  const { addDepartment, departmentList, getDepartments } = useContext(DatabaseContext); // Données sur les rayons d'un magasin
  const { shop } = useContext(DatabaseContext); // Données sur le magasin actuel

  // const [name,setName] = useState("");  // Pour gérer l'affichage du formulaire d'entrée de nom d'un nouveau rayon
  //const handleNameChange=(textInput)=>{
  //  setName(textInput)
  //}

  //Charge les données des rayons du magasin (si mode magasin)
  useEffect(() => {
    if (shop !== null) {
      getDepartments(shop.shopId)
    }
  },[]);

  //write
  const writeToDatabase = () => {
    addDepartment(name,shop.shopId);
    setName("");
    alert("Rayon crée avec succés");
  }

  return (
    <MainTemplate>
      {(shop === null)
      ? 
       null
      :
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue au magasin {shop.name}</Text>
      </View>
      // <View>
      //   <FormInput
      //     value={name}
      //     placeholderText="Nom du rayon"
      //     onChangeText={handleNameChange}
      //     style={styles.input}
      //     key={"FormListName"}
      //   />
      //   <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} key={"AddListButton"}/>
      // </View>
      }
      {(shop === null) 
      ? 
        <View style={styles.container}>
          <Text style={styles.title}>Mode hors magasin"</Text>
          <FormButton buttonTitle="Choisir un magasin" onPress={() => navigation.navigate("InOrOut")}/>
        </View>
      
      :
        <View key="DepartmentsZone" style={styles.departmentBlock}>
        {departmentList.map((dept) => (
          <View key={dept.uuid} style={styles.buttonContainer}>
              <DeptButton style={styles.departmentTile} buttonTitle={dept.name} imageUrl={dept.imageUrl} onPress={() => navigation.navigate("Products",{deptId:dept.uuid,userId:userData.uid, deptName:dept.name})} key={"Details"+dept.uuid}/>
          </View>
        ))}
        </View>
      }
    </MainTemplate>
  );
}
  
  const styles = StyleSheet.create({
    buttonContainer: {
      width:Spacing.DepartmentButtonWidth,
      marginLeft:Spacing.DepartmentButtonHorizontalMargin,
      marginRight:Spacing.DepartmentButtonHorizontalMargin,
      marginBottom:Mixins.windowHeight/50,
      backgroundColor:Colors.WHITE,
      borderColor: "rgba(0,0,0,0.3)",
      borderWidth:1,
      borderRadius:5
    },
    container: {
      marginTop:Mixins.windowHeight/20,
      height:Mixins.windowHeight/6,
      width:Mixins.windowWidth,
      justifyContent: 'center',
      alignItems: 'center'
    },
    departmentBlock: {
      width:Mixins.windowWidth,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginTop:Mixins.windowHeight/80
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
    title: {
      color: Colors.ORANGE,
      fontWeight: "bold",
      fontSize: 31,
      textAlign:'center'
    },
  });