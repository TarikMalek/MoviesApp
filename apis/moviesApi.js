const TMDB_API_KEY = process.env.EXPO_PUBLIC_moviesApi; 

export const fetchPopularMovies = async () => {
   
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_moviesApi}`,
          
        },
       
       
      };
      
      let response = fetch('https://api.themoviedb.org/3/discover/movie', options)
        .then(response => response.json())
        // .then(response => console.log(JSON.stringify(response, null, 2)))
        .catch(err => console.error(err));

        return response
};