import React from 'react';
import { Sun, CloudRain, Cloud, CloudSun, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';

interface ForecastSectionProps {
  forecast: any[];
  unit: string;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast, unit }) => {
  // Function to get the appropriate weather icon based on weather condition
  const getWeatherIcon = (weatherCode: string, size = 36) => {
    const code = weatherCode.toLowerCase();
    
    if (code.includes('clear')) return <Sun size={size} className="text-yellow-400" />;
    if (code.includes('rain')) return <CloudRain size={size} className="text-blue-400" />;
    if (code.includes('cloud')) return <Cloud size={size} className="text-gray-400" />;
    if (code.includes('thunder')) return <CloudLightning size={size} className="text-purple-400" />;
    if (code.includes('snow')) return <CloudSnow size={size} className="text-white" />;
    if (code.includes('mist') || code.includes('fog')) return <CloudFog size={size} className="text-gray-300" />;
    
    // Default icon
    return <CloudSun size={size} className="text-yellow-400" />;
  };

  // Format date
  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-white text-center"
          >
            <p className="font-medium">{formatDay(day.dt_txt)}</p>
            <div className="my-3 flex justify-center">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p className="text-sm capitalize opacity-80">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;