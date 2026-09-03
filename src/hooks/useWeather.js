import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherByCoords } from '../services/weatherApi';

/**
 * Custom Hook for fetching live weather data by lat & lon
 * @param {number|null} latitude
 * @param {number|null} longitude
 * @returns {{ weather: object|null, loading: boolean, error: string|null, refetch: Function }}
 */
export function useWeather(latitude, longitude) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async () => {
    if (!latitude || !longitude) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCoords(latitude, longitude);
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return {
    weather,
    loading,
    error,
    refetch: loadWeather
  };
}
