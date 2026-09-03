import { useState, useCallback } from 'react';

/**
 * Custom Hook for browser Geolocation API
 * @returns {{ location: {lat: number, lon: number}|null, status: string, errorMessage: string|null, requestLocation: Function, clearLocation: Function }}
 */
export function useGeolocation() {
  const [location, setLocation] = useState(null);
  // Status: 'idle' | 'loading' | 'granted' | 'denied' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setStatus('granted');
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus('denied');
          setErrorMessage('Location access was declined. No problem — search for a destination instead.');
        } else {
          setStatus('error');
          setErrorMessage(error.message || 'Unable to retrieve location.');
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return {
    location,
    status,
    errorMessage,
    requestLocation,
    clearLocation
  };
}
