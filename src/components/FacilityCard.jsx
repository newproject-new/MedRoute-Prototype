import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { MapPin, Clock, Navigation, Phone } from 'lucide-react';
import { getGoogleMapsUrl, getPhoneUrl } from '../utils/routing';

export default function FacilityCard({ facility, compact = false, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(facility);
    } else {
      navigate(`/facility/${facility.id}`);
    }
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    window.open(getGoogleMapsUrl(facility.lat, facility.lng), '_blank');
  };

  const handleCall = (e) => {
    e.stopPropagation();
    window.open(getPhoneUrl(facility.phone), '_self');
  };

  return (
    <div className={`facility-card ${compact ? 'compact' : ''}`} onClick={handleClick}>
      <div className="facility-card-header">
        <div className="facility-card-title">
          <h3>{facility.name}</h3>
          <StatusBadge status={facility.status} />
        </div>
        {facility.type && <span className="facility-type-badge">{facility.type}</span>}
      </div>

      <div className="facility-card-info">
        <div className="info-row">
          <MapPin size={14} />
          <span>{facility.address}</span>
        </div>
        {facility.distance !== undefined && (
          <div className="info-row-metrics">
            <div className="metric">
              <Navigation size={14} />
              <span className="metric-value">{facility.distance} km</span>
            </div>
            <div className="metric">
              <Clock size={14} />
              <span className="metric-value">~{facility.eta} min</span>
            </div>
          </div>
        )}
      </div>

      {!compact && (
        <div className="facility-card-capabilities">
          {facility.capabilities.slice(0, 5).map((cap) => (
            <span key={cap} className="capability-pill">{cap}</span>
          ))}
          {facility.capabilities.length > 5 && (
            <span className="capability-pill more">+{facility.capabilities.length - 5} more</span>
          )}
        </div>
      )}

      <div className="facility-card-actions">
        <button className="btn-navigate" onClick={handleNavigate}>
          <Navigation size={16} />
          Navigate
        </button>
        <button className="btn-call" onClick={handleCall}>
          <Phone size={16} />
          Call
        </button>
      </div>
    </div>
  );
}
