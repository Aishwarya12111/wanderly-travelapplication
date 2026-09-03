import React, { useState } from 'react';
import { Navigation, Search, MapPin, Loader2, X, AlertCircle } from 'lucide-react';
import { searchLocations } from '../services/locationApi';
import './LocationSelector.css';

export default function LocationSelector({ 
  geoStatus, 
  geoError, 
  onRequestGeo, 
  onSelectLocation 
}) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length >= 2) {
      setSearching(true);
      setShowDropdown(true);
      const results = await searchLocations(val);
      setSearchResults(results);
      setSearching(false);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (item) => {
    onSelectLocation({
      name: `${item.name}, ${item.country}`,
      latitude: item.latitude,
      longitude: item.longitude
    });
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="location-selector-card">
      <div className="location-selector-header">
        <h4 className="location-selector-title">Check Weather Anywhere</h4>
        <p className="location-selector-subtitle">
          Use browser location or search any city worldwide.
        </p>
      </div>

      <div className="location-controls-row">
        {/* Geolocation Button */}
        <button 
          onClick={onRequestGeo}
          disabled={geoStatus === 'loading'}
          className="btn btn-secondary geo-trigger-btn"
          aria-label="Use my location"
        >
          {geoStatus === 'loading' ? (
            <Loader2 size={16} className="animate-spin text-accent" />
          ) : (
            <Navigation size={16} className="text-accent" />
          )}
          <span>{geoStatus === 'loading' ? 'Locating...' : 'Use my location'}</span>
        </button>

        {/* Manual Search Field */}
        <div className="location-search-field-container">
          <div className="location-search-input-box">
            <Search size={16} className="search-field-icon" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              onFocus={() => query.length >= 2 && setShowDropdown(true)}
              placeholder="Search city (e.g. Bengaluru, London)..."
              className="location-search-input"
            />
            {searching && <Loader2 size={16} className="animate-spin search-loader" />}
            {query && !searching && (
              <button 
                onClick={() => { setQuery(''); setShowDropdown(false); }} 
                className="search-clear-inline"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showDropdown && (
            <div className="location-dropdown animate-fade-in">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="location-dropdown-item"
                  >
                    <MapPin size={15} className="item-pin-icon" />
                    <div className="item-text-wrapper">
                      <span className="item-city-name">{item.name}</span>
                      <span className="item-country-name">{item.country}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="location-dropdown-empty">
                  {searching ? 'Searching cities...' : 'No cities found. Try another search.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Geolocation Permission Error / Warning Banner */}
      {geoStatus === 'denied' && (
        <div className="geo-warning-banner animate-fade-in">
          <AlertCircle size={16} className="warning-icon" />
          <span>Location access was declined. No problem — search for a destination instead.</span>
        </div>
      )}
    </div>
  );
}
