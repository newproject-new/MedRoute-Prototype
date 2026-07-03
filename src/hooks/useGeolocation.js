import { useState, useEffect } from 'react';

/**
 * MedRoute — Geolocation Hook
 * Wraps the browser Geolocation API.
 * Falls back to Akure center (7.2526, 5.1931) if permission is denied.
 */

const AKURE_CENTER = { latitude: 7.2526, longitude: 5.1931 };

export default function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setPosition(AKURE_CENTER);
      setLoading(false);
      return;
    }

    const onSuccess = (pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setLoading(false);
    };

    const onError = (err) => {
      console.warn('Geolocation error:', err.message);
      setError(err.message);
      setPosition(AKURE_CENTER);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });
  }, []);

  return { position, error, loading };
}
