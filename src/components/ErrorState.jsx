import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import './ErrorState.css';

export default function ErrorState({ 
  title = "Something went wrong", 
  message = "We couldn't fetch the latest data. Please check your connection and try again.",
  onRetry 
}) {
  return (
    <div className="error-state-card animate-fade-in" role="alert">
      <div className="error-state-header">
        <AlertTriangle size={24} className="error-state-icon" />
        <div>
          <h4 className="error-state-title">{title}</h4>
          <p className="error-state-message">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary error-retry-btn">
          <RefreshCw size={15} />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
