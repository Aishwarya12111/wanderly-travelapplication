import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({ 
  title = "No destinations found", 
  message = "Try searching for another destination, region, or reset your filters.",
  onReset 
}) {
  return (
    <div className="empty-state-container animate-fade-in">
      <div className="empty-state-icon-wrapper">
        <SearchX size={36} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onReset && (
        <button onClick={onReset} className="btn btn-secondary empty-state-reset-btn">
          <RotateCcw size={16} />
          <span>Reset Search & Filters</span>
        </button>
      )}
    </div>
  );
}
