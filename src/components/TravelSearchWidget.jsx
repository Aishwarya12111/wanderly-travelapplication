import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import './TravelSearchWidget.css';

export default function TravelSearchWidget({ initialQuery = '', onSearchSubmit }) {
  const [destinationQuery, setDestinationQuery] = useState(initialQuery);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [travelers, setTravelers] = useState('2 Travelers');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({ destinationQuery, checkIn, checkOut, travelers });
    } else {
      navigate(`/destinations?search=${encodeURIComponent(destinationQuery)}`);
    }
  };

  return (
    <div className="travel-search-widget-container">
      <form onSubmit={handleFormSubmit} className="travel-search-widget-card">
        {/* Field 1: Destination */}
        <div className="widget-field">
          <div className="widget-field-label">
            <MapPin size={16} className="text-ocean" />
            <span>Destination</span>
          </div>
          <input
            type="text"
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
            placeholder="Where do you want to go?"
            className="widget-input"
          />
        </div>

        <div className="widget-divider"></div>

        {/* Field 2: Check-in Date */}
        <div className="widget-field">
          <div className="widget-field-label">
            <Calendar size={16} className="text-ocean" />
            <span>Check-in</span>
          </div>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="widget-input date-input"
          />
        </div>

        <div className="widget-divider"></div>

        {/* Field 3: Check-out Date */}
        <div className="widget-field">
          <div className="widget-field-label">
            <Calendar size={16} className="text-ocean" />
            <span>Check-out</span>
          </div>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="widget-input date-input"
          />
        </div>

        <div className="widget-divider"></div>

        {/* Field 4: Guests / Travelers */}
        <div className="widget-field">
          <div className="widget-field-label">
            <Users size={16} className="text-ocean" />
            <span>Travelers</span>
          </div>
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="widget-input select-input"
          >
            <option value="1 Traveler">1 Traveler</option>
            <option value="2 Travelers">2 Travelers</option>
            <option value="3 Travelers">3 Travelers</option>
            <option value="4+ Travelers">4+ Travelers</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* Search Action Button */}
        <div className="widget-action">
          <button type="submit" className="btn btn-primary widget-search-btn">
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
