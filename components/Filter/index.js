import React,{useEffect,useState,useCallback} from 'react';
import { 
    View, 
    StyleSheet,
   
} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { 
    setMoviesList,
    setTotalPages,
    setLoading,
    setFilters 
} from '../../store/actions/MoviesListAction'
import BSTextInput from './BSTextInput';
import { searchMovies } from '../../apis/searchMovies';
export default ({

 }) => {
    const { filters ,genres } = useSelector(state => state.movies);
    const [value,setValue] = useState('')
    const dispatch = useDispatch();
    console.log('genres',genres);
    useEffect(()=>{
        if (filters?.search){
            setValue(filters?.search)
        }
    },[filters?.search])


    const search = useCallback(async ()=>{
        dispatch(setLoading({loading : true})) 
        searchMovies({
            currentPage: 1,
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

    },[value])

    const onTextChange = (val)=>{
        setValue(val);

        if (val.length %3 == 0){
            dispatch(setFilters({search : val}))
            search()
        };
    };


    return (
        <View style={styles.container}>
            <BSTextInput
            onChange={onTextChange}
            placeholder={'search by name ..'}
            value={value}
            containerStyle={{width : '100%'}}
            />
        </View>
    )

 };

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});