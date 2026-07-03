import { Shield, Target, Heart, Users, Globe, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-icon">
          <Shield size={48} />
        </div>
        <h1>About MedRoute</h1>
        <p className="about-lead">
          MedRoute is an intelligent emergency healthcare routing module — a critical subsystem
          within a larger national digital health platform for Nigeria.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <div className="mission-cards">
          <div className="mission-card">
            <Target size={24} />
            <h3>Right Hospital, First Time</h3>
            <p>
              During emergencies, patients often travel to the closest hospital, only to discover it lacks
              the required capabilities. MedRoute eliminates this guesswork by matching emergency type
              to facility capability before travel begins.
            </p>
          </div>
          <div className="mission-card">
            <Heart size={24} />
            <h3>Save Lives</h3>
            <p>
              By routing patients directly to a capable facility, we eliminate secondary referrals
              and the dangerous delays they cause. When minutes matter, the first destination must
              be the right destination.
            </p>
          </div>
          <div className="mission-card">
            <Users size={24} />
            <h3>Optimize Resources</h3>
            <p>
              By matching emergency demand to facilities actually equipped to respond, MedRoute
              improves healthcare resource utilization across the system.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>The Broader Platform</h2>
        <p>
          MedRoute is Phase 1 of a comprehensive digital health platform designed to serve as
          Nigeria's national health coordination layer. The full platform includes:
        </p>
        <div className="platform-modules">
          <div className="module-item active">
            <span className="module-badge">Phase 1</span>
            <h4>Emergency Healthcare Routing</h4>
            <p>Intelligent facility matching and navigation — you are here.</p>
          </div>
          <div className="module-item">
            <span className="module-badge future">Coming</span>
            <h4>Live Hospital Capacity Registry</h4>
            <p>Real-time bed, equipment, and specialist availability tracking.</p>
          </div>
          <div className="module-item">
            <span className="module-badge future">Coming</span>
            <h4>Multi-Channel Signal Ingestion</h4>
            <p>Intake from mobile apps, USSD, SMS, kiosks, and wearables.</p>
          </div>
          <div className="module-item">
            <span className="module-badge future">Coming</span>
            <h4>Enrichment & Analysis Engine</h4>
            <p>Outbreak detection, chronic-disease clusters, and NCDC dashboards.</p>
          </div>
          <div className="module-item">
            <span className="module-badge future">Coming</span>
            <h4>Diagnostic Aggregation</h4>
            <p>Anonymised disease-pattern analytics for government policy.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Technology</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <Globe size={20} />
            <div>
              <strong>Haversine + Road Network</strong>
              <p>Two-phase distance calculation for accurate routing.</p>
            </div>
          </div>
          <div className="tech-item">
            <Shield size={20} />
            <div>
              <strong>15 Capability Tags</strong>
              <p>Standard classification system for facility filtering.</p>
            </div>
          </div>
          <div className="tech-item">
            <Target size={20} />
            <div>
              <strong>9 Emergency Categories</strong>
              <p>Comprehensive coverage from trauma to paediatric emergencies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to see it in action?</h2>
        <button className="btn-primary" onClick={() => navigate('/emergency')}>
          Try MedRoute Now <ChevronRight size={18} />
        </button>
      </section>
    </div>
  );
}
