import React, { useState, useEffect } from 'react';
import { Compass, ArrowUpRight } from 'lucide-react';
import { fetchDestinationImage } from '../services/imageApi';
import './PlaceCard.css';

export default function PlaceCard({ place, destinationName }) {
  const { name, description, category, searchKeyword, imageUrl: fallbackUrl } = place;
  const [imgSrc, setImgSrc] = useState(fallbackUrl);
  const [loadingImg, setLoadingImg] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPlaceImage() {
      const keyword = searchKeyword || `${destinationName} ${name}`;
      const url = await fetchDestinationImage(keyword, fallbackUrl);
      if (isMounted) {
        setImgSrc(url);
        setLoadingImg(false);
      }
    }
    loadPlaceImage();
    return () => { isMounted = false; };
  }, [searchKeyword, destinationName, name, fallbackUrl]);

  return (
    <article className="place-card">
      <div className={`place-card-media ${loadingImg ? 'skeleton' : ''}`}>
        <img 
          src={imgSrc} 
          alt={`${name} in ${destinationName}`} 
          className="place-card-img"
          loading="lazy"
          onError={() => setImgSrc(fallbackUrl)}
          onLoad={() => setLoadingImg(false)}
        />
        {category && <span className="place-category-badge">{category}</span>}
      </div>

      <div className="place-card-body">
        <div className="place-header-row">
          <h4 className="place-title">{name}</h4>
          <span className="place-arrow-indicator">
            <ArrowUpRight size={15} />
          </span>
        </div>
        <p className="place-description">{description}</p>
      </div>
    </article>
  );
}
