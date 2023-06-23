import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import '../css/main.css';

function Main() {
    const apikey=process.env.REACT_APP_WEATHER_API;
    const [city, setcity] = useState('delhi');
    const [info, setinfo] = useState('');
    const [wrong,setwrong]=useState(false);
    const [render,setrender]=useState(false);
    const func=(e)=> {
        if (e.key === 'Enter') {
           setrender(true);
           setwrong(false);
        }
    }
  useEffect(()=>{
    const fetchcity= async()=>{
      try{
        const {data}=await axios.get(`${server}q=${city}&appid=${apikey}&units=metric`);
        setinfo(data);
      }
      catch(error){
        setwrong(true);
      }
      setrender(false);
    }
    fetchcity();
  },[render]);
  
  return (
    <>
      <div className="body">
        <div className="search">
          <input
            value={city}
            onChange={(event) => setcity(event.target.value)}
            onKeyDown={func}
            placeholder="Enter Location"
            type="text"
          />
        <div className="div">
            <div className="div-centered">
                {wrong?<div>Wrong city! Please entered correct city name</div>:<div></div>}
            </div>
        </div>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{info.name}</p>
            </div>
            <div className="temp">
              {info.main ? <h1>{info.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {info.weather ? <p>{info.weather[0].main}</p> : null}
            </div>
          </div>

          {info.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {info.main ? (
                  <p className="bold">{info.main.feels_like.toFixed()}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {info.main ? (
                  <p className="bold">{info.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {info.wind ? (
                  <p className="bold">{info.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
