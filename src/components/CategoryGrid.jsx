import React from 'react';
import { CATEGORIES } from '../data/destinations';
import './CategoryGrid.css';

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="category-section section-spacing">
      <div className="container">
        <div className="section-title-wrapper text-center">
          <span className="eyebrow">EXPLORE BY INTEREST</span>
          <h2 className="section-title">Popular Travel Categories</h2>
          <p className="lead-text">Find your perfect escape tailored to your favorite travel style.</p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              role="button"
              tabIndex={0}
            >
              <img src={cat.image} alt={cat.name} className="category-card-img" loading="lazy" />
              <div className="category-overlay"></div>
              <div className="category-content">
                <span className="category-count">{cat.count}</span>
                <h3 className="category-name">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
