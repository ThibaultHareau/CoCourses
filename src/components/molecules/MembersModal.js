import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from "react-native";

import { DatabaseContext } from '../../navigation/DatabaseProvider';
import { Colors } from '../../styles';
import MembersButton from '../atoms/MembersButton';
import FormInput from '../atoms/FormInput';
import ListButton from '../atoms/ListButton';

const MembersModal = ({ listUid }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { addListMember, getListMembers, listMembers } = useContext(DatabaseContext);
  const { getListDetails, listDetails } = useContext(DatabaseContext);
  const { getUserByEmail, setUserToShare, userToShare } = useContext(DatabaseContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState({});

  const handleEmailChange = (textInput) => {
    setEmail(textInput)
  }

  //read
  useEffect(() => {
    getListMembers(listUid)
  }, []);

  const handleShareList = (email) => {
    getUserByEmail(email)
    setModalVisible(false)
  }

  const checkIfUserIsNew = (user) => {
    let alreadyMember = false
    listMembers.map((member) => {
      if (member.userId===user.uid) {
        alreadyMember=true
      }
    });
    if (alreadyMember) {
      alert("Cette personne est déjà dans la liste")
    }
    else {
      addListMember(listUid,user.uid,user.email)
      alert("Ajout de "+user.email)
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
            <Text style={styles.textStyle}>Membres de la liste</Text>
          </View>
          {listMembers.map((member) => (
            <View key={member.userId}>
              <Text style={styles.modalText} key={"Id" + member.userId}>{member.email}</Text>
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
            <ListButton buttonTitle={"Partager"} onPress={() => handleShareList(email)} key={"ShareButton"} />
          </View>
        </View>
      </Modal>
      <MembersButton style={styles.membersButton} onPress={() => setModalVisible(true)} />
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
    // backgroundColor:Colors.WHITE,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 25,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MembersModal;