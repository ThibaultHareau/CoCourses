import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from "react-native";

import { AuthContext } from '../../navigation/AuthProvider';
import { DatabaseContext } from '../../navigation/DatabaseProvider';
import { Colors } from '../../styles';
import MembersButton from '../atoms/MembersButton';
import FormInput from '../atoms/FormInput';
import BasicButton from '../atoms/BasicButton';
import ListNameButton from '../atoms/ListNameButton';

const ModifyListModal = ({ navigation, listUid, listName, listOwner, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { deleteItemInList, getItemsList, itemList } = useContext(DatabaseContext);
  const { deleteList, getListDetails, listDetails, updateInCart, updateListName} = useContext(DatabaseContext);
  const { deletion, setDeletion } = useContext(DatabaseContext);

  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleNameChange = (textInput) => {
    setName(textInput)
  }
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
          <View key="EditList">
            <FormInput
              value={name}
              placeholderText="Nom de la liste"
              onChangeText={handleNameChange}
              style={styles.input}
              key="EditListName"
              keyboardType='email-address'
            />
            <BasicButton buttonTitle='Ecraser' onPress={handleListSubmitChange} key="SaveEditList" />
            {/* <BasicButton buttonTitle='X' onPress={() => setIsEdit(false)} key="CancelEditList" /> */}
            {(listOwner === userId)
              ? <BasicButton buttonTitle='Supprimer' key={"Delete" + listUid} onPress={() => handleListDelete(listUid)} />
              : null
            }
          </View>
        </View>
      </Modal>
      <ListNameButton buttonTitle={listName} onPress={() => setModalVisible(true)} />
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
    top: 50,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 15,
    zIndex: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
    zIndex: 2
  },
  membersButton: {
    zIndex: 2
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    // width: '90%',
    backgroundColor: Colors.DARK_GREEN,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 25,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ModifyListModal;