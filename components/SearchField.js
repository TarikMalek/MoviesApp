import React,{useCallback, useEffect,useState} from 'react';
import {
    View,
    Text,
    Dimensions , 
    StyleSheet
} from 'react-native';
import TextInput from './TextInput';
import { useSelector,useDispatch } from 'react-redux';
import { searchMovies } from '../apis/searchMovies';
import { 
    setLoading,
    setTotalPages,
    setMoviesList,
    
} from '../store/actions/MoviesListAction';

export default ({})=>{
    const [value,setValue]= useState('');
    const dispatch = useDispatch();
    const {
        loading,
        currentPage,
        totalPages,
       
        } = useSelector(state => state.movies);

    const search = useCallback(async ()=>{
        dispatch(setLoading({loading : true})) 
        searchMovies({
            currentPage: currentPage,
            searchQuery : value
        })
        .then(res=>{
            dispatch(setMoviesList({movies:res?.results,reset: true}))
            dispatch(setTotalPages({totalPages : res.total_pages}))
            console.log(res.total_pages)

            setTimeout(() => {
              dispatch(setLoading({loading : false}))  
          }, 1000); 
        })
        .catch(err=>{
            console.log(err)
        });

    },[value,currentPage])

    const onTextChange = (val)=>{
        setValue(val);

        if (val.length %3 == 0){
            search()
        };
    };

    return (
        <View>
        <TextInput 
        value={value}
        onChange={onTextChange}
        placeholder={'Search Movies...'}

        />
       
        </View>
    )
}