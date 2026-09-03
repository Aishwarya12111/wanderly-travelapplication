import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, RefreshCw } from 'lucide-react';
import { WeatherSkeleton } from './LoadingState';
import ErrorState from './ErrorState';
import './WeatherCard.css';

export default function WeatherCard({ weather, loading, error, onRetry, locationName = "Current Weather" }) {
  if (loading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Weather unavailable"
        message="We couldn't fetch the latest weather for this location. Please try again."
        onRetry={onRetry}
      />
    );
  }

  if (!weather) return null;

  const { temp, feelsLike, condition, mainCondition, humidity, windSpeed, provider } = weather;

  // Select appropriate Lucide weather icon
  const getWeatherIcon = (main) => {
    switch (main?.toLowerCase()) {
      case 'rain':
      case 'drizzle':
        return <CloudRain className="weather-icon-svg text-accent" size={38} />;
      case 'snow':
        return <CloudSnow className="weather-icon-svg text-accent" size={38} />;
      case 'thunderstorm':
        return <CloudLightning className="weather-icon-svg text-accent" size={38} />;
      case 'clouds':
      case 'fog':
      case 'mist':
        return <Cloud className="weather-icon-svg text-accent" size={38} />;
      case 'clear':
      default:
        return <Sun className="weather-icon-svg text-accent" size={38} />;
    }
  };

  return (
    <div className="weather-card animate-fade-in">
      <div className="weather-card-header">
        <div>
          <span className="eyebrow weather-eyebrow">CURRENT WEATHER</span>
          <h3 className="weather-location-name">{locationName}</h3>
        </div>
        <div className="weather-icon-box">
          {getWeatherIcon(mainCondition)}
        </div>
      </div>

      <div className="weather-temp-row">
        <div className="weather-main-temp">
          <span className="temp-number">{temp}°</span>
          <span className="temp-unit">C</span>
        </div>
        <div className="weather-condition-desc">
          <span className="condition-title">{condition}</span>
          <span className="feels-like-text">Feels like {feelsLike}°</span>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="weather-detail-item">
          <Droplets size={16} className="detail-icon" />
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="weather-detail-item">
          <Wind size={16} className="detail-icon" />
          <span className="detail-label">Wind</span>
          <span className="detail-value">{windSpeed} km/h</span>
        </div>
        <div className="weather-detail-item">
          <Thermometer size={16} className="detail-icon" />
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{feelsLike}°C</span>
        </div>
      </div>

      <div className="weather-footer">
        <span className="provider-tag">Live Feed ({provider})</span>
        <button onClick={onRetry} className="weather-refresh-btn" aria-label="Refresh weather data">
          <RefreshCw size={13} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}
