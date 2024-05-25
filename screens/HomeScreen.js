import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,Dimensions,FlatList } from 'react-native';
import { fetchPopularMovies } from '../apis/moviesApi';
import MovieListItem from '../components/MovieListItem';
import AnimatedLoadingOverlay from '../components/AnimatedLoadingOverlay';
import { FlashList } from "@shopify/flash-list";
import { useSelector,useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { fetchWeather } from '../apis/weatherApi';
import WeatherAnimation from '../components/WeatherAnimation';
import { 
    setLoading,
    setMoviesList,
    setCurrentPage,
    setTotalPages,
    setLocation,
    setWeatherData
} from '../store/actions/MoviesListAction';
const {width,height} = Dimensions.get('window');

export default ()=> {
  const dispatch = useDispatch();
  const {
    favourites,
    moviesList,
    loading,
    currentPage,
    totalPages,
    location,
    weather
    } = useSelector(state => state.movies);


  useEffect(()=>{
    (async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        dispatch(setLocation(location))
      })();

    dispatch(setLoading({loading : true})) 
    fetchPopularMovies(currentPage)
    .then(res=>{
    
      dispatch(setMoviesList(res?.results))
      dispatch(setTotalPages({totalPages : res.total_pages}))
      setTimeout(() => {
        dispatch(setLoading({loading : false}))  
    }, 1000); 
    })
    .catch(err=>console.log('error',err))
  },[])

  const OnEndReached = ()=>{
    if(currentPage < totalPages){
      dispatch(setCurrentPage({page : currentPage+1}))
    }
  };

  useEffect(()=>{
    if(currentPage < totalPages){
        console.log('fetching movies')
        dispatch(setLoading({loading : true}))  
        fetchPopularMovies(currentPage) 
        .then(res=>{
          dispatch(setMoviesList(res?.results))
        setTimeout(() => {
            dispatch(setLoading({loading : false}))  
        }, 1000);

        })
        .catch(err=>console.log('error', err)) 
    }
  },[currentPage])


  useEffect(()=>{
    if (location) {
        fetchWeather(location.coords.latitude,location.coords.longitude)
        .then(res=>{
            dispatch(setWeatherData(res))
        })
    }

  },[location])

  
    return (
        <>
        <FlatList
        contentContainerStyle={styles.container}
        data={moviesList}
        renderItem={({ item }) => <MovieListItem
            key={item.id.toString()}
            data={item}
            favourites={favourites}
            />}
        estimatedItemSize={height*.3}
        onEndReached={()=>OnEndReached()}
        ListFooterComponent={<View style={{width : width, height :height*.1}}/>}
        ListHeaderComponent={
        <View 
        style={{
            width : width,
            //  height :height*.15,
             borderWidth :1,
             borderColor :'#DDDD',
             borderRadius : 10,
             justifyContent : 'center',
           
            }}
        >
            {(weather) &&
            <View
            style={{
                flexDirection : 'row',
                width : '95%',
                justifyContent : 'space-between',
                alignSelf : 'center',
                padding : 20,
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
                    // marginTop : -10
                }}
                >
                    {`feels like ${Math.round(weather?.current?.feelslike_c)} c'`}
                
                </Text>
                
            </View>
           
           
               
            </View>
        
                
            }
        </View>
        }
        
        />
        {loading && <AnimatedLoadingOverlay />}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor :'#012326',
      
      },
      
    
    })

