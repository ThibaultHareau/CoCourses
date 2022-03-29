import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ListItem({ item, ...rest }) {
  return (
    <TouchableOpacity style={(item['inCart']) ? styles.productIn : styles.productOut} {...rest}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.name}>x{item['quantity']}</Text>
      <Text style={styles.price}>{item.price} €</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productIn: {
    width: Mixins.windowWidth / 1.3,
    height: Mixins.windowHeight / 9,
    backgroundColor: Colors.WHITE,
    padding: 0.1*(Mixins.windowHeight / 10),
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    elevation:2,
    marginBottom:10,
  },
  productOut: {
    width: Mixins.windowWidth / 1.3,
    height: Mixins.windowHeight / 9,
    backgroundColor: Colors.LIGHT_GREY,
    padding: 0.1*(Mixins.windowHeight / 10),
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    // elevation:2,
    marginBottom:10,
  },
  InCart: {

  },
  name: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.DARK_GREY
  },
  price: {
    fontSize: 20,
    color: Colors.DARK_GREY
  }
});
