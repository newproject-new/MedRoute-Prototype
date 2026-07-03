import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, Clock, Shield, Zap, Building2, Navigation } from 'lucide-react';
import emergencyTypes from '../data/emergencyTypes';
import * as LucideIcons from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleEmergency = () => {
    navigate('/emergency');
  };

  const handleQuickSelect = (emergency) => {
    navigate(`/results/${emergency.id}`);
  };

  return (
    <div className="home-page fade-in-up">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-tag">
          <Zap size={14} />
          <span>Intelligent Healthcare Routing</span>
        </div>
        <h1>
          Every Second <span className="hero-highlight">Counts</span>
        </h1>
        <p>
          MedRoute connects you to the nearest hospital that can actually treat your emergency — not just the nearest hospital.
        </p>
        <button className="btn-emergency-main" onClick={handleEmergency}>
          <AlertTriangle size={24} />
          <span>Emergency — Find Hospital Now</span>
        </button>
        <div className="hero-disclaimer">
          <MapPin size={14} />
          <span>Uses your GPS location to find capable facilities nearby</span>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon"><AlertTriangle size={28} /></div>
            <h3>Select Emergency</h3>
            <p>Choose from 9 emergency categories — from road accidents to heart attacks.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon"><MapPin size={28} /></div>
            <h3>Capture Location</h3>
            <p>Your GPS position is captured automatically to find hospitals near you.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon"><Navigation size={28} /></div>
            <h3>Navigate</h3>
            <p>Get directed to the nearest qualified facility with one-tap navigation.</p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="quick-access-section">
        <h2>Quick Access</h2>
        <p>Select an emergency type to find the right hospital instantly.</p>
        <div className="quick-grid">
          {emergencyTypes.map((emergency) => {
            const Icon = LucideIcons[emergency.icon] || AlertTriangle;
            return (
              <button
                key={emergency.id}
                className="quick-card"
                onClick={() => handleQuickSelect(emergency)}
              >
                <Icon size={32} />
                <span>{emergency.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-box">
          <div className="stat-value">39</div>
          <div className="stat-label">Partner Facilities</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">15</div>
          <div className="stat-label">Capability Tags</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">&lt;10s</div>
          <div className="stat-label">Routing Time</div>
        </div>
      </section>
    </div>
  );
}
