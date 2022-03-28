import React, { Components, useContext, useState, useEffect } from 'react';
import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

/* Upload images
import {launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
*/

import FormButton from '../components/atoms/FormButton';
import FormInput from '../components/atoms/FormInput';
import MainTemplate from '../components/templates/MainTemplate';
import DeptButton from '../components/atoms/DeptButton';


//import storage from '@react-native-firebase/storage';

import { DatabaseContext } from '../navigation/DatabaseProvider';

export default function ProductScreen({ navigation, route }) {

  const { addItem, getItems, itemList } = useContext(DatabaseContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);

  /*
  //Image upload
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  */

  const deptId = route.params.deptId;
  const userId = route.params.userId;
  const deptName = route.params.deptName;

  /*
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
  };
  */

  const handleNameChange = (textInput) => {
    setName(textInput)
  }
  const handlePriceChange = (priceInput) => {
    setPrice(parseFloat(priceInput))
  }

  //read
  useEffect(() => {
    getItems(deptId)
  }, []);

  const writeToDatabase = () => {
    addItem(name, price, deptId);
    alert("Produit crée avec succès");
    setName("");
    setPrice(null);
  }

  return (
    <MainTemplate>
      {/* <View> */}
      {/* <FormInput
          value={name}
          placeholderText="Nom du produit"
          onChangeText={handleNameChange}
          style={styles.input}
          key={"Name"}
        />
        <FormInput
          value={price}
          placeholderText="Prix"
          onChangeText={handlePriceChange}
          style={styles.input}
          numeric
          keyboardType="numeric"
          key={"Price"}
        />
        <FormButton buttonTitle='Ajouter' onPress={writeToDatabase} /> */}
      <Text style={styles.listName}>Vous êtes dans le rayon {deptName}</Text>
      {/* </View> */}
      {itemList.map((list) => (
        <View key={list.uuid}>
          {/* <Text style={styles.listName} key={'Name'+list.uuid}>{list.name}</Text> */}
          <DeptButton buttonTitle={list.name} onPress={() => navigation.navigate("ProductDetails", { deptId: deptId, productId: list.uuid, userId: userId })} key={"Details" + list.uuid} />
        </View>
      ))}
      {/*<TouchableOpacity onPress={selectImage}>
        <Text>Pick an image</Text>
      </TouchableOpacity>*/}
      {/*<<View>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View >
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity onPress={uploadImage}>
            <Text >Upload image</Text>
          </TouchableOpacity>
        )}
        </View>*/}
    </MainTemplate>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    fontSize: 28,
    // top: 0,
    marginBottom: 40,
    textAlign: 'center'
  }
});