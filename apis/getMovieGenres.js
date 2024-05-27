// 

export const getMovieGenres = async (currentPage) => {
   
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_moviesApi}`,
          
        },
       
       
      };
      
      let response = fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

        return response
};