import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from "react-native";

import { AuthContext } from '../../providers/AuthProvider';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import PlusButton from "../atoms/PlusButton";
import BasicButton from '../atoms/BasicButton';
import { Colors } from '../../styles';

const AddProductModal = ({itemName, itemId}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useContext(AuthContext);
  const { addItemToList, getLists, listsList } = useContext(DatabaseContext);
  const { shop } = useContext(DatabaseContext);

  const [name,setName] = useState("");
  const [lists, setLists] = useState([]);

  const handleNameChange=(textInput)=>{
    setName(textInput)
  }

  //read
  useEffect(() => {
    getLists(user.uid)
  },[]);

  //write
  const writeToDatabase = (listId,listName) => {
    addItemToList(listId,itemId,1);
    alert("Ajout de : "+ itemName+" dans "+listName);
    setModalVisible(false);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>{itemName}</Text>
        {listsList.map((list) => (
          <View key={list.uuid} style={styles.list}>
            <BasicButton buttonTitle={list.name} key={"Button" + list.uuid} onPress={() => writeToDatabase(list.uuid, list.name)} />
          </View>
        ))}
        </View>
      </Modal>
      <PlusButton style={styles.plusButton} onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 2
  },
  modalView: {
    margin: 30,
    top:50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    zIndex: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    zIndex: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    zIndex: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:30,
    marginBottom:10,
    zIndex: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    zIndex: 2
  },
  plusButton: {
    zIndex: 2
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    width: '90%',
    marginBottom: 1,
    borderRadius: 5
  },
  list: {
    justifyContent:'center',
    alignItems:'center'
  }
});

export default AddProductModal;