import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

const Stack = createNativeStackNavigator();

 const Navigator = () => {
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:'#012326', 
        },
        
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
        name="Details"
        component={DetailsScreen}
        options={{ headerTitle: '' }} 
        />
        <Stack.Screen name="Favourites" component={FavouritesScreen} />
      </Stack.Navigator>
    );
  }

  export default Navigator;
