import * as LucideIcons from 'lucide-react';

export default function EmergencyCard({ emergency, onClick }) {
  const IconComponent = LucideIcons[emergency.icon] || LucideIcons.AlertTriangle;

  return (
    <button
      className="emergency-card"
      onClick={() => onClick(emergency)}
      style={{ '--emergency-color': emergency.color }}
    >
      <div className="emergency-card-icon" style={{ background: `${emergency.color}20`, color: emergency.color }}>
        <IconComponent size={32} />
      </div>
      <div className="emergency-card-content">
        <h3>{emergency.label}</h3>
        <p>{emergency.description}</p>
      </div>
      <div className="emergency-card-arrow">
        <LucideIcons.ChevronRight size={20} />
      </div>
    </button>
  );
}
