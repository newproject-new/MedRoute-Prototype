import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Navigation, Clock, Star, Building2 } from 'lucide-react';
import facilities from '../data/facilities';
import useGeolocation from '../hooks/useGeolocation';
import { haversine, estimateTravelTime, getGoogleMapsUrl, getPhoneUrl } from '../utils/routing';
import MapView from '../components/MapView';
import StatusBadge from '../components/StatusBadge';

export default function FacilityDetail() {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const { position } = useGeolocation();

  const facility = facilities.find((f) => f.id === facilityId);

  if (!facility) {
    return (
      <div className="facility-detail-page error-state">
        <h2>Facility not found</h2>
        <button className="btn-primary" onClick={() => navigate('/facilities')}>
          View All Facilities
        </button>
      </div>
    );
  }

  let distance = null;
  let eta = null;
  if (position) {
    const rawDistance = haversine(position.latitude, position.longitude, facility.lat, facility.lng);
    distance = rawDistance > 0 ? Math.max(0.1, Math.round(rawDistance * 10) / 10) : 0;
    eta = estimateTravelTime(rawDistance);
  }

  return (
    <div className="facility-detail-page">
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <h1>Facility Details</h1>
      </div>

      <MapView
        userPosition={position}
        facilities={[{ ...facility, distance, eta }]}
        height="250px"
      />

      <div className="detail-content">
        <div className="detail-title-row">
          <div>
            <h2>{facility.name}</h2>
            <StatusBadge status={facility.status} />
          </div>
          <div className="detail-rating">
            <Star size={16} fill="currentColor" />
            <span>{facility.rating}</span>
          </div>
        </div>

        <div className="detail-type">
          <Building2 size={14} />
          <span>{facility.type}</span>
        </div>

        <div className="detail-address">
          <MapPin size={14} />
          <span>{facility.address}</span>
        </div>

        <div className="detail-phone">
          <Phone size={14} />
          <a href={getPhoneUrl(facility.phone)}>{facility.phone}</a>
        </div>

        {distance !== null && (
          <div className="detail-metrics">
            <div className="detail-metric">
              <Navigation size={16} />
              <span className="detail-metric-value">{distance} km</span>
              <span className="detail-metric-label">away</span>
            </div>
            <div className="detail-metric">
              <Clock size={16} />
              <span className="detail-metric-value">~{eta} min</span>
              <span className="detail-metric-label">travel</span>
            </div>
          </div>
        )}

        <div className="detail-section">
          <h3>Capabilities</h3>
          <div className="detail-capabilities">
            {facility.capabilities.map((cap) => (
              <span key={cap} className="capability-pill">{cap}</span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Operating Hours</h3>
          <p>{facility.emergencyHours ? '24-Hour Emergency Services Available' : 'Standard Operating Hours'}</p>
        </div>

        <div className="detail-actions">
          <a
            href={getGoogleMapsUrl(facility.lat, facility.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navigate-main"
          >
            <Navigation size={20} />
            Navigate Now
          </a>
          <a href={getPhoneUrl(facility.phone)} className="btn-call-main">
            <Phone size={20} />
            Call Hospital
          </a>
        </div>
      </div>
    </div>
  );
}
