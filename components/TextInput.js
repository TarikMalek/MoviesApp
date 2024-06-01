import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import constants from '../constants';
export default Input = ({
    value,
    onChange,
    placeholder,
    containerStyle={}
}) => {

  return (
    <View
    style={[styles.container,{...containerStyle}]}
    >
    <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'white'}
      />

    </View>
      
     
  );
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

