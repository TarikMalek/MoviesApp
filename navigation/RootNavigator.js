import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import BottomTabs from './BottomTabs';
import constants from '../constants';
const Stack = createNativeStackNavigator();

 const Navigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:constants.colors.primary, 
        },
        
        
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}
      
      >
      <Stack.Screen name="Home Stack" component={BottomTabs} options={{ headerShown: false , title:'Home'}} />
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* <Stack.Screen name="Home" component={BottomTabs} /> */}
        <Stack.Screen 
        name="Details"
        component={DetailsScreen}
        options={{
           headerTitle: '',
           headerShown:true
           }} 
        />
        <Stack.Screen name="Favourites" component={FavouritesScreen} />
      </Stack.Navigator>
    );
  }

  export default Navigator;
