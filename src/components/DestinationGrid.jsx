import React from 'react';
import DestinationCard from './DestinationCard';
import EmptyState from './EmptyState';
import './DestinationGrid.css';

export default function DestinationGrid({ destinations, onResetFilters }) {
  if (!destinations || destinations.length === 0) {
    return (
      <EmptyState 
        title="No destinations found"
        message="We couldn't find any destinations matching your current search or region filter."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="destination-grid-container">
      <div className="destination-grid">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}
