import React,{useState,useEffect,useMemo} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';

const {width,height} = Dimensions.get('window');

export default ({
    data,
    favourites
}) =>{
    const navigation = useNavigation();
    const isMarked = favourites.find(i=> i === data.id)
    useEffect(()=>{
        
    },[isMarked])
    let imageUrl = data?.backdrop_path ? 
    `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}` : 
    '';
    
    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={()=>{
            navigation.navigate('Details',
            {
                ...data,
                sharedId : data.id.toString()
            }
        )
        }}
        >
            
            <Image
            style={styles.poster}
             source={{uri:imageUrl}}
             resizeMode='cover'
             
             />
            {isMarked &&
            <View
            style={{
                position : 'absolute',
                top : 0,
                left : 0,
                alignItems : 'center',
                justifyContent : 'center',
                marginVertical : 10,
                backgroundColor : 'rgba(0,0,0,0.6)',
                padding : 10,
                width : 40,
                height : 40,
                borderRadius : 20,

            }}
            >
                <Entypo name="star" size={20}  color='#FFD700' />

            </View>

            }

            <View
            
            style={styles.details}
            >
                <Text
                style={{
                    color : 'white',
                    fontSize : 20,
                    fontWeight : 'bold'
                }}
                >
                    {data?.title}
                </Text>
                


            </View>

            <View
            style={styles.averageVote}
            >
                <Text
                style={{
                    color : 'white',
                    fontSize : 20,
                    fontWeight : 'bold'
                }}
                >
                    {data?.vote_average.toFixed(2)}
                </Text>
            </View>
             
                
            
        </TouchableOpacity>
    )
};

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginVertical : 10,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        
    },
    poster : {
        width : width,
        height : height*.3 ,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        
    },
   details : {
    position :'absolute',
    width : '100%',
    
    backgroundColor : 'rgba(2, 89, 89, 0.7)',
    bottom : 0,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    padding : 10

   },

   averageVote : {
    position : 'absolute',
    backgroundColor : 'rgba(2, 89, 89, 0.7)',
    top : 0,
    right  : 0,
    borderRadius : 20,
   
    padding : 10

   }

});