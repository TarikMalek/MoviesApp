import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,Dimensions,FlatList } from 'react-native';
import { fetchPopularMovies } from '../../apis/moviesApi';

import MovieListItem from '../../components/MovieListItem';
import AnimatedLoadingOverlay from '../../components/AnimatedLoadingOverlay';
import { FlashList } from "@shopify/flash-list";
import { useSelector,useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { fetchWeather } from '../../apis/weatherApi';
import WeatherAnimation from '../../components/WeatherAnimation';
import { 
    setLoading,
    setMoviesList,
    setCurrentPage,
    setTotalPages,
    setLocation,
    setWeatherData
} from '../../store/actions/MoviesListAction';
import  Header from './Header'
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
      console.log(res)
      dispatch(setMoviesList({movies:res?.results,reset: false}))
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
          dispatch(setMoviesList({movies:res?.results,reset: false}))
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
        renderItem={({ item,index }) => <MovieListItem
            // key={index.toString()}
            keyExtractor={item => item.id.toString()}
            data={item}
            favourites={favourites}
            />}
        estimatedItemSize={height*.3}
        onEndReached={()=>OnEndReached()}
        ListFooterComponent={<View style={{width : width, height :height*.1}}/>}
        ListHeaderComponent={
        <Header
        weather={weather}
        width={width}
        height={height}
        />
        }
        ListEmptyComponent={
          <View
          style={{
              width : '100%',
              height : '100%',
              justifyContent : 'center',
              alignItems : 'center',
          }}
          >
              <Text style={{color : 'white',fontSize : 20}}>No Movies</Text>

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

