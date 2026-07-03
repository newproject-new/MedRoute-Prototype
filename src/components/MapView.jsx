import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `<div class="user-marker-dot"><div class="user-marker-pulse"></div></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const facilityIcon = (status) =>
  L.divIcon({
    className: 'facility-marker',
    html: `<div class="facility-marker-pin ${status}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/><path d="M10 12v.01"/><path d="M14 8v.01"/><path d="M10 8v.01"/></svg></div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });

const recommendedIcon = L.divIcon({
  className: 'facility-marker',
  html: `<div class="facility-marker-pin recommended"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/><path d="M10 12v.01"/><path d="M14 8v.01"/><path d="M10 8v.01"/></svg></div>`,
  iconSize: [40, 48],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48],
});

export default function MapView({
  userPosition,
  facilities = [],
  recommendedId = null,
  onFacilityClick,
  height = '400px',
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const center = userPosition
      ? [userPosition.latitude, userPosition.longitude]
      : [7.2526, 5.1931];

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView(center, 12);

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // User marker
    if (userPosition) {
      L.marker([userPosition.latitude, userPosition.longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup('<strong>Your Location</strong>');
    }

    // Facility markers
    const bounds = userPosition
      ? L.latLngBounds([[userPosition.latitude, userPosition.longitude]])
      : L.latLngBounds();

    facilities.forEach((f) => {
      const isRecommended = f.id === recommendedId;
      const icon = isRecommended ? recommendedIcon : facilityIcon(f.status);
      const marker = L.marker([f.lat, f.lng], { icon, zIndexOffset: isRecommended ? 1000 : 0 })
        .addTo(map)
        .bindPopup(
          `<div class="map-popup">
            <strong>${f.name}</strong>
            <div>${f.distance !== undefined ? `${f.distance} km · ~${f.eta} min` : ''}</div>
            <div class="popup-status ${f.status}">${f.status}</div>
          </div>`
        );

      if (onFacilityClick) {
        marker.on('click', () => onFacilityClick(f));
      }

      bounds.extend([f.lat, f.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [userPosition, facilities, recommendedId]);

  return <div ref={mapRef} className="map-container" style={{ height }} />;
}
