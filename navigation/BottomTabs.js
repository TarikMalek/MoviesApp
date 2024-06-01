import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import Entypo from '@expo/vector-icons/Entypo';
import constants from '../constants'
const Tab = createBottomTabNavigator();

export default ()=> {
  return (
    <Tab.Navigator
    screenOptions={{
        headerStyle: {
          backgroundColor:constants.colors.primary, 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor:constants.colors.primary,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#888', 
      }}
    >
      <Tab.Screen 
      name="Home"
       component={HomeScreen}
       options={{
        tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" color={color} size={focused ? 35 : 30} />
        ),
        tabBarLabel: () => null, 
        }}
        />

      <Tab.Screen
       name="Favourites" 
       component={FavouritesScreen}
       options={{
        tabBarIcon: ({ color, size, focused }) => (
            <Entypo name="star" color={color} size={focused ? 35 : 30}/>
        ),
        tabBarLabel: () => null, 
        }}
        />
    </Tab.Navigator>
  );
}