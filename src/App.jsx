import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [response, setResponse] = useState(null); 
  const [error, setError] = useState(null)

  const apiKey = '2be1bde89279adbbe4812225705710f6';

  const searchHandle = async (e) => {
    e.preventDefault();
    try{
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await axios.get(apiUrl);
      setResponse(res.data);
    }catch(err){
       setError('Enter valid city')
       setResponse(null)
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={searchHandle} className="mt-2">Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      {response && (
        <div>
          <h2>Name: {response.name}</h2>
          <h2>Temp: {response.main.temp}°C</h2>
          <h2>Humidity: {response.main.humidity}%</h2>
          <h2>Pressure: {response.main.pressure} hPa</h2>
        </div>
      )}
    </div>
  );
};

export default App;
