import { useState, useMemo } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import facilities from '../data/facilities';
import { CAPABILITY_TAGS } from '../data/facilities';
import useGeolocation from '../hooks/useGeolocation';
import { rankByDistance } from '../utils/routing';
import FacilityCard from '../components/FacilityCard';
import MapView from '../components/MapView';

export default function Facilities() {
  const { position } = useGeolocation();
  const [search, setSearch] = useState('');
  const [selectedCapability, setSelectedCapability] = useState('');
  const [showMap, setShowMap] = useState(true);

  const filtered = useMemo(() => {
    let list = [...facilities];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.address.toLowerCase().includes(q) ||
          f.type.toLowerCase().includes(q)
      );
    }

    if (selectedCapability) {
      list = list.filter((f) => f.capabilities.includes(selectedCapability));
    }

    if (position) {
      list = rankByDistance(list, position.latitude, position.longitude);
    }

    return list;
  }, [search, selectedCapability, position]);

  return (
    <div className="facilities-page">
      <div className="facilities-header">
        <h1>Healthcare Facilities</h1>
        <p>Browse all {facilities.length} partner facilities across Akure & Ondo State</p>
      </div>

      <div className="facilities-filters">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-row">
          <div className="select-wrapper">
            <Filter size={14} />
            <select
              value={selectedCapability}
              onChange={(e) => setSelectedCapability(e.target.value)}
              className="filter-select"
            >
              <option value="">All Capabilities</option>
              {CAPABILITY_TAGS.map((cap) => (
                <option key={cap} value={cap}>{cap}</option>
              ))}
            </select>
          </div>

          <button
            className={`btn-toggle-map ${showMap ? 'active' : ''}`}
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin size={16} />
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>

      {showMap && (
        <MapView
          userPosition={position}
          facilities={filtered}
          height="300px"
        />
      )}

      <div className="facilities-results">
        <p className="results-count">{filtered.length} facilities found</p>
        <div className="facilities-list">
          {filtered.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
          {filtered.length === 0 && (
            <div className="no-results">
              <p>No facilities match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
