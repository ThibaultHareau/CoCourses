import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import ListButton from '../components/atoms/BasicButton';
import MainTemplate from '../components/templates/MainTemplate';

import { Colors } from '../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AuthContext } from '../providers/AuthProvider';
import { DatabaseContext } from '../providers/DatabaseProvider';

import ShopButton from '../components/atoms/ShopButton';
import ListsLink from '../components/atoms/ListsLink';
import AddListModal from '../components/molecules/AddListModal';

export default function HomeScreen({ navigation, route }) {

  const { user } = useContext(AuthContext);
  const { userData } = useContext(DatabaseContext);
  const { addList, getLists, listsList } = useContext(DatabaseContext);
  const { getShopsList, getShop, shop, shopsList } = useContext(DatabaseContext);

  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");

  //const shopId = route.params.shopId;

  useEffect(() => {
    getLists(user.uid)
  }, []);

  const handleNameChange = (textInput) => {
    setName(textInput)
  }

  const writeToDatabase = () => {
    addList(name, userData.uid, shop.shopId, userData.email);
    setName("");
    alert("Liste créée avec succès");
  }

  return (
    <MainTemplate>
      <AddListModal />
      <Text style={styles.title}>CoCourses</Text>
      <Text style={styles.title_2}>Votre magasin du moment</Text>
      {(shop !== null)
        ?
        <ShopButton buttonTitle={shop.name} onPress={() => navigation.navigate("InOrOut")} />
        :
        <ShopButton buttonTitle="Mode hors magasin" onPress={() => navigation.navigate("InOrOut")} />
      }
      <Text style={styles.title_3}>Vos listes</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.lists}>
            {/* listsList.length */}
            {listsList.map((list) => (
              <View key={list.uuid}>
                {/* <Text style={styles.listName} key={'Name'+list.uuid}>{list.name}</Text> */}
                <ListButton buttonTitle={list.name} key={"Button" + list.uuid} onPress={() => navigation.navigate("ListDetails", { listUid: list.uuid, listName: list.name, userId: userData.uid, listOwner: list.owner })} />
              </View>
            ))}</View>
        </ScrollView>
      </SafeAreaView>
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
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex:0
    // top:350
  },
  title: {
    position: 'absolute',
    top: 50,
    color: Colors.ORANGE,
    fontWeight: "bold",
    fontSize: 31,
  },
  title_2: {
    position: 'absolute',
    top: 110,
    left: wp('5%'),
    color: Colors.DARK_GREY,
    fontWeight: "bold",
    fontSize: 27,
  },
  title_3: {
    position: 'absolute',
    top: 250,
    left: wp('10%'),
    color: Colors.DARK_GREY,
    fontWeight: "bold",
    fontSize: 27,
    zIndex: 0
  },
  text: {
    color: Colors.DARK_GREY,
    fontSize: 20,
    justifyContent: 'center',
    paddingTop: 15,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    width: '90%',
    marginBottom: 1,
    borderRadius: 5
  },
  listName: {
    fontSize: 28
  },
  addList: {
    position: 'absolute',
    alignItems: 'center',
    bottom: hp('3%'),
    right: wp('5%'),
    zIndex: 1,
    elevation: 1
  },
  lists: {
    // position: 'absolute',
    // top: hp('40%'),
    paddingBottom: 10,
    marginBottom: 10,
  },
  scrollView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
    // position:'absolute'
  }
});