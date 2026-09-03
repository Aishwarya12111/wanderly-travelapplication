import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUpRight, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import './FeaturedDestinations.css';

export default function FeaturedDestinations() {
  const featuredList = DESTINATIONS.filter((d) => d.featured);
  const mainFeatured = featuredList[0] || DESTINATIONS[0];
  const subFeatured1 = featuredList[1] || DESTINATIONS[1];
  const subFeatured2 = featuredList[2] || DESTINATIONS[2];

  return (
    <section className="featured-section section-spacing">
      <div className="container">
        <div className="section-title-wrapper text-center">
          <span className="eyebrow">HANDPICKED SELECTION</span>
          <h2 className="section-title">Featured World Havens</h2>
          <p className="lead-text">Immerse yourself in extraordinary bucket-list destinations.</p>
        </div>

        <div className="featured-asymmetric-grid">
          {/* Main Large Featured Card (Left) */}
          <Link to={`/destination/${mainFeatured.id}`} className="featured-card main-card">
            <img src={mainFeatured.coverImage} alt={mainFeatured.name} className="featured-img" loading="lazy" />
            <div className="featured-overlay"></div>
            
            <div className="featured-badge-top">
              <span className="featured-tag">FEATURED SPOTLIGHT</span>
              <span className="featured-price">{mainFeatured.price} / person</span>
            </div>

            <div className="featured-card-body">
              <div className="featured-rating-row">
                <Star size={16} className="star-icon" fill="#F59E0B" />
                <span className="rating-value">{mainFeatured.rating}</span>
                <span className="reviews-count">({mainFeatured.reviewsCount} reviews)</span>
              </div>
              <h3 className="featured-title">{mainFeatured.name}</h3>
              <p className="featured-location"><MapPin size={15} /> {mainFeatured.country} — {mainFeatured.region}</p>
              <p className="featured-desc">{mainFeatured.tagline}</p>
              <div className="featured-explore-link">
                <span>Explore Destination</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>

          {/* Sub Featured Column (Right) */}
          <div className="featured-sub-column">
            {/* Sub Card 1 */}
            <Link to={`/destination/${subFeatured1.id}`} className="featured-card sub-card">
              <img src={subFeatured1.coverImage} alt={subFeatured1.name} className="featured-img" loading="lazy" />
              <div className="featured-overlay"></div>

              <div className="featured-card-body">
                <div className="featured-rating-row">
                  <Star size={14} className="star-icon" fill="#F59E0B" />
                  <span className="rating-value">{subFeatured1.rating}</span>
                </div>
                <h4 className="sub-title">{subFeatured1.name}</h4>
                <p className="featured-location"><MapPin size={13} /> {subFeatured1.country}</p>
                <div className="sub-arrow">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>

            {/* Sub Card 2 */}
            <Link to={`/destination/${subFeatured2.id}`} className="featured-card sub-card">
              <img src={subFeatured2.coverImage} alt={subFeatured2.name} className="featured-img" loading="lazy" />
              <div className="featured-overlay"></div>

              <div className="featured-card-body">
                <div className="featured-rating-row">
                  <Star size={14} className="star-icon" fill="#F59E0B" />
                  <span className="rating-value">{subFeatured2.rating}</span>
                </div>
                <h4 className="sub-title">{subFeatured2.name}</h4>
                <p className="featured-location"><MapPin size={13} /> {subFeatured2.country}</p>
                <div className="sub-arrow">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
