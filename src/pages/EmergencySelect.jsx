import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Phone } from 'lucide-react';
import EmergencyCard from '../components/EmergencyCard';
import emergencyTypes from '../data/emergencyTypes';

export default function EmergencySelect() {
  const navigate = useNavigate();

  const handleSelect = (emergency) => {
    navigate(`/results/${emergency.id}`);
  };

  return (
    <div className="emergency-select-page">
      <div className="emergency-header">
        <div className="emergency-header-icon">
          <AlertTriangle size={32} />
        </div>
        <h1>Select Emergency Type</h1>
        <p>Choose the type of emergency to find the nearest qualified hospital.</p>
      </div>

      <div className="emergency-list">
        {emergencyTypes.map((emergency) => (
          <EmergencyCard
            key={emergency.id}
            emergency={emergency}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div className="emergency-fallback">
        <div className="fallback-card">
          <Phone size={20} />
          <div>
            <strong>Can't find your emergency type?</strong>
            <p>Call Nigeria Emergency Services directly</p>
          </div>
          <a href="tel:112" className="btn-call-emergency">
            Call 112
          </a>
        </div>
      </div>
    </div>
  );
}
