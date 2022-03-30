import React, { useContext, useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import BasicButton from '../components/atoms/BasicButton';
import MembersModal from '../components/molecules/MembersModal';
import ModifyListModal from '../components/molecules/ModifyListModal';
import MainTemplate from '../components/templates/MainTemplate';
import ListNameButton from '../components/atoms/ListNameButton';
import ListItem from '../components/atoms/ListItem';
import CrossButton from '../components/atoms/CrossButton';
import { Colors } from '../styles/index';

import { AuthContext } from '../navigation/AuthProvider';
import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ListDetailScreen({ navigation, route }) {

  const { deleteItemInList, getItemsList, itemList } = useContext(DatabaseContext);
  const { deleteList, getListDetails, listDetails, updateInCart, updateListName } = useContext(DatabaseContext);
  const { deletion, setDeletion } = useContext(DatabaseContext);
  // const { userData } = useContext(DatabaseContext);

  // const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [items, setItems] = useState({});

  const { user } = useContext(AuthContext);
  const listUid = route.params.listUid;
  const listName = route.params.listName;
  const listOwner = route.params.listOwner
  const userId = route.params.userId;

  const handleNameChange = (textInput) => {
    setName(textInput)
  }

  const getItems = () => {
    listDetails.map((list) => (
      setItems(list["itemsList"])
    ))
  }

  //read
  useEffect(() => {
    getListDetails(route.params.listUid)
  }, []);

  useEffect(() => {
    getItems()
  }, [listDetails])

  useEffect(() => {
    getItemsList(items)
  }, [items])

  //delete
  const handleListDelete = async (listId) => {
    deleteList(listId)
    navigation.navigate("Main", { userId: user.uid });
  }

  //update
  const handleListSubmitChange = () => {
    updateListName(name, listUid);
    setIsEdit(false);
    setName("");
  }

  const handleInCartChange = (value, itemId) => {
    updateInCart(value, listUid, itemId);
    alert('Statut du produit mis à jour');
  }

  const handleDeleteItem = (itemId) => {
    deleteItemInList(listUid, itemId);
    getListDetails(route.params.listUid);
  }

  useEffect(() => {
    setDeletion(false)
    getListDetails(listUid)
  }, [deletion]);

  // function countItems(itemList) {
  //   let count = 0
  //   itemList.map( (item) => (item['inCart']) ? count++ : null )
  //   return { count }
  // }

  // useEffect(() => {
  //   itemList.map((item) => (item['inCart']) ? setCount(c => c++) : null)
  // }, []);

  return (
    <MainTemplate>
      <ModifyListModal navigation={navigation} listUid={listUid} listName={listName} listOwner={listOwner} userId={userId} />
      {/* <Text style={styles.text}>{count} / {itemList.length}</Text> */}
      {/* <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}> */}
        <View>
          {itemList.map((item) => (
            <View style={styles.item} key={item.uuid}>
              <ListItem item={item} onPress={() => handleInCartChange(!item['inCart'], item.uuid)} key={"item"+item.uuid} />
              <CrossButton onPress={() => handleDeleteItem(item.uuid)} key={"delete"+item.uuid} />
          </View>))}
          </View>
        {/* </ScrollView>
      </SafeAreaView> */}
      <MembersModal listUid={listUid} />
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
    padding:-20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0
  },
  scrollView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
    // position:'absolute'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    width: '90%',
    marginBottom: 1,
    borderRadius: 5
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
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: Colors.GREEN
  },
  productOut: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: Colors.RED
  },
  text: {
    position:'absolute',
    top:60,
    color:Colors.ORANGE,
    fontSize:26,
  },
  item: {
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  }
});