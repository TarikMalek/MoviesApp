import 'react-native-gesture-handler';

import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Dimensions } from 'react-native';

import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';

import Navigator from './navigation/RootNavigator';

import { Provider } from 'react-redux';

import { store } from './store/store';

export default function App() {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#012326'
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Provider store={store}> 
    <StatusBar  style="dark" />

    <Navigator />
      
    </Provider>
   </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor :'#012326',
  
  },
  

});
