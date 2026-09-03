import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import DestinationGrid from '../components/DestinationGrid';
import { DESTINATIONS, REGIONS } from '../data/destinations';
import './Destinations.css';

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Calculate counts per region
  const regionCounts = useMemo(() => {
    const counts = { All: DESTINATIONS.length };
    DESTINATIONS.forEach((d) => {
      counts[d.region] = (counts[d.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter destinations dynamically
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.region.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q);

      return matchesRegion && matchesSearch;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="destinations-page animate-fade-in">
      <div className="destinations-header-banner">
        <div className="container">
          <span className="eyebrow">WORLDWIDE DIRECTORY</span>
          <h1 className="destinations-page-title">Where will you go next?</h1>
          <p className="lead-text destinations-lead">
            From iconic cities to quiet escapes, find your next destination across 10 curated global havens.
          </p>

          <div className="destinations-search-wrapper">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by destination name, country or region..."
            />
          </div>
        </div>
      </div>

      <div className="container section-spacing">
        {/* Filter Pill Tabs */}
        <div className="destinations-filter-wrapper">
          <FilterTabs
            regions={REGIONS}
            activeRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            counts={regionCounts}
          />
        </div>

        {/* Results Counter Bar */}
        <div className="results-status-bar">
          <span className="results-count-text">
            Showing <strong>{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'}
            {selectedRegion !== 'All' && ` in ${selectedRegion}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedRegion !== 'All' || searchQuery) && (
            <button 
              onClick={() => { setSearchQuery(''); setSelectedRegion('All'); }}
              className="btn btn-ghost reset-link-btn"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Grid of Destination Cards */}
        <DestinationGrid 
          destinations={filteredDestinations}
          onResetFilters={() => {
            setSearchQuery('');
            setSelectedRegion('All');
          }}
        />
      </div>
    </div>
  );
}
