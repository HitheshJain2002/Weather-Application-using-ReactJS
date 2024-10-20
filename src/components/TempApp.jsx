import React, { useState, useEffect } from "react";
import "./css/style.css";

const TempApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("Bengaluru");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=5cd7d07cbb658b73c59887f6d11ac585`);
        const resJson = await response.json();
        setWeatherData(resJson);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchApi();
  }, [search]);

  return (
    <div className="temp-app">
      <div className="wave"></div>
      <div className="content">
        <div className="input-data">
          <input
            type="search"
            className="input-field"
            placeholder="Search location..."
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </div>
        {weatherData && weatherData.main ? (
          <div className="info">
            <h2 className="location">
              <i className="fas fa-map-marker-alt"></i> 
              {weatherData.name}
            </h2>
            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
            <h3 className="temp-min-max">
              Min: {Math.round(weatherData.main.temp_min)}°C | Max: {Math.round(weatherData.main.temp_max)}°C
            </h3>
            <h3 className="wind">
              <div className="wind-icon">
                <i className="fa-solid fa-wind"></i>
              </div>
              Wind speed: {weatherData.wind.speed} m/s
            </h3>
            <h3 className="humidity">
              <div className="humidity-icon">
                <i className="fa-solid fa-droplet"></i>
              </div>
              Humidity: {weatherData.main.humidity}%
            </h3>
          </div>
        ) : (
          <p>Loading weather data🌏🌏🌏🌏</p>
        )}
      </div>
    </div>
  );
};

export default TempApp;