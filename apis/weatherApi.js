
export const fetchWeather = async (lat,lng) => {
   console.log(lat, lng);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          
        },
       
       
      };
      
      let response = fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.EXPO_PUBLIC_weatherApi}&q=${lat},${lng}&aqi=no`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

        return response
};
