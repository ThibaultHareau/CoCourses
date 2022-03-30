import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Mixins, Spacing, Typography } from '../../styles/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ListItem({ item, ...rest }) {
  return (
    <TouchableOpacity style={(item['inCart']) ? styles.productIn : styles.productOut} {...rest}>
      <Image style={styles.image} source={{uri : item['imageUrl']}}/>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>x{item['quantity']}</Text>
      <Text style={styles.price}>{item.price} €</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productIn: {
    width: Spacing.ListButtonWidth,
    height: Spacing.ListButtonHeight,
    backgroundColor: Colors.WHITE,
    //padding: 0.1*(Mixins.windowHeight / 10),
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    //alignContent: 'center',
    //justifyContent: 'space-evenly',
    borderRadius: 8,
    elevation:2,
    marginBottom:10,
  },
  productOut: {
    width: Spacing.ListButtonWidth,
    height: Spacing.ListButtonHeight,
    backgroundColor: Colors.LIGHT_GREY,
    //padding: 0.1*(Mixins.windowHeight / 10),
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    //alignContent: 'center',
    //justifyContent: 'space-evenly',
    borderRadius: 8,
    elevation:2,
    marginBottom:10,
  },
  InCart: {

  },
  image: {
    width:Spacing.ListButtonImageWidth,
    height:Spacing.ListButtonImageHeight,
    marginLeft:Spacing.ListButtonImageSideMargin,
    marginRight:Spacing.ListButtonImageSideMargin,
  },
  name: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.DARK_GREY,
    width: Spacing.ListButtonTextWidth,
    marginLeft: Spacing.ListButtonTextSideMargin,
    marginRight: Spacing.ListButtonTextSideMargin,
  },
  quantity: {
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.DARK_GREY,
    width: Spacing.ListButtonQuantityWidth,
    marginLeft: Spacing.ListButtonQuantitySideMargin,
    marginRight: Spacing.ListButtonQuantitySideMargin,
  },
  price: {
    fontSize: 20,
    color: Colors.DARK_GREY,
    width: Spacing.ListButtonPriceWidth,
    marginLeft: Spacing.ListButtonPriceSideMargin,
    marginRight: Spacing.ListButtonPriceSideMargin,
  },





  productInPrevious: {
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
  productOutPrevious: {
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
  namePrevious: { //et quantity
    fontSize: 20,
    fontWeight:'bold',
    color: Colors.DARK_GREY
  },
  pricePrevious: {
    fontSize: 20,
    color: Colors.DARK_GREY
  }
});
