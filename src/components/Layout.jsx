import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, AlertTriangle, Building2, Info, Shield } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const isEmergencyFlow = location.pathname.startsWith('/emergency') || location.pathname.startsWith('/results');

  return (
    <div className="app-layout">
      <header className="app-header">
        <NavLink to="/" className="header-brand">
          <div className="brand-icon">
            <Shield size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">MedRoute</span>
            <span className="brand-tagline">Intelligent Emergency Routing</span>
          </div>
        </NavLink>
        <nav className="header-nav desktop-only">
          <NavLink to="/" className="nav-link" end>Home</NavLink>
          <NavLink to="/emergency" className="nav-link">Emergency</NavLink>
          <NavLink to="/facilities" className="nav-link">Facilities</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
        </nav>
      </header>

      <main className={`app-main ${isEmergencyFlow ? 'emergency-flow' : ''}`}>
        <Outlet />
      </main>

      <nav className="bottom-nav mobile-only">
        <NavLink to="/" className="bottom-nav-item" end>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/emergency" className="bottom-nav-item emergency-nav-item">
          <AlertTriangle size={20} />
          <span>Emergency</span>
        </NavLink>
        <NavLink to="/facilities" className="bottom-nav-item">
          <Building2 size={20} />
          <span>Facilities</span>
        </NavLink>
        <NavLink to="/about" className="bottom-nav-item">
          <Info size={20} />
          <span>About</span>
        </NavLink>
      </nav>
    </div>
  );
}
