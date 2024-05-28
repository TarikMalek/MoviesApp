
export const getMovieDetails = async (id) => {
   
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_moviesApi}`,
          
        },
       
       
      };
      
      let response = fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,images,credits`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

        return response
};