import React from 'react';
import { Cloud, CloudRain, Sun, CloudSun, Wind, Droplets, Thermometer, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';

interface WeatherDisplayProps {
  weather: any;
  unit: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, unit }) => {
  // Function to get the appropriate weather icon based on weather condition
  const getWeatherIcon = (weatherCode: string) => {
    const code = weatherCode.toLowerCase();
    
    if (code.includes('clear')) return <Sun size={64} className="text-yellow-400" />;
    if (code.includes('rain')) return <CloudRain size={64} className="text-blue-400" />;
    if (code.includes('cloud')) return <Cloud size={64} className="text-gray-400" />;
    if (code.includes('thunder')) return <CloudLightning size={64} className="text-purple-400" />;
    if (code.includes('snow')) return <CloudSnow size={64} className="text-white" />;
    if (code.includes('mist') || code.includes('fog')) return <CloudFog size={64} className="text-gray-300" />;
    
    // Default icon
    return <CloudSun size={64} className="text-yellow-400" />;
  };

  // Format date
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 mt-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-lg opacity-90">{formatDate()}</p>
          <div className="mt-4">
            <p className="text-5xl font-bold">
              {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className="text-xl capitalize mt-1">{weather.weather[0].description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white bg-opacity-10 p-4 rounded-lg flex flex-col items-center">
          <Thermometer size={24} className="mb-2" />
          <p className="text-sm opacity-80">Feels Like</p>
          <p className="font-semibold">{Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</p>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg flex flex-col items-center">
          <Droplets size={24} className="mb-2" />
          <p className="text-sm opacity-80">Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg flex flex-col items-center">
          <Wind size={24} className="mb-2" />
          <p className="text-sm opacity-80">Wind Speed</p>
          <p className="font-semibold">{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
        
        <div className="bg-white bg-opacity-10 p-4 rounded-lg flex flex-col items-center">
          <Cloud size={24} className="mb-2" />
          <p className="text-sm opacity-80">Cloudiness</p>
          <p className="font-semibold">{weather.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;