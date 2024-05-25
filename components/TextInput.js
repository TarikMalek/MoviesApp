import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export default Input = ({
    value,
    onChange,
    placeholder
}) => {

  return (
    <View
    style={styles.container}
    >
    <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
      />

    </View>
      
     
  );
};

const styles = StyleSheet.create({
  container : {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor :'white',
    borderRadius : 10
  },
});

