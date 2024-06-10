import React,{useEffect,useState,useCallback} from 'react';
import { 
    View, 
    StyleSheet,
   Text
} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { 
    setMoviesList,
    setTotalPages,
    setLoading,
    addFilters 
} from '../../store/actions/MoviesListAction'
import BSTextInput from './BSTextInput';
import { searchMovies } from '../../apis/searchMovies';
import GenreIcons from './genreIcons';
export default ({

 }) => {
    const { filters  } = useSelector(state => state.movies);
    const [value,setValue] = useState('')
    const dispatch = useDispatch();
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
            dispatch(addFilters({type : "search",value : val}))
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

            <View
            style={styles.lineContainer}
            >
                <View style={styles.line}/>
                <View
                style={styles.lineTextContainer}
                >
                    <Text
                    style={styles.lineText}
                    >
                        Or Add Filters
                    </Text>

                </View>

                <View style={styles.line}/>

            </View>

            <GenreIcons 
            
            />


        </View>
    )

 };

 const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
    },
    lineContainer: {
        flex:1,
        flexDirection: 'row',
        height: 30,
     
        width: '100%',
        justifyContent: 'space-between',
        marginVertical : 20,
        alignItems : "center"
      },
      line: {
        width : '30%',
        height: 1,
        backgroundColor: 'white',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'white',
      },
      lineTextContainer: {
        flex:1,
        height: 20,
        width : '30%',
        color: 'white',
        alignItems : "center"
      },
      lineText : {
        fontSize : 14,
        fontWeight : 'bold',
        color : 'white'
      }
});