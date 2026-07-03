import { useState, useEffect } from 'react';

/**
 * MedRoute — Geolocation Hook
 * Wraps the browser Geolocation API.
 * Falls back to Lagos center (6.5244, 3.3792) if permission is denied.
 */

const LAGOS_CENTER = { latitude: 6.5244, longitude: 3.3792 };

export default function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setPosition(LAGOS_CENTER);
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
      setPosition(LAGOS_CENTER);
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
