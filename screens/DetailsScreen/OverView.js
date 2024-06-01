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
    FadeInDown,
} from 'react-native-reanimated';
import Row from './Row'
import ImagesCarousel from '../../components/ImagesCarousel';
import constants from '../../constants';


export default (data,onPress) =>{
    let runtime = data?.movie?.runtime
    return (
       
        <Animated.View 
        style={{
        // flex:1,
        
        
        marginVertical : 10,
            
          
        }}
        entering={FadeInDown.duration(400).delay(1200)}
        >
        {data?.crew?.length > 0 &&
        <>
         <Text
        style={{
            fontSize :16,
            fontWeight : 'bold',
            color :constants.colors.primary,
        }}
        >
            Crew
        </Text>

        <ImagesCarousel 
        images={data?.crew}
        />
        </>
       
        }
        <View
        style={{
        padding : 10,
        borderWidth : 1,
        borderColor :constants.colors.primary,
        borderRadius : 10,
        }}
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
                backgroundColor : constants.colors.primary,
                borderRadius : 20,
                
                alignItems : 'center',
                justifyContent : 'center',
                shadowColor:constants.colors.primary,
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
               
            }}
            >
                <Image
                style={{
                    width : '100%',
                   height : '100%',
                    resizeMode : 'cover',
                    borderRadius : 20,
                   
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
            {Row({label:'Rating',value:data?.vote_average.toFixed(2)})}
            
            {(runtime && runtime > 0) ?
            Row({label:'Runtime',value:runtime.toString()+' minutes'})
            :
            null
            }

           
            </View>
            </View>

            <Button 
            label={data.isMarked ?'Remove From Favourites' : 'Add to Favourites'}
            onPress={onPress}
            containerStyle={{
                backgroundColor : data.isMarked ? 'red' :constants.colors.primary,
            }}
             />

       
            </View>
            
            </Animated.View >
           
        
    )
}