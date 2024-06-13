import SearchBox from "./searchbox"
import InfoBox from "./infoBox"
import { useState } from "react";
import './WeatherApp.css';

export default function WeatherApp(){
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    const currentDate = date + "/" + month + "/" + year;
    const showTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds(); 

    let [weatherInfo,setWeatherInfo]=useState({
        city: "Mumbai",
        feelsLike: 36.99,
        humidity: 79,
        temp:25.05,
        tempMax:25.05,
        tempMin: 25.05,
        weather:"haze",
    });
    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return(<div className="content">
        <h2>Weather App by Shubham</h2>
        <h4 className="Date">{currentDate}</h4>
        {/* <h4 >{showTime}</h4> */}
        <SearchBox updateInfo={updateInfo} className="SearchBox"/>
        <InfoBox info={weatherInfo}/>
        </div>
        )
}