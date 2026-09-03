import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Globe, Coins, Sparkles } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { fetchDestinationImage } from '../services/imageApi';
import { useWeather } from '../hooks/useWeather';
import { useGeolocation } from '../hooks/useGeolocation';
import WeatherCard from '../components/WeatherCard';
import LocationSelector from '../components/LocationSelector';
import PlaceCard from '../components/PlaceCard';
import AIChatbot from '../components/AIChatbot';
import Itinerary from '../components/Itinerary';
import './DestinationDetails.css';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find destination by ID
  const destination = DESTINATIONS.find((d) => d.id === id);

  // Active coordinates for Weather (defaults to destination's coords)
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [heroImage, setHeroImage] = useState('');

  // Geolocation Hook
  const { location: userGeoLocation, status: geoStatus, errorMessage: geoError, requestLocation: onRequestGeo } = useGeolocation();

  useEffect(() => {
    if (destination) {
      setSelectedCoords({ lat: destination.latitude, lon: destination.longitude });
      setLocationLabel(`${destination.name}, ${destination.country}`);
      setHeroImage(destination.coverImage);

      // Load high-res cover image from Pexels API
      async function loadCover() {
        if (destination.heroKeyword) {
          const url = await fetchDestinationImage(destination.heroKeyword, destination.coverImage);
          setHeroImage(url);
        }
      }
      loadCover();
    }
  }, [destination]);

  // When browser geolocation is granted, update weather coordinates
  useEffect(() => {
    if (userGeoLocation) {
      setSelectedCoords(userGeoLocation);
      setLocationLabel('Your Current Location');
    }
  }, [userGeoLocation]);

  // Custom Weather Hook
  const { weather, loading: weatherLoading, error: weatherError, refetch: refetchWeather } = useWeather(
    selectedCoords?.lat,
    selectedCoords?.lon
  );

  if (!destination) {
    return (
      <div className="container section-spacing text-center">
        <h2>Destination Not Found</h2>
        <p className="mb-4">The requested destination could not be located in our directory.</p>
        <Link to="/destinations" className="btn btn-primary">
          Back to Destinations
        </Link>
      </div>
    );
  }

  const handleManualLocationSelect = (locObj) => {
    setSelectedCoords({ lat: locObj.latitude, lon: locObj.longitude });
    setLocationLabel(locObj.name);
  };

  const handleScrollToItinerary = () => {
    const el = document.getElementById('itinerary-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="destination-details-page animate-fade-in">
      {/* 1. Destination Hero Banner */}
      <section className="details-hero">
        <div className="details-hero-bg">
          <img src={heroImage} alt={`${destination.name} backdrop`} className="details-hero-img" />
          <div className="details-hero-overlay"></div>
        </div>

        <div className="container details-hero-content">
          <Link to="/destinations" className="btn btn-glass btn-back">
            <ArrowLeft size={16} />
            <span>Back to Explorer</span>
          </Link>

          <div className="hero-title-group">
            <div className="details-region-tag">
              <MapPin size={14} />
              <span>{destination.country} — {destination.region}</span>
            </div>
            <h1 className="details-main-title">{destination.name.toUpperCase()}</h1>
            <p className="details-tagline">{destination.tagline}</p>
          </div>
        </div>
      </section>

      <div className="container section-spacing">
        {/* 2. Editorial Information & Weather Grid */}
        <div className="details-main-layout">
          <div className="details-content-column">
            {/* About Section */}
            <div className="details-about-card">
              <span className="eyebrow">ABOUT THE DESTINATION</span>
              <h2 className="details-section-heading">Overview</h2>
              <p className="details-about-text">{destination.description}</p>

              {/* Information Grid */}
              <div className="info-grid">
                <div className="info-item">
                  <Calendar size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Best Time to Visit</span>
                    <span className="info-value">{destination.bestTime}</span>
                  </div>
                </div>

                <div className="info-item">
                  <Clock size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Ideal Duration</span>
                    <span className="info-value">{destination.idealDuration}</span>
                  </div>
                </div>

                <div className="info-item">
                  <Globe size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Language</span>
                    <span className="info-value">{destination.language}</span>
                  </div>
                </div>

                <div className="info-item">
                  <Coins size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Currency</span>
                    <span className="info-value">{destination.currency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Famous Places Gallery */}
            <div className="details-places-section">
              <div className="section-title-row">
                <div>
                  <span className="eyebrow">MUST-SEE HIGHLIGHTS</span>
                  <h2 className="details-section-heading">Famous Places in {destination.name}</h2>
                </div>
              </div>

              <div className="places-grid">
                {destination.famousPlaces.map((place) => (
                  <PlaceCard 
                    key={place.id} 
                    place={place} 
                    destinationName={destination.name} 
                  />
                ))}
              </div>
            </div>

            {/* AI Assistant Component */}
            <AIChatbot 
              destination={destination} 
              onTriggerItinerary={handleScrollToItinerary} 
            />

            {/* Itinerary Generator Component */}
            <Itinerary destination={destination} />
          </div>

          {/* Sidebar / Weather Column */}
          <aside className="details-sidebar-column">
            <div className="sticky-sidebar-content">
              {/* Location Selector (Browser Geo + Manual City Lookup) */}
              <LocationSelector
                geoStatus={geoStatus}
                geoError={geoError}
                onRequestGeo={onRequestGeo}
                onSelectLocation={handleManualLocationSelect}
              />

              {/* Weather Card */}
              <WeatherCard
                weather={weather}
                loading={weatherLoading}
                error={weatherError}
                onRetry={refetchWeather}
                locationName={locationLabel}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
