import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import { getMovieDetails } from '../../apis/getMovieDetails';
import Animated,
{ 
    FadeInRight,
    FadeInDown,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { 
    addToFavourites,
    removeFromFavourites,
    setLoading,
    showBottomsheet
} from '../../store/actions/MoviesListAction';
import Entypo from '@expo/vector-icons/Entypo';
import OverView from './OverView';

const {width , height} = Dimensions.get('window')


export default ({ navigation ,route}) =>{
    const { favourites } = useSelector(state => state.movies)
    let {
        id,
        backdrop_path,
        poster_path,
        release_date,
        title,
        overview,
        vote_average
    } = route.params;

    const [movie,setMovie]= useState(null);
    let isMarked = favourites.some(i =>i == id);
    const dispatch = useDispatch();
    let imageUrl = backdrop_path ? 
                    `https://image.tmdb.org/t/p/w500/${backdrop_path}` : 
                    '';
    let posterUrl = poster_path ? 
                    `https://image.tmdb.org/t/p/w500/${poster_path}` : 
                    '';

    let releaseDate = new Date(release_date).getFullYear()

    useEffect(()=>{
        dispatch(setLoading({loading : true}));
        getMovieDetails(id)
        .then(res=>{
           setMovie(res);
           setTimeout(() => {
            dispatch(setLoading({loading : false}))  
        }, 800); 
        })
        .catch(err => console.log('movie details error' , err))
    },[])

    
    

    
    
    return (
    <ScrollView>
      <Animated.View 
      style={styles.poster}
      entering={FadeInRight.duration(400).delay(1100)}
      >
        <Image
          source={{ uri: imageUrl}}
          style={styles.poster}
         
        />
          {isMarked &&
            <View
            style={styles.favouriteIcon}
            >
                <Entypo name="star" size={30}  color='#FFD700' />

            </View>

            }
       
        
      </Animated.View>

      <View
      style={styles.details}
      >
        <Text
        style={styles.title}
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
         ()=> {
            isMarked ? 
               dispatch(removeFromFavourites({id : id}))
             : dispatch(addToFavourites({id : id}));

            
            }
         )}
        
      
       
     

      </View>

      
      </ScrollView>
    );
  }
  
const styles = StyleSheet.create({
    container:{
        flex:1,
     
    },
    title : {
        fontSize :20,
        fontWeight : 'bold',
        color : '#012326',
        marginVertical : 10
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
    },
    favouriteIcon : {
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
    }
    })