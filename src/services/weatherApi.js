/**
 * Weather API Service - OpenWeather API with Open-Meteo fallback
 */

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Format raw weather code from Open-Meteo into human readable condition
 */
function getWeatherConditionFromWmoCode(code) {
  if (code === 0) return { main: 'Clear', description: 'Clear sky', icon: '01d' };
  if (code === 1 || code === 2 || code === 3) return { main: 'Clouds', description: 'Partly cloudy', icon: '02d' };
  if (code >= 45 && code <= 48) return { main: 'Fog', description: 'Foggy mist', icon: '50d' };
  if (code >= 51 && code <= 67) return { main: 'Rain', description: 'Light rain', icon: '10d' };
  if (code >= 71 && code <= 77) return { main: 'Snow', description: 'Snowfall', icon: '13d' };
  if (code >= 80 && code <= 82) return { main: 'Rain', description: 'Rain showers', icon: '09d' };
  if (code >= 95) return { main: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' };
  return { main: 'Clear', description: 'Pleasant', icon: '01d' };
}

/**
 * Fetch current weather by coordinates (latitude, longitude)
 */
export async function fetchWeatherByCoords(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Latitude and Longitude are required.');
  }

  // 1. Try OpenWeather API if key is present
  if (OPENWEATHER_API_KEY && OPENWEATHER_API_KEY.trim() !== '') {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        return {
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          condition: data.weather[0]?.description || 'Clear sky',
          mainCondition: data.weather[0]?.main || 'Clear',
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          locationName: data.name || 'Selected Location',
          country: data.sys?.country || '',
          iconCode: data.weather[0]?.icon || '01d',
          provider: 'OpenWeather'
        };
      }
    } catch (err) {
      console.warn('[Wanderly Weather] OpenWeather failed, attempting Open-Meteo fallback:', err.message);
    }
  }

  // 2. Open-Meteo fallback (Free, keyless, reliable live weather)
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`
    );

    if (!response.ok) {
      throw new Error(`Open-Meteo API returned status ${response.status}`);
    }

    const data = await response.json();
    const current = data.current_weather;
    const conditionInfo = getWeatherConditionFromWmoCode(current.weathercode);
    
    // Estimate humidity & feels like from hourly data if available
    const humidity = data.hourly?.relativehumidity_2m?.[0] || 65;
    const feelsLike = data.hourly?.apparent_temperature?.[0] 
      ? Math.round(data.hourly.apparent_temperature[0]) 
      : Math.round(current.temperature);

    return {
      temp: Math.round(current.temperature),
      feelsLike: feelsLike,
      condition: conditionInfo.description,
      mainCondition: conditionInfo.main,
      humidity: humidity,
      windSpeed: Math.round(current.windspeed),
      locationName: 'Destination Location',
      country: '',
      iconCode: conditionInfo.icon,
      provider: 'Open-Meteo (Live)'
    };
  } catch (error) {
    console.error('[Wanderly Weather] Both weather providers failed:', error.message);
    throw new Error('Weather data unavailable. Please try again.');
  }
}
