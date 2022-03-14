import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Mixins, Typography } from '../../styles/index';

export default function IconButton({ icon, ...rest }) {
    return (
        <TouchableOpacity  style={styles.iconButton} {...rest}>
            {(() => {
            switch (icon) {
                case 'Home':
                    <Image source={require("../../assets/images/Home.png")} style={styles.icon} />
                default:
                    return null
                }
            })()}
        </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    iconButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor:Colors.PRIMARY
      },
      icon: {
        alignSelf: 'center',
        backgroundColor: 'transparent'
      }
  });