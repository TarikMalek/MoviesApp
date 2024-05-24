import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { fetchPopularMovies } from './apis/moviesApi';
export default function App() {
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    fetchPopularMovies()
    .then(res=>{
      console.log(JSON.stringify(res, null, 2))
      setMovies(res?.results ?? [])
    })
    .catch(err=>console.log('error',err))
  },[])
  console.log('movies',movies)
  return (
   <ScrollView
   contentContainerStyle={styles.container}
   >
    {movies.map(movie=><Text>{movie?.original_title}</Text>)}
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
