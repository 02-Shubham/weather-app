/* eslint-disable react/prop-types */
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// // import { red } from '@mui/material/colors';
// import { useState } from 'react';

// export default function SearchBox(updateInfo){
//     let [city,setCity]=useState(" ");
//     let [error,setError]=useState(false);
//     const API_URL="https://api.openweathermap.org/data/2.5/weather";
//     const API_KEY="948e0254af0750a8f8dc87c98313f1dc";

//     let getWheatherinfo= async()=>{
//         try{
//             let respone= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
//             let jsonRespone= await respone.json();
//             console.log(jsonRespone);
//             let result={
//              city:city,
//              temp: jsonRespone.main.temp,
//              tempMin: jsonRespone.main.temp_min,
//              tempMax: jsonRespone.main.temp_max,
//              humidity: jsonRespone.main.humidity,
//              feelsLike: jsonRespone.main.feels_like,
//              weather:jsonRespone.weather[0].description,
//             };
//             console.log(result);
//             return result;
//         }catch(err){
//             setError(true)
//             throw err;
//         }
//     };

//     let handleChange=(evt)=>{
//         setCity(evt.target.value);
//     }

//     let handleSumbit=async (evt)=>{
//         try{
//             evt.preventDefault();
//             console.log(city);
//             setCity("");
//            let newInfo= await getWheatherinfo();
//            updateInfo(newInfo);

//         }catch(err){
//             setError(true);
//         }
//     }
//     return(
//     <div className='SearchBox'>
//      <h3>Search for the wheather</h3>
//      <form onSubmit={handleSumbit}>
//       <TextField id="city"
//         label="City Name"
//         variant="outlined"
//          onChange={handleChange}
//         value={city} required/>
//     <br></br>
//     <br></br>
//       <Button variant="contained" type="submit">Search</Button>
// {error && <h3 style={{color:"red"}}>No Such Place exist!!!!</h3>}
//     </form>
//     </div>
//     )
// }

import  { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function SearchBox({updateInfo}) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "948e0254af0750a8f8dc87c98313f1dc";

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        throw new Error("City not found");
      }

      const jsonResponse = await response.json();
      if (!jsonResponse.main || !jsonResponse.weather || !jsonResponse.weather[0]) {
        console.error('Invalid response structure:', jsonResponse);
        throw new Error('Unexpected response structure');
      }

      const result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      return result;
    } catch (err) {
      console.error('Error fetching weather data:', err);
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    setError(""); // Reset error on input change
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity(""); // Clear input field on success
    } catch (err) {
      setError("No such place exists!"); // Display error message
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Search for the Weather
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="city"
            label="City Name"
            variant="outlined"
            onChange={handleChange}
            value={city}
            required
            fullWidth
          />
          <Box mt={2}>
            <Button variant="contained" type="submit" fullWidth>
              Search
            </Button>
          </Box>
          {error && (
            <Typography color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
}
