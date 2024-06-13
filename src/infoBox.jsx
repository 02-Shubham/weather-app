import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './infoBox.css'

export default function InfoBox({info }){
    const IMG_URL="https://cdn.pixabay.com/photo/2018/06/21/13/57/clouds-3488632_1280.jpg";
    const RAIN_URL="https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717977600&semt=ais_user";
    const HOT_URL="https://t4.ftcdn.net/jpg/05/18/43/73/360_F_518437397_j4c3cOSYK54AjCis5muIjPaHw2KBTCeH.jpg"
    const COLD_URL="https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const NOR_URL="https://www.livemint.com/lm-img/img/2024/04/16/600x338/g160875cf6b2d940ea943c6f45d5c488751c92c99e23f631a15c3972d98fe43315431039dd7c4c35813f05fd0f686c64648a3c1474c7dedca06c2061a6e8bd0c8_1280_1713254939668_1713254954065.jpg"


    return(
        <div className="InfoBox">
          <h3 className='Heading'>Weather - {info.weather.toUpperCase()}</h3>
          <Card sx={{ maxWidth: 345 }}>
          <CardMedia
        sx={{ height: 140 }}
        image={
          info.humidity >80
          ?RAIN_URL
          :info.temp>30
          ?HOT_URL
          :15<info.temp<30
          ?NOR_URL
          :COLD_URL}

        title="weather"
        />
        <CardContent className='Card'>
        <Typography gutterBottom variant="h5" component="div">
          {info.city.toUpperCase()}

        </Typography>
        <Typography variant="body2" color="text.secondary" component={"span"}>
         <p>Temperature={info.temp}&deg;C</p>
         <p>Humidity={info.humidity}</p>
         <p>Max Temperature={info.tempMax}&deg;C</p>
         <p>Min Temperature={info.tempMin}&deg;C</p>
         <h4>The Weather can be described as {info.weather} and feels like{info.feelsLike}</h4>

        </Typography>
      </CardContent>
    </Card>  
        </div>
    )
}