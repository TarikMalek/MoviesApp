import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Animated,
{ 
    FadeInRight,
    FadeInDown,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { 
    addToFavourites,
    removeFromFavourites
} from '../store/actions/MoviesListAction';
import Entypo from '@expo/vector-icons/Entypo';

const {width , height} = Dimensions.get('window')
const Row  = (data)=>{

    return (
        <View
        style={{
            flexDirection : 'row',
            justifyContent : 'space-between',
            padding : 5
        }}
        >
            <Text
            style={{
                fontWeight : 'bold',
            }}
            >
                {data.label}
            </Text>

            <Text
            style={{
                fontWeight : 'bold',
                color : '#012326'
            }}
            >
                {data.value}
            </Text>

        </View>
    )
};

const OverView = (data,onPress) =>{
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

export default ({ navigation ,route}) =>{
    const { favourites } = useSelector(state => state.movies)
    const dispatch = useDispatch();
    let {
        id,
        backdrop_path,
        poster_path,
        release_date,
        title,
        overview,
        vote_average
    } = route.params;
    let isMarked = favourites.some(i =>i == id)
    console.log(favourites)

    let imageUrl = backdrop_path ? 
    `https://image.tmdb.org/t/p/w500/${backdrop_path}` : 
    '';
    let posterUrl = poster_path ? 
    `https://image.tmdb.org/t/p/w500/${poster_path}` : 
    '';

    let releaseDate = new Date(release_date).getFullYear()
    return (
    <ScrollView
    // contentContainerStyle={{flex:1}}
    >
      <Animated.View 
      style={styles.poster}
      entering={FadeInRight.duration(400).delay(600)}
      >
        <Image
          source={{ uri: imageUrl}}
          style={styles.poster}
         
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
                width : 50,
                height : 50,
                borderRadius : 25,

            }}
            >
                <Entypo name="star" size={30}  color='#FFD700' />

            </View>

            }
       
        
      </Animated.View>

      <View
      style={styles.details}
      >
        <Text
        style={{
            fontSize :20,
            fontWeight : 'bold',
            color : '#012326',
            marginVertical : 10
        }}
        >
            {title}
        </Text>
      
        
        { OverView(
            {
            overview : overview ,
            releaseDate : releaseDate,
            vote_average : vote_average,
            posterUrl  : posterUrl,
            isMarked: isMarked
         },
         ()=> isMarked ? 
               dispatch(removeFromFavourites({id : id}))
             : dispatch(addToFavourites({id : id}))
         )}
        
      
       
     

      </View>
   
      </ScrollView>
    );
  }
  
const styles = StyleSheet.create({
    container:{
        flex:1,
     
    },
    poster : {
        width: width,
        height:height*.3,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
    },
    details : {
        flex:1,
        width : '100%',
        backgroundColor : 'white',
        marginTop : -20,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        padding : 10,
        marginVertical : 20
    }
    })