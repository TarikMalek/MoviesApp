import React,{useEffect, useState,useCallback} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,FlatList } from 'react-native';

import WeatherAnimation from '../../components/WeatherAnimation';
import SearchField from '../../components/SearchField';


export default ({
    weather,
    width,
    
})=>{
    const styles = StyleSheet.create({
        container : {
            height : 150,
            width : width,
             borderRadius : 10,
             justifyContent : 'center',
            backgroundColor : '#012326',
        },
        weatherContainer : {
            flexDirection : 'row',
            width : '95%',
            justifyContent : 'space-between',
            alignSelf : 'center',
            padding : 10,
            alignItems : 'center'
        },
    });

    return (
      
        <View 
        style={styles.container}
        >
           
            {(weather) &&
            <View
            style={styles.weatherContainer}
            >
            <View
            style={{ alignItems :'center' }}
            >
            <WeatherAnimation />
            
            </View>
                
             
             <View>
                <Text
                style={{
                    color : 'white',
                    fontSize : 14,
                }}
                >
                    {weather?.location?.country}
                
                </Text>
                <Text
                style={{
                    color : 'white',
                    fontSize : 14,
                }}
                >
                    {weather?.location?.name}
                
                </Text>
                <Text
                style={{
                    color : 'white',
                    fontSize : 16,
                    fontWeight : 'bold',
                }}
                >
                    {`feels like ${Math.round(weather?.current?.feelslike_c)} c'`}
                
                </Text>
                
            </View>
           
           
               
            </View>
        
                
            }

            <SearchField />
           
        </View>

       
       
    )
    
};


