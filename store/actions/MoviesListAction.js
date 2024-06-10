export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_GENRES = 'SET_GENRES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES'; 
export const SET_LOADING = 'SET_LOADING';
export const ADD_FILTERS = 'ADD_FILTERS';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
export const SET_SHOW_BOTTOMSHEET = 'SET_SHOW_BOTTOMSHEET';


export const setGenres = (payload) => {
  return {
    type: SET_GENRES,
    payload: payload
  };
};

export const showBottomsheet = (payload) => {
  return {
    type: SET_SHOW_BOTTOMSHEET,
    payload: payload
  };
};


export const setWeatherData = (payload) => {
  return {
    type: SET_WEATHER_DATA,
    payload: payload
  };
};

export const setLocation = (payload) => {
  return {
    type: SET_LOCATION,
    payload: payload
  };
};

export const setLoading = (payload) => {
    return {
      type: SET_LOADING,
      payload: payload
    };
  };

  export const addFilters = (payload) => {
    return {
      type: ADD_FILTERS,
      payload: payload
    };
  };

  
  export const setTotalPages = (payload) => {
    return {
      type: SET_TOTAL_PAGES,
      payload: payload
    };
  };
  export const setCurrentPage = (payload) => {
    return {
      type: SET_CURRENT_PAGE,
      payload: payload
    };
  };
  
export const setMoviesList = (payload) => {
    return {
      type: SET_MOVIES_LIST,
      payload: payload
    };
  };


  export const addToFavourites = (payload) => {
    return {
      type: ADD_TO_FAVOURITES,
      payload: payload
    };
  };


  export const removeFromFavourites = (payload) => {
    return {
      type: REMOVE_FROM_FAVOURITES,
      payload: payload
    };
  };

