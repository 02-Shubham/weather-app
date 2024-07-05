// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { red } from '@mui/material/colors';
// import { useState } from 'react';

// export default function SearchBox({updateInfo}){
//     let [city,setCity]=useState("");
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
// };
// 2nd code with no suggestion  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "948e0254af0750a8f8dc87c98313f1dc";

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const jsonResponse = await response.json();
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
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    setError(""); // Reset error when user starts typing
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
    <div className='SearchBox'>
      <h3>Search for the Weather</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          onChange={handleChange}
          value={city}
          required
        />
        <br />
        <br />
        <Button variant="contained" type="submit">Search</Button>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
      </form>
    </div>
  );
};
// 3rd code with suggestion
// import React, { useState, useRef, useCallback } from 'react';
// import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// const libraries = ["places"];
// const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";

// export default function SearchBox({ updateInfo }) {
//   const [city, setCity] = useState("");
//   const [error, setError] = useState("");
//   const searchBoxRef = useRef(null);
//   const API_URL = "https://api.openweathermap.org/data/2.5/weather";
//   const API_KEY = "948e0254af0750a8f8dc87c98313f1dc";

//   const getWeatherInfo = async () => {
//     try {
//       const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
//       if (!response.ok) {
//         throw new Error("City not found");
//       }
//       const jsonResponse = await response.json();
//       const result = {
//         city: city,
//         temp: jsonResponse.main.temp,
//         tempMin: jsonResponse.main.temp_min,
//         tempMax: jsonResponse.main.temp_max,
//         humidity: jsonResponse.main.humidity,
//         feelsLike: jsonResponse.main.feels_like,
//         weather: jsonResponse.weather[0].description,
//       };
//       return result;
//     } catch (err) {
//       throw err;
//     }
//   };

//   const handlePlacesChanged = useCallback(() => {
//     const places = searchBoxRef.current.getPlaces();
//     if (places && places.length > 0) {
//       setCity(places[0].formatted_address);
//       setError(""); // Reset error when a valid place is selected
//     }
//   }, []);

//   const handleSubmit = async (evt) => {
//     evt.preventDefault();
//     try {
//       const newInfo = await getWeatherInfo();
//       updateInfo(newInfo);
//       setCity(""); // Clear input field on success
//     } catch (err) {
//       setError("No such place exists!"); // Display error message
//     }
//   };

//   return (
//     <div className='SearchBox'>
//       <h3>Search for the Weather</h3>
//       <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
//         <StandaloneSearchBox
//           onLoad={(ref) => (searchBoxRef.current = ref)}
//           onPlacesChanged={handlePlacesChanged}
//         >
//           <TextField
//             id="city"
//             label="City Name"
//             variant="outlined"
//             value={city}
//             required
//             fullWidth
//             onChange={(e) => setCity(e.target.value)}
//           />
//         </StandaloneSearchBox>
//       </LoadScript>
//       <br />
//       <br />
//       <Button variant="contained" type="submit" onClick={handleSubmit}>Search</Button>
//       {error && <h3 style={{ color: "red" }}>{error}</h3>}
//     </div>
//   );
// }