import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import DestinationGrid from '../components/DestinationGrid';
import FeaturedDestinations from '../components/FeaturedDestinations';
import WhyChooseUs from '../components/WhyChooseUs';
import OfferSection from '../components/OfferSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AIChatbot from '../components/AIChatbot';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import { DESTINATIONS, REGIONS } from '../data/destinations';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const navigate = useNavigate();

  const handleExploreScroll = () => {
    const el = document.getElementById('popular-destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/destinations');
    }
  };

  const handlePlanTripClick = () => {
    navigate('/destinations');
  };

  const handleSearchSubmit = (widgetData) => {
    if (widgetData.destinationQuery) {
      setSearchQuery(widgetData.destinationQuery);
      handleExploreScroll();
    } else {
      handleExploreScroll();
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSearchQuery(categoryName);
    handleExploreScroll();
  };

  // Region counts
  const regionCounts = useMemo(() => {
    const counts = { All: DESTINATIONS.length };
    DESTINATIONS.forEach((d) => {
      counts[d.region] = (counts[d.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.region.toLowerCase().includes(q) ||
        dest.category.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q);

      return matchesRegion && matchesSearch;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="home-redesign-page animate-fade-in">
      {/* 1. Hero & Overlapping Travel Search Box */}
      <Hero 
        onExploreClick={handleExploreScroll}
        onPlanClick={handlePlanTripClick}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* 2. Travel Categories Grid */}
      <CategoryGrid onSelectCategory={handleCategorySelect} />

      {/* 3. Popular Destinations Grid */}
      <section id="popular-destinations" className="popular-destinations-section section-spacing">
        <div className="container">
          <div className="section-title-wrapper text-center">
            <span className="eyebrow">MOST LOVED HAVENS</span>
            <h2 className="section-title">Popular Destinations</h2>
            <p className="lead-text">Discover places travelers love across Europe, Asia, Americas, and Oceania.</p>
          </div>

          <div className="destinations-controls-bar">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by city, country or category (e.g. Paris, Beaches)..."
            />
            <FilterTabs
              regions={REGIONS}
              activeRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
              counts={regionCounts}
            />
          </div>

          <DestinationGrid 
            destinations={filteredDestinations}
            onResetFilters={() => {
              setSearchQuery('');
              setSelectedRegion('All');
            }}
          />
        </div>
      </section>

      {/* 4. Featured Destination Spotlight Showcase (Asymmetric) */}
      <FeaturedDestinations />

      {/* 5. Special Offers & Packages */}
      <OfferSection />

      {/* 6. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 7. AI Travel Concierge Teaser */}
      <section className="section-spacing ai-teaser-container">
        <div className="container">
          <AIChatbot destination={null} onTriggerItinerary={handlePlanTripClick} />
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <TestimonialsSection />

      {/* 9. Call-To-Action Banner */}
      <section className="section-spacing cta-redesign-section">
        <div className="container">
          <div className="cta-gradient-card">
            <span className="eyebrow eyebrow-light">START YOUR JOURNEY</span>
            <h2 className="cta-heading">Ready for your next adventure?</h2>
            <p className="cta-subtext">
              Start planning your unforgettable journey today with live weather insights and instant AI itinerary curation.
            </p>
            <button onClick={handlePlanTripClick} className="btn btn-accent cta-action-btn">
              <span>Start Exploring</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
