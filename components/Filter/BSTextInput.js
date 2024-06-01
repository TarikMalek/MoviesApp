import React from 'react';
import  {  BottomSheetTextInput } from '@gorhom/bottom-sheet';  
import {View, StyleSheet} from 'react-native';
import constants from '../../constants';

export default ({
onChange,
value,
placeholder,
containerStyle={}
}) => {
    return (
        <View
        style={[styles.container,{...containerStyle}]}
        >
        <BottomSheetTextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'white'}
        />
        </View>
      
    )
};



const styles = StyleSheet.create({
    container : {
      padding: 10,
      backgroundColor :constants.colors.primary
    },
    input: {
      height: 40,
      borderWidth: 1,
      backgroundColor :'white',
      borderRadius : 10,
      padding : 10,
      backgroundColor : constants.colors.primary,
      borderColor : 'white',
      color : 'white'
  
    },
  });