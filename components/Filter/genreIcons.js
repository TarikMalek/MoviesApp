import React from 'react';
import { 
    MaterialIcons,
    Entypo,
    MaterialCommunityIcons,
    FontAwesome5,
    AntDesign,
    FontAwesome6,
    Ionicons
} from '@expo/vector-icons';
import { 
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { 
    addFilters
} from '../../store/actions/MoviesListAction'

// family 
// <MaterialIcons name="family-restroom" size={24} color="black" /> 


// history 
// <Entypo name="book" size={24} color="black" />

// drama 
// <MaterialCommunityIcons name="drama-masks" size={24} color="black" />

// action 
// <FontAwesome5 name="car-crash" size={24} color="black" />

//scifi 
// <MaterialCommunityIcons name="deathly-hallows" size={24} color="black" />

// comedy 
// <MaterialIcons name="theater-comedy" size={24} color="black" />

// documentary 
// <AntDesign name="videocamera" size={24} color="black" />

// mystery 
// <MaterialCommunityIcons name="head-question" size={24} color="black" />

//thriler 
// <FontAwesome6 name="person-falling-burst" size={24} color="black" />

//war 
// <MaterialCommunityIcons name="tank" size={24} color="black" />

// romance 
// <AntDesign name="heart" size={24} color="black" />

// animationm 
// <MaterialCommunityIcons name="animation-play" size={24} color="black" />

//music 
//<Ionicons name="musical-notes-outline" size={24} color="black" />

//crime 
// <MaterialCommunityIcons name="pistol" size={24} color="black" />

// western 
// <MaterialCommunityIcons name="cactus" size={24} color="black" />

// horror 
// <FontAwesome5 name="ghost" size={24} color="black" />
let supportedGenres = [
    'Family',
    'History',
    'Drama',
    'Action' ,
    'Science Fiction',
    'Comedy',
    'Documentary',
    'Mystery',
    'Thriler',
    'War',
    'Romance',
    'Animation' ,
    'Music',
    'Crime',
    'Western',
    'Horror'
]
const getIcon = (name)=>{
    switch (name){
        case 'Family' :
            return {
                Component : MaterialIcons,
                name : 'family-restroom',
                label : 'Family',
                };

        case 'History' :
            return {
                Component :  Entypo,
                name  : 'book',
                label : 'History',
            };

        case 'Drama' :
            return {
                Component :  MaterialCommunityIcons,
                name : 'drama-masks',
                label : 'Drama',
            };

        case 'Action' :
            return { 
                Component : FontAwesome5,
                name : 'car-crash',
                label : 'Action',
            };

        case 'Science Fiction' :
            return {
                Component :  MaterialCommunityIcons,
                name : 'deathly-hallows',
                label : 'SciFi',
            };

        case 'Comedy' :
            return {
                Component : MaterialIcons,
                name : 'theater-comedy',
                label : 'Comedy',
            };

        case 'Documentary' :
            return {
                Component : AntDesign,
                name : 'videocamera',
                label : 'Documentary',
            };

        case 'Mystery' :
            return {
                Component : MaterialCommunityIcons,
                name : 'head-question',
                label : 'Mystery',
            };

        case 'Thriler' :
            return {
                Component :FontAwesome6,
                name :'person-falling-burst',
                label : 'Thriler',
            };
    
        case 'War' :
            return {
                Component :MaterialCommunityIcons,
                name :'tank',
                label : 'War',
            };

        case 'Romance' :
            return {
                Component : AntDesign,
                name : 'heart',
                label : 'Romance',
            };

        case 'Animation' :
            return {
                Component :MaterialCommunityIcons,
                name : 'animation-play',
                label : 'Animation',
            };   

        case 'Music' :
            return {
                Component : Ionicons,
                name : 'musical-notes-outline',
                label : 'Music',
            };  
            
        case 'Crime' :
            return {
                Component : MaterialCommunityIcons,
                name : 'pistol',
                label : 'Crime',
            }; 

        case 'Western' :
            return {
                Component : MaterialCommunityIcons,
                name : 'cactus',
                label : 'Western',
            }; 

        case 'Horror' :
            return {
                Component : FontAwesome5,
                name : 'ghost',
                label : 'Horror',
            }; 
            
         default :
            return {
                Component : null ,
                name : null,
                label : null
            };
    }
}

const renderItem = (item,onPress,filters)=> {
    let { Component ,name,label} = getIcon(item?.name)
    let isChecked = filters?.genre?.includes(item?.id)
    console.log(filters)

    return (
        <>
        {Component &&
            
        <TouchableOpacity
        style={{
            width : '25%',
            marginVertical: 10,
            alignItems: 'center',
            justifyContent : 'center'
        }}
        onPress={()=> onPress(item?.id)}
        >
            
            <Component 
             size={isChecked  ? 30 : 20} 
             color={isChecked  ? '#FFD700' : 'white'} 
             name={name}
             />
            
            <Text
            style={{
                color : isChecked  ? '#FFD700' : 'white',
                fontSize : 14,
                fontWeight : 'bold',
                marginTop:10
            }}
            >
                {label}
            </Text>

        </TouchableOpacity>
            
       

        }
        </>
    )
}


export default () =>{

    const { filters,genres } = useSelector(state=> state.movies);
    const dispatch = useDispatch();
    const onPress =(id)=>{
        dispatch(addFilters({
            type : 'genre',
            value : id
        }))
    }
    return (
        <FlatList
          data={genres?.filter(g=> supportedGenres.includes(g.name))}
          renderItem={({item})=> renderItem(item,onPress,filters)}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}  // Display 4 items per row
          columnWrapperStyle={styles.row}
        />
      );
    };
    
    const styles = StyleSheet.create({
      row: {
        flex: 1,
        justifyContent: 'flex-start',  // Align items to the left
      },
      item: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#f9c2ff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

