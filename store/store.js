
import moviesReducer from '../store/reducers/MoviesReducer';

import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({

  reducer: {
    movies:moviesReducer
   
  },
})