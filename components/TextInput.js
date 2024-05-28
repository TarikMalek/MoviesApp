import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

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
    backgroundColor : '#012326'
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor :'white',
    borderRadius : 10,
    padding : 10,
    backgroundColor : '#012326',
    borderColor : 'white',
    color : 'white'

  },
});

