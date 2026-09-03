import React from 'react';
import './FilterTabs.css';

export default function FilterTabs({ regions, activeRegion, onSelectRegion, counts = {} }) {
  return (
    <nav className="filter-tabs-nav" aria-label="Region filter tabs">
      <div className="filter-tabs-scroll">
        {regions.map((region) => {
          const isActive = activeRegion === region;
          const count = counts[region] ?? null;

          return (
            <button
              key={region}
              onClick={() => onSelectRegion(region)}
              className={`filter-tab-pill ${isActive ? 'active' : ''}`}
              aria-selected={isActive}
              role="tab"
            >
              <span>{region}</span>
              {count !== null && (
                <span className={`filter-tab-count ${isActive ? 'active' : ''}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
