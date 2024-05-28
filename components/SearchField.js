import React,{useCallback, useEffect,useState} from 'react';
import {
    View,
    Text,
    Dimensions , 
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import TextInput from './TextInput';
import { useSelector,useDispatch } from 'react-redux';
import { searchMovies } from '../apis/searchMovies';
import { 
    setLoading,
    setTotalPages,
    setMoviesList,
    setFilters
} from '../store/actions/MoviesListAction';
import { Ionicons } from '@expo/vector-icons';
const {width,height} = Dimensions.get('window');
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
            dispatch(setFilters({search : val}))
            search()
        };
    };

    return (
        <View
        style={{ width : '100%',backgroundColor : '#012326'}}
        >

         <View
            style={{
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent : 'space-between',
                width : '95%',
                paddingHorizontal : 10,
                
            }}
         >
            
        <TextInput 
        value={value}
        onChange={onTextChange}
        placeholder={'Search Movies...'}
         containerStyle={{ width : '80%' }}
        />
        <TouchableOpacity
        onPress={()=>{

        }}
        >
            <Ionicons name="filter" size={35} color="white" />
        </TouchableOpacity>
        
        </View>   
        </View>
    )
}