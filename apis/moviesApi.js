
export const fetchPopularMovies = async (currentPage,genres) => {
   
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_moviesApi}`,
          
        },
       
       
      };
      let apiBase = `https://api.themoviedb.org/3/discover/movie?page=${currentPage}`
      if (genres?.length) {
        apiBase = apiBase+'&with_genres='
        genres.map((g,ix)=>{
          apiBase += g
          if (ix < genres.length - 1) apiBase += '|'
        })
      }
      
      let response = fetch(apiBase, options)
        .then(response => response.json())
        // .then(response => console.log(JSON.stringify(response, null, 2)))
        .catch(err => console.error(err));

        return response
};