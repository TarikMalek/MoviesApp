import { current } from '@reduxjs/toolkit';
import {
    SET_FILTERS,
    SET_LOADING,
    SET_MOVIES_LIST,
    REMOVE_FROM_FAVOURITES,
    ADD_TO_FAVOURITES,
    SET_CURRENT_PAGE,
    SET_LOCATION,
    SET_TOTAL_PAGES,
    SET_WEATHER_DATA,
    SET_SHOW_BOTTOMSHEET,
    SET_GENRES
} from '../actions/MoviesListAction';


const initialState = {
    loading: false,
    genres : [],
    moviesList: [],
    filters: {
        genre: '',
        sortBy: '',
        search: ''
    },
    favourites: [],
    currentPage : 1,
    totalPages : 0,
    location : null,
    weather : null,
    showBottomSheet : true,
};


const moviesReducer = (state= initialState,action) => {
    switch (action.type) {

    case SET_GENRES:
        return {
            ...state,
            genres: action.payload
        };
        
    case SET_WEATHER_DATA:
        return {
            ...state,
            weather: action.payload
        };
    case SET_LOCATION:
        return {
            ...state,
            location: action.payload
        };
      case SET_LOADING:
        return {
            ...state,
            loading: action.payload.loading
        };

        case SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload.page
        };

        case SET_TOTAL_PAGES:
        return {
            ...state,
            totalPages: action.payload.totalPages
        };


      case SET_MOVIES_LIST:
        return {
            ...state,
            moviesList: action.payload.reset ? 
            action.payload.movies :
            [
                ...state.moviesList,
                ...action.payload.movies.filter(i => !state.moviesList.some(j => j.id === i.id))
            ]
        };

      case SET_FILTERS:
        return {
            ...state,
            filters:{
                ...state.filters,
                ...action.payload
            }
        };

      case ADD_TO_FAVOURITES:
        return {
            ...state,
            favourites: [
                ...state.favourites,
                action.payload.id
            ]
        };

      case REMOVE_FROM_FAVOURITES:
        return {
            ...state,
            favourites: state.favourites.filter(i => i !== action.payload.id)
            
        };

        default:
          return state
    }
  
  }
  
  
  export default moviesReducer;