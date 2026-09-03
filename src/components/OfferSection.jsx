import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Star, Clock, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import './OfferSection.css';

export default function OfferSection() {
  const offerDestinations = DESTINATIONS.filter((d) => d.discount);

  return (
    <section className="offers-section section-spacing">
      <div className="container">
        <div className="section-title-wrapper text-center">
          <span className="eyebrow">LIMITED TIME SPECIALS</span>
          <h2 className="section-title">Exclusive Travel Packages</h2>
          <p className="lead-text">Save on curated luxury itineraries crafted for memorable journeys.</p>
        </div>

        <div className="offers-grid">
          {offerDestinations.map((item) => (
            <div key={item.id} className="offer-card">
              <div className="offer-media">
                <img src={item.coverImage} alt={item.name} className="offer-img" loading="lazy" />
                <span className="discount-badge">
                  <Tag size={13} />
                  <span>{item.discount}</span>
                </span>
              </div>

              <div className="offer-body">
                <div className="offer-header">
                  <span className="offer-duration"><Clock size={14} /> {item.idealDuration}</span>
                  <div className="offer-rating">
                    <Star size={14} fill="#F59E0B" className="star-icon" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <h3 className="offer-package-title">{item.offerPackage || `${item.name} Special Experience`}</h3>
                <p className="offer-location-name">{item.name}, {item.country}</p>

                <div className="offer-footer">
                  <div className="offer-pricing">
                    <span className="price-label">Starting from</span>
                    <span className="price-amount">{item.price}</span>
                  </div>

                  <Link to={`/destination/${item.id}`} className="btn btn-secondary offer-btn">
                    <span>View Details</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
