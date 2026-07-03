export default function StatusBadge({ status }) {
  const config = {
    available: { label: 'Available', className: 'status-available' },
    busy: { label: 'Busy', className: 'status-busy' },
    full: { label: 'Full', className: 'status-full' },
  };

  const { label, className } = config[status] || config.available;

  return (
    <span className={`status-badge ${className}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}
