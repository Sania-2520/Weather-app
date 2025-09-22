import React, { useState } from "react";
import WeatherCard from "./WeatherCard";

const API_KEY = "6b97fa221ed2f166f6e4ad521a0a2dd7"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (err) {
      alert("Error fetching weather!");
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
