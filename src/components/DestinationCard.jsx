import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Star, Clock } from 'lucide-react';
import { fetchDestinationImage } from '../services/imageApi';
import './DestinationCard.css';

export default function DestinationCard({ destination }) {
  const { id, name, country, region, description, idealDuration, heroKeyword, coverImage, rating, price } = destination;
  const [imageUrl, setImageUrl] = useState(coverImage);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadImage() {
      if (heroKeyword) {
        const fetchedUrl = await fetchDestinationImage(heroKeyword, coverImage);
        if (isMounted) {
          setImageUrl(fetchedUrl);
          setImageLoading(false);
        }
      } else {
        if (isMounted) setImageLoading(false);
      }
    }
    loadImage();
    return () => { isMounted = false; };
  }, [heroKeyword, coverImage]);

  return (
    <article className="popular-destination-card">
      <Link to={`/destination/${id}`} className="destination-card-link" aria-label={`Explore ${name}, ${country}`}>
        {/* Card Media Header */}
        <div className={`destination-card-media ${imageLoading ? 'skeleton' : ''}`}>
          <img
            src={imageUrl}
            alt={`${name}, ${country}`}
            className="destination-card-img"
            loading="lazy"
            onError={() => setImageUrl(coverImage)}
            onLoad={() => setImageLoading(false)}
          />
          <span className="destination-region-badge">{region}</span>
          {price && <span className="destination-price-badge">{price}</span>}
        </div>

        {/* Card Content Body */}
        <div className="destination-card-body">
          <div className="destination-meta-row">
            <div className="destination-location">
              <MapPin size={14} className="location-pin" />
              <span>{country}</span>
            </div>

            {rating && (
              <div className="destination-rating-tag">
                <Star size={13} fill="#F59E0B" className="star-icon" />
                <span>{rating}</span>
              </div>
            )}
          </div>

          <h3 className="destination-title">{name}</h3>
          
          <p className="destination-description">
            {description}
          </p>

          <div className="destination-card-footer">
            <span className="explore-label">Explore Details</span>
            <span className="arrow-icon-circle">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
