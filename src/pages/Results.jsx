import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AlertTriangle, Navigation, Phone, MapPin, Clock, ArrowLeft, Ambulance, Loader2 } from 'lucide-react';
import useGeolocation from '../hooks/useGeolocation';
import { getRecommendation, getGoogleMapsUrl, getPhoneUrl } from '../utils/routing';
import emergencyTypes from '../data/emergencyTypes';
import MapView from '../components/MapView';
import FacilityCard from '../components/FacilityCard';
import StatusBadge from '../components/StatusBadge';

export default function Results() {
  const { emergencyId } = useParams();
  const navigate = useNavigate();
  const { position, loading: geoLoading } = useGeolocation();
  const [results, setResults] = useState(null);
  const [ambulanceRequested, setAmbulanceRequested] = useState(false);

  const emergency = emergencyTypes.find((e) => e.id === emergencyId);

  useEffect(() => {
    if (position && emergency) {
      const res = getRecommendation(emergency.id, position.latitude, position.longitude);
      setResults(res);
    }
  }, [position, emergency]);

  if (!emergency) {
    return (
      <div className="results-page error-state">
        <AlertTriangle size={48} />
        <h2>Emergency type not found</h2>
        <button className="btn-primary" onClick={() => navigate('/emergency')}>
          Select Emergency Type
        </button>
      </div>
    );
  }

  if (geoLoading || !results) {
    return (
      <div className="results-page loading-state">
        <div className="loading-spinner">
          <Loader2 size={48} className="spin" />
        </div>
        <h2>Locating you...</h2>
        <p>Finding the nearest qualified hospitals for <strong>{emergency.label}</strong></p>
        <div className="loading-bar">
          <div className="loading-bar-fill" />
        </div>
      </div>
    );
  }

  const { recommendation, alternatives, totalQualified, outOfRangeFallback } = results;

  if (!recommendation) {
    return (
      <div className="results-page no-results-state">
        <div className="no-results-icon">
          <AlertTriangle size={48} />
        </div>
        <h2>No Qualified Facility Found</h2>
        <p>
          No hospital in our database currently has the required capabilities for a <strong>{emergency.label}</strong> emergency in your area.
        </p>
        <div className="emergency-call-box">
          <Phone size={24} />
          <div>
            <strong>Call Emergency Services Immediately</strong>
            <p>Nigeria Emergency Line</p>
          </div>
          <a href="tel:112" className="btn-call-112">Call 112</a>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/emergency')}>
          <ArrowLeft size={16} /> Try Different Emergency Type
        </button>
      </div>
    );
  }

  const handleAmbulance = () => {
    setAmbulanceRequested(true);
    setTimeout(() => {
      // Simulate
    }, 500);
  };

  return (
    <div className="results-page">
      {/* Emergency header bar */}
      <div className="results-header" style={{ '--emergency-color': emergency.color }}>
        <button className="btn-back" onClick={() => navigate('/emergency')}>
          <ArrowLeft size={18} />
        </button>
        <div className="results-header-info">
          <span className="results-emergency-type">{emergency.label}</span>
          <span className="results-count">{totalQualified} qualified {totalQualified === 1 ? 'facility' : 'facilities'} found</span>
        </div>
      </div>

      {/* Map */}
      <MapView
        userPosition={position}
        facilities={[recommendation, ...alternatives]}
        recommendedId={recommendation.id}
        onFacilityClick={(f) => navigate(`/facility/${f.id}`)}
        height="300px"
      />

      {/* Recommended facility */}
      <div className="recommendation-section">
        {outOfRangeFallback && (
          <div className="out-of-range-warning" style={{ backgroundColor: 'rgba(244,162,97,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid rgba(244,162,97,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F4A261', fontWeight: 'bold', marginBottom: '4px' }}>
              <AlertTriangle size={18} />
              <span>Out of Range Warning</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
              No fully equipped facility found within 50km. Recommending the absolute nearest facility to your location for immediate stabilization.
            </p>
          </div>
        )}

        <div className="recommendation-label">
          <Navigation size={16} />
          <span>{outOfRangeFallback ? 'Nearest Available Hospital' : 'Recommended Hospital'}</span>
        </div>

        <div className="recommendation-card">
          <div className="recommendation-card-top">
            <div>
              <h2>{recommendation.name}</h2>
              <StatusBadge status={recommendation.status} />
            </div>
            {recommendation.type && (
              <span className="facility-type-badge">{recommendation.type}</span>
            )}
          </div>

          <div className="recommendation-metrics">
            <div className="rec-metric">
              <Navigation size={18} />
              <div>
                <span className="rec-metric-value">{recommendation.distance} km</span>
                <span className="rec-metric-label">Distance</span>
              </div>
            </div>
            <div className="rec-metric">
              <Clock size={18} />
              <div>
                <span className="rec-metric-value">~{recommendation.eta} min</span>
                <span className="rec-metric-label">Est. Travel</span>
              </div>
            </div>
          </div>

          <div className="recommendation-address">
            <MapPin size={14} />
            <span>{recommendation.address}</span>
          </div>

          <div className="recommendation-capabilities">
            {recommendation.capabilities.map((cap) => (
              <span
                key={cap}
                className={`capability-pill ${emergency.requiredCapabilities.includes(cap) ? 'matched' : ''}`}
              >
                {cap}
              </span>
            ))}
          </div>

          <div className="recommendation-actions">
            <a
              href={getGoogleMapsUrl(recommendation.lat, recommendation.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navigate-main"
            >
              <Navigation size={20} />
              Navigate Now
            </a>
            <a
              href={getPhoneUrl(recommendation.phone)}
              className="btn-call-main"
            >
              <Phone size={20} />
              Call Hospital
            </a>
          </div>

          <button
            className={`btn-ambulance ${ambulanceRequested ? 'requested' : ''}`}
            onClick={handleAmbulance}
            disabled={ambulanceRequested}
          >
            <Ambulance size={18} />
            {ambulanceRequested ? 'Ambulance Request Sent' : 'Request Ambulance'}
          </button>
        </div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="alternatives-section">
          <h3>Alternative Facilities ({alternatives.length})</h3>
          <div className="alternatives-list">
            {alternatives.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} compact />
            ))}
          </div>
        </div>
      )}

      {/* Emergency fallback */}
      <div className="emergency-footer-bar">
        <Phone size={18} />
        <span>Emergency? Call <a href="tel:112"><strong>112</strong></a></span>
      </div>
    </div>
  );
}
