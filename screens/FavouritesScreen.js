import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,Dimensions,FlatList } from 'react-native';
import MovieListItem from '../components/MovieListItem';
import { useSelector,useDispatch } from 'react-redux';

const {width,height} = Dimensions.get('window');

export default ()=> {
  const dispatch = useDispatch();
  const { favourites ,moviesList} = useSelector(state => state.movies);
  const favList =  moviesList.filter(m=> favourites.includes(m.id)) ?? [];

  


  
    return (
        <>
        <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={favList}
        renderItem={({ item,index }) => <MovieListItem
            // key={index.toString()}
            keyExtractor={item => item.id.toString()}
            data={item}
            favourites={favourites}
            />}
        estimatedItemSize={height*.3}
        ListFooterComponent={<View style={{width : width, height :height*.1}}/>}
        ListEmptyComponent={
            <View
            style={{
                width : '100%',
                height : '100%',
                justifyContent : 'center',
                alignItems : 'center',
            }}
            >
                <Text style={{color : 'white',fontSize : 20}}>No Favourites</Text>

            </View>
        }
        
        />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor :'#012326',
      
      },
      
    
    })