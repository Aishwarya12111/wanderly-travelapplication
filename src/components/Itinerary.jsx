import React, { useState } from 'react';
import { Calendar, Compass, Clock, MapPin, Sparkles, Loader2, RefreshCw, X, Plane, Utensils, Mountain, Palmtree, Landmark } from 'lucide-react';
import { generateItinerary } from '../services/geminiApi';
import './Itinerary.css';

export default function Itinerary({ destination }) {
  const [daysCount, setDaysCount] = useState(4);
  const [travelStyle, setTravelStyle] = useState('Balanced');
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const styleOptions = [
    'Relaxed',
    'Balanced',
    'Adventure',
    'Culture & History',
    'Food & Local Life'
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setShowConfigModal(false);

    try {
      const result = await generateItinerary(destination, daysCount, travelStyle);
      setItineraryData(result);
    } catch (err) {
      console.error('[Itinerary Generator] Error:', err);
      setError('Unable to parse AI itinerary response. Please try generating again.');
    } finally {
      setLoading(false);
    }
  };

  const getDayIcon = (idx) => {
    switch (idx % 5) {
      case 0:
        return <Plane size={16} className="text-ocean" />;
      case 1:
        return <Mountain size={16} className="text-ocean" />;
      case 2:
        return <Palmtree size={16} className="text-ocean" />;
      case 3:
        return <Utensils size={16} className="text-ocean" />;
      case 4:
      default:
        return <Landmark size={16} className="text-ocean" />;
    }
  };

  return (
    <section className="itinerary-section" id="itinerary-section">
      <div className="itinerary-header-card">
        <div className="itinerary-header-content">
          <div className="eyebrow-badge">
            <Sparkles size={16} className="text-sky-blue" />
            <span>AI DAY-BY-DAY ITINERARY PLANNER</span>
          </div>
          <h2 className="itinerary-heading">
            Tailored travel plans for {destination ? destination.name : 'your trip'}.
          </h2>
          <p className="itinerary-subtext">
            Generate an intelligent, hour-by-hour custom schedule adapted to your preferred travel pacing.
          </p>
        </div>

        <button 
          onClick={() => setShowConfigModal(true)} 
          disabled={loading}
          className="btn btn-accent generate-cta-btn"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Crafting itinerary...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate my itinerary</span>
            </>
          )}
        </button>
      </div>

      {/* Config Modal Popup */}
      {showConfigModal && (
        <div className="modal-backdrop animate-fade-in">
          <div className="modal-content animate-slide-up">
            <div className="modal-header">
              <h3 className="modal-title">Customize Your {destination.name} Itinerary</h3>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Select Duration */}
              <div className="config-group">
                <label className="config-label">Duration (Days):</label>
                <div className="days-selector-pills">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setDaysCount(num)}
                      className={`day-pill ${daysCount === num ? 'active' : ''}`}
                    >
                      {num} {num === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Travel Style */}
              <div className="config-group">
                <label className="config-label">Travel Style:</label>
                <div className="style-selector-grid">
                  {styleOptions.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setTravelStyle(style)}
                      className={`style-card-option ${travelStyle === style ? 'active' : ''}`}
                    >
                      <span>{style}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => setShowConfigModal(false)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleGenerate} 
                className="btn btn-primary"
              >
                <Sparkles size={16} />
                <span>Create Itinerary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="itinerary-loading-state animate-fade-in">
          <Loader2 size={36} className="animate-spin text-ocean mb-3" />
          <h4 className="loading-title">Wanderly AI is curating your schedule...</h4>
          <p className="loading-subtext">Selecting optimal sights, dining spots, and golden hour timings.</p>
        </div>
      )}

      {/* Error View */}
      {error && !loading && (
        <div className="itinerary-error-box animate-fade-in">
          <p>{error}</p>
          <button onClick={handleGenerate} className="btn btn-secondary mt-3">
            <RefreshCw size={15} />
            <span>Retry Generation</span>
          </button>
        </div>
      )}

      {/* Rendered Timeline Itinerary UI */}
      {itineraryData && !loading && (
        <div className="itinerary-results-wrapper animate-slide-up">
          <div className="itinerary-meta-bar">
            <div className="meta-info">
              <h3 className="meta-destination-title">YOUR {destination.name.toUpperCase()} ITINERARY</h3>
              <span className="meta-badge">
                {itineraryData.daysCount} DAYS · {itineraryData.travelStyle.toUpperCase()}
              </span>
            </div>
            <button onClick={() => setShowConfigModal(true)} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="days-timeline-list">
            {itineraryData.days.map((dayItem, idx) => (
              <div key={dayItem.day} className="timeline-day-card">
                <div className="day-header-banner">
                  <div className="day-icon-circle">
                    {getDayIcon(idx)}
                  </div>
                  <span className="day-number">DAY 0{dayItem.day}</span>
                  <h4 className="day-theme-title">{dayItem.title}</h4>
                </div>

                <div className="activities-timeline">
                  {dayItem.activities.map((act, actIdx) => (
                    <div key={actIdx} className="timeline-item">
                      <div className="timeline-left">
                        <div className="time-badge">
                          <Clock size={13} />
                          <span>{act.time}</span>
                        </div>
                        <div className="timeline-line"></div>
                      </div>

                      <div className="timeline-content-card">
                        <h5 className="activity-title">{act.title}</h5>
                        <p className="activity-desc">{act.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
