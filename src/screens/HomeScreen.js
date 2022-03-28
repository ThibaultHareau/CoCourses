import React, { useContext, useEffect, useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AuthContext } from '../navigation/AuthProvider';
import { InShopContext } from '../navigation/InShopProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';
import ShopButton from '../components/atoms/ShopButton';
import ListsLink from '../components/atoms/ListsLink';

export default function HomeScreen({ navigation }) {

  const { user, logout } = useContext(AuthContext);
  const { inShop } = useContext(InShopContext);
  const { userData, getUser } = useContext(DatabaseContext);
  const { addList, getLists, listsList } = useContext(DatabaseContext);

  const [lists, setLists] = useState([]);
  const [name,setName] = useState("");

  useEffect(() => {
    getUser(user.uid)
    getLists(user.uid)
  }, []);

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  const writeToDatabase = () => {
    addList(name,user.uid,inShop);
    setName("");
    alert("Liste créée avec succès");
  }

  return (
    <MainTemplate>
      {/* <Text style={styles.text}>Bienvenue {userData===null ? "" : userData.firstName}</Text> */}
      <Text style={styles.title}>CoCourses</Text>
      <Text style={styles.title_2}>Votre magasin du moment</Text>
      <ShopButton buttonTitle={'Magasin ' + inShop} />
      {/* <Text style={styles.text}>
        {inShop === -1 ?
          "Vous êtes en mode hors magasin" :
          "Bienvenue dans le magasin " + inShop
        }
      </Text> */}
      {/* <Text style={styles.title_3}>Vos listes</Text> */}
      <ListsLink onPress={() => navigation.navigate('Lists', { userId: user.uid })} />
      {/* <View style={styles.button}>
        <FormButton buttonTitle='Listes' onPress={() => navigation.navigate('Lists', { userId: user.uid })} />
      </View> */}
      <View style={styles.addList}>
        <FormInput
          value={name}
          placeholderText="Nom de la liste"
          onChangeText={handleNameChange}
          style={styles.input}
        />
        <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} />
      </View>
      <View style={styles.lists}>
      {listsList.map((list) => (
        <View key={list.uuid}>
          <Text style={styles.listName} key={'Name'+list.uuid}>{list.name}</Text>
          <FormButton buttonTitle="Details"  key={"Button"+list.uuid} onPress={() => navigation.navigate("ListDetails",{listUid:list.uuid,listName:list.name,userId:user.uid})}/>
        </View>
      ))}</View>
    </MainTemplate>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    flex: 1,
  },
  title: {
    position: 'absolute',
    top: hp('5%'),
    color: Colors.ORANGE,
    fontWeight: "bold",
    fontSize: 31,
  },
  title_2: {
    position: 'absolute',
    top: hp('15%'),
    left: wp('10%'),
    color: Colors.DARK_GREY,
    fontWeight: "bold",
    fontSize: 27,
  },
  title_3: {
    position: 'absolute',
    top: hp('35%'),
    left: wp('10%'),
    color: Colors.DARK_GREY,
    fontWeight: "bold",
    fontSize: 27,
  },
  text: {
    color: Colors.DARK_GREY,
    fontSize: 20,
    justifyContent: 'center',
    paddingTop: 15,
  },
  input: {
    padding:10,
    borderWidth:1,
    borderColor:'#CCC',
    width:'90%',
    marginBottom:1,
    borderRadius:5
  },
  listName: {
    fontSize: 28
  },
  addList: {
    position: 'absolute',
    alignItems: 'center',
    bottom: hp('3%'),
    right: wp('5%'),
    zIndex:1,
    elevation:1
  },
  lists: {
    position: 'absolute',
    top:hp('40%')
  }
});