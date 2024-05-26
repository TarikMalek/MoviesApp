
export const searchMovies = async (params) => {
   
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_moviesApi}`,
          
        },
      };
      const baseUrl = 'https://api.themoviedb.org/3/search/movie';
      const urlParams = new URLSearchParams({
        language: 'en-US',
        page: params?.currentPage,
        query: params?.searchQuery ?? ''
      });
      const fullUrl = `${baseUrl}?${urlParams.toString()}`;
      console.log(fullUrl)
      let response = fetch(fullUrl, options)
        .then(response => response.json())
        // .then(response => console.log(JSON.stringify(response, null, 2)))
        .catch(err => console.error(err));

        return response
};