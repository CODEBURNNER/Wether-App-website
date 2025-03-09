import React, { useState, useEffect } from 'react';
import { Search, Cloud, CloudRain, Sun, CloudSun, Wind, Droplets, Thermometer } from 'lucide-react';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import ForecastSection from './components/ForecastSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

// OpenWeatherMap API key
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Fetch weather data when city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, unit]);

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Current weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found. Please try another location.');
      }
      
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      
      // 5-day forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available.');
      }
      
      const forecastData = await forecastResponse.json();
      
      // Process forecast data to get one forecast per day
      const dailyForecasts = forecastData.list
        .filter((forecast, index) => index % 8 === 0) // Get one forecast per day (every 24 hours)
        .slice(0, 5); // Limit to 5 days
      
      setForecast(dailyForecasts);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (searchCity) => {
    if (searchCity.trim() !== '') {
      setCity(searchCity);
    }
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center">
            <Cloud className="mr-2" size={36} />
            Weather App
          </h1>
          <p className="text-white text-opacity-90">Get real-time weather information for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-4 flex justify-center">
          <button 
            onClick={toggleUnit}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full transition duration-300 flex items-center"
          >
            <Thermometer size={18} className="mr-2" />
            Switch to {unit === 'metric' ? '°F' : '°C'}
          </button>
        </div>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}
        
        {weather && !loading && (
          <>
            <WeatherDisplay weather={weather} unit={unit} />
            <ForecastSection forecast={forecast} unit={unit} />
          </>
        )}
        
        {!city && !loading && !error && (
          <div className="bg-white bg-opacity-20 rounded-lg p-8 text-center text-white mt-8">
            <div className="flex justify-center mb-4">
              <Search size={48} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Search for a City</h2>
            <p>Enter a city name to get the current weather and forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;