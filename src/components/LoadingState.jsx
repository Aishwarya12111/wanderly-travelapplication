import React from 'react';
import './LoadingState.css';

export function DestinationSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-media skeleton"></div>
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-short skeleton"></div>
        <div className="skeleton-title skeleton"></div>
        <div className="skeleton-line skeleton"></div>
        <div className="skeleton-line skeleton"></div>
      </div>
    </div>
  );
}

export function WeatherSkeleton() {
  return (
    <div className="skeleton-weather-card skeleton">
      <div className="skeleton-circle skeleton"></div>
      <div className="skeleton-weather-body">
        <div className="skeleton-line skeleton-short skeleton"></div>
        <div className="skeleton-line skeleton"></div>
      </div>
    </div>
  );
}

export default function LoadingGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <DestinationSkeleton key={index} />
      ))}
    </div>
  );
}
