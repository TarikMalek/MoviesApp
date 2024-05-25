import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Animated,
{ 
    FadeInRight,
    FadeInDown,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import Row from './Row'

const {width , height} = Dimensions.get('window')



export default (data,onPress) =>{
    return (
       
            <Animated.View 
            style={{
            // flex:1,
            
            padding : 10,
            borderWidth : 1,
            borderColor : '#012326',
            borderRadius : 10,
            marginVertical : 10,
          
        }}
        entering={FadeInDown.duration(400).delay(800)}
        >
            <View
            style={{
                flex:1,
                flexDirection : 'row'
            }}
            >

            
             <View
            style={{
                width : '40%',
                marginTop:5,
                height : 200,
                backgroundColor : '#012326',
                borderRadius : 20,
                borderWidth :1 ,
                borderColor : '#012326',
                alignItems : 'center',
                justifyContent : 'center',
               
            }}
            >
                <Image
                style={{
                    width : '100%',
                   height : '100%',
                    resizeMode : 'cover',
                    borderRadius : 20
                }}
                source={{ uri: data.posterUrl}}
                />
             

            </View>

            <View
            style={{
                flex:1,
                width : '60%',
                padding : 10
            }}
            >   
            <Text
            style={{
                textAlign :'justify',
                fontSize : 16,
                marginBottom :10,
            }}
            >
                {data.overview}

            </Text>

            {Row({label:'Release Date',value:data.releaseDate})}
            {Row({label:'Rating',value:data.vote_average.toFixed(2)})}

            
            </View>
            </View>

            <Button 
            label={data.isMarked ?'Remove From Favourites' : 'Add to Favourites'}
            onPress={onPress}
            containerStyle={{
                backgroundColor : data.isMarked ? 'red' : '#012326',
            }}
             />
       
       
            
            </Animated.View >
           
        
    )
}