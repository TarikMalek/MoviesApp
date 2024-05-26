import React,{useEffect, useState,useCallback} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,FlatList } from 'react-native';

import WeatherAnimation from '../../components/WeatherAnimation';
import SearchField from '../../components/SearchField';


export default ({
    weather,
    width,
    height
})=>{
    const styles = StyleSheet.create({
        container : {
            width : width,
             borderWidth :1,
             borderColor :'#DDDD',
             borderRadius : 10,
             justifyContent : 'center',
           
            },
    });

    return (
        <View>

        <View 
        style={styles.container}
        >
           
            {(weather) &&
            <View
            style={{
                flexDirection : 'row',
                width : '95%',
                justifyContent : 'space-between',
                alignSelf : 'center',
                padding : 10,
                alignItems : 'center'
            }}
            >
            <View
            style={{
                alignItems :'center'
            }}
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

       
       
        </View>
    )
    
};


