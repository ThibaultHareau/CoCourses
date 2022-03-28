import React, { Component, useContext, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import PlusButton from "../atoms/PlusButton";
import { AuthContext } from '../../navigation/AuthProvider';
import { InShopContext } from '../../navigation/InShopProvider';
import { DatabaseContext } from '../../navigation/DatabaseProvider';
import FormInput from "../atoms/FormInput";
import FormButton from "../atoms/FormButton";
import ListButton from '../atoms/ListButton';
import { Colors } from '../../styles';

const AddListModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { inShop } = useContext(InShopContext);
  const { userData, getUser } = useContext(DatabaseContext);
  const { addList, getLists, listsList } = useContext(DatabaseContext);

  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getUser(user.uid)
  }, []);

  const handleNameChange = (textInput) => {
    setName(textInput)
  }

  const writeToDatabase = () => {
    addList(name, user.uid, inShop, userData.email);
    setName("");
    // alert("Liste créée avec succès");
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FormInput
              value={name}
              placeholderText="Nom de la liste"
              onChangeText={handleNameChange}
              style={styles.input}
            />
            <ListButton buttonTitle='Ajouter' onPress={writeToDatabase} />
          </View>
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
    zIndex: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    zIndex: 2
  },
  plusButton: {
    position: 'absolute',
    bottom: hp('-4%'),
    left: wp('25%'),
    zIndex: 2
  },
  input: {
    padding:10,
    borderWidth:1,
    borderColor:'#CCC',
    // backgroundColor:Colors.WHITE,
    width:'90%',
    marginBottom:20,
    marginTop:10,
    borderRadius:5
  }
});

export default AddListModal;