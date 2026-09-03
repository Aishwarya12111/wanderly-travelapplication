import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import TravelSearchWidget from './TravelSearchWidget';
import './Hero.css';

export default function Hero({ onExploreClick, onPlanClick, onSearchSubmit }) {
  const VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-beach-shores-and-rocks-41544-large.mp4";

  return (
    <section className="hero-section">
      {/* Background Media with Gradient Overlay */}
      <div className="hero-media-container">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-background-video"
          poster="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        {/* Dark / Transparent Gradient Overlay for Crisp Text Readability */}
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="container hero-content-container">
        <div className="hero-text-block animate-slide-up">
          <div className="hero-eyebrow-pill">
            <Compass size={15} className="text-sky-blue" />
            <span>DISCOVER • PLAN • EXPLORE</span>
          </div>

          <h1 className="hero-heading">
            Explore the World. <br />
            <span className="text-gradient">Create Unforgettable Memories.</span>
          </h1>

          <p className="hero-subtext">
            Discover beautiful destinations, plan your perfect journey, and make every trip extraordinary with live weather and AI concierge guidance.
          </p>

          <div className="hero-buttons-row">
            <button onClick={onExploreClick} className="btn btn-primary hero-btn-main">
              <span>Explore Destinations</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={onPlanClick} className="btn btn-glass hero-btn-secondary">
              <Sparkles size={18} className="text-sky-blue" />
              <span>Plan Your Trip</span>
            </button>
          </div>
        </div>

        {/* Overlapping Travel Search Booking Widget */}
        <div className="hero-widget-wrapper animate-slide-up">
          <TravelSearchWidget onSearchSubmit={onSearchSubmit} />
        </div>
      </div>
    </section>
  );
}
