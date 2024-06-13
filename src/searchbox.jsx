import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city,setCity]=useState("");
    let [error,setError]=useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="948e0254af0750a8f8dc87c98313f1dc";

    let getWheatherinfo= async()=>{
        try{
            let respone= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonRespone= await respone.json();
            console.log(jsonRespone);
            let result={
             city:city,
             temp: jsonRespone.main.temp,
             tempMin: jsonRespone.main.temp_min,
             tempMax: jsonRespone.main.temp_max,
             humidity: jsonRespone.main.humidity,
             feelsLike: jsonRespone.main.feels_like,
             weather:jsonRespone.weather[0].description,
            };
            console.log(result);
            return result;
        }catch(err){
            setError(true)
            throw err;
        }
    };

    let handleChange=(evt)=>{
        setCity(evt.target.value);
    }

    let handleSumbit=async (evt)=>{
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
           let newInfo= await getWheatherinfo();
           updateInfo(newInfo);

        }catch(err){
            setError(true);
        }
    }
    return(
    <div className='SearchBox'>
     <h3>Search for the wheather</h3>
     <form onSubmit={handleSumbit}>
      <TextField id="city"
        label="City Name"
        variant="outlined"
         onChange={handleChange}
        value={city} required/>
    <br></br>
    <br></br>
      <Button variant="contained" type="submit">Search</Button>
{error && <h3 style={{color:"red"}}>No Such Place exist!!!!</h3>}
    </form>
    </div>
    )
};