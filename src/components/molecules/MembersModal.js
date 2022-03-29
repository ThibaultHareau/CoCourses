import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AuthContext } from '../../navigation/AuthProvider';
import { DatabaseContext } from '../../navigation/DatabaseProvider';
import ListButton from '../atoms/ListButton';
import { Colors } from '../../styles';
import FormInput from '../atoms/FormInput';
import FormButton from '../atoms/FormButton';

const MembersModal = ({listUid, listName, listOwner, userId}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    addListMember,
    deleteItemInList,
    deleteList,
    deletion,
    getItemsList,
    getListDetails,
    getListMembers,
    getUserByEmail,
    itemList,
    listDetails,
    listMembers,
    setDeletion,
    setUserToShare,
    updateInCart,
    updateListName,
    userData,
    userToShare } = useContext(DatabaseContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [items, setItems] = useState({});

  const { user, logout } = useContext(AuthContext);
  // const listUid = route.params.listUid;
  // const listName = route.params.listName;
  // const listOwner = route.params.listOwner
  // const userId = route.params.userId;

  const handleNameChange = (textInput) => {
    setName(textInput)
  }
  const handleEmailChange = (textInput) => {
    setEmail(textInput)
  }

  const getItems = () => {
    listDetails.map((list) => (
      setItems(list["itemsList"])
    ))
  }

  //read
  useEffect(() => {
    getListDetails(route.params.listUid)
    getListMembers(route.params.listUid)
  }, []);

  const handleShareList = (email) => {
    getUserByEmail(email)
  }

  const checkIfUserIsNew = (user) => {
    let alreadyMember = false
    getListMembers(listUid)
    listMembers.map((member) => {
      console.log(member)
      console.log(user)
      if (member.userId === user.uid) {
        alreadyMember = true
      }
    });
    if (alreadyMember) {
      alert("Cette personne est déjà dans la liste")
    }
    else {
      addListMember(listUid, user.uid, user.email)
      alert("Ajout de " + user.email)
    }
    setUserToShare([])
  }

  useEffect(() => {
    if (userToShare.length !== 0) { checkIfUserIsNew(userToShare[0]) }
    else { (email !== '') ? alert("Cette adresse mail n'est pas enregistrée") : null }
  }, [userToShare])

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
        <View key="Membres">
          <Text>Membres de la liste</Text>
        </View>
        {listMembers.map((member) => (
          <View key={member.userId}>
            <Text style={styles.listName} key={"Id" + member.userId}>{member.email}</Text>
          </View>
        ))}
        <View>
          <FormInput
            value={email}
            placeholderText="Email de votre ami"
            onChangeText={handleEmailChange}
            style={styles.input}
            key="AddUserByEmail"
          />
          <FormButton buttonTitle={"Partager"} onPress={() => handleShareList(email)} key={"ShareButton"} />
        </View>
        </View>
      </Modal>
      <MembersModal style={styles.membersButton} onPress={() => setModalVisible(true)} />
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
    alignItems: "center",
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
    fontSize: 30,
    marginBottom: 10,
    zIndex: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    zIndex: 2
  },
  membersButton: {
    // position: 'absolute',
    // bottom: 50,
    // left: wp('25%'),
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MembersModal;