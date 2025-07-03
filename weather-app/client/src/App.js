// client/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [recent, setRecent] = useState([]);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/weather/${city}`);
      setWeather(res.data);
      setCity("");
      fetchRecent();
    } catch (err) {
      alert("City not found");
    }
  };

  const fetchRecent = async () => {
    const res = await axios.get("http://localhost:5000/recent");
    setRecent(res.data);
  };

  useEffect(() => {
    fetchRecent();

   
  }, []);

  return (
    <div className="container">
      <h1>🌤 Weather App</h1>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡 {weather.main.temp}°C</p>
        </div>
      )}

      <h3>Recent Searches</h3>
      { <ul>
        {recent.map((c, i) => (
          <li key={i}>{c.name}</li>
        ))}
      </ul> }

    </div>
  );
}

export default App;
