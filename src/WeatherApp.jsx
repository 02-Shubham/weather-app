// import SearchBox from "./searchbox"
// import InfoBox from "./infoBox"
// import { useState } from "react";
// import './WeatherApp.css';

// export default function WeatherApp(){
//     const today = new Date();
//     const month = today.getMonth()+1;
//     const year = today.getFullYear();
//     const date = today. getDate();
//     const currentDate = date + "/" + month + "/" + year;
    
//     let [weatherInfo,setWeatherInfo]=useState({
//         city: "Mumbai",
//         feelsLike: 36.99,
//         humidity: 79,
//         temp:25.05,
//         tempMax:25.05,
//         tempMin: 25.05,
//         weather:"haze",
//     });
//     let updateInfo=(newInfo)=>{
//         setWeatherInfo(newInfo);
//     }
//     return(<div className="content">
//         <h4 className="Date">{currentDate}</h4>
//         <SearchBox updateInfo={updateInfo} className="SearchBox"/>
//         <InfoBox info={weatherInfo}/>
//         </div>
//         )
// }
import SearchBox from "./searchbox";
import InfoBox from "./infoBox";
import { useState } from "react";
import { Container, Typography, Box, Paper } from '@mui/material';
import './WeatherApp.css';

export default function WeatherApp() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = `${date}/${month}/${year}`;

  const [weatherInfo, setWeatherInfo] = useState({
    city: "Mumbai",
    feelsLike: 36.99,
    humidity: 79,
    temp: 25.05,
    tempMax: 25.05,
    tempMin: 25.05,
    weather: "haze",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <Container maxWidth="sm" className="content">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" className="Date" align="center">
          {currentDate}
        </Typography>
        <Box my={4}>
          <SearchBox updateInfo={updateInfo} />
        </Box>
        <InfoBox info={weatherInfo} />
      </Paper>
    </Container>
  );
}
