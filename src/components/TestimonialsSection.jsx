import React from 'react';
import { Star, Quote } from 'lucide-react';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sophia Martinez",
      role: "Luxury Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      destination: "Paris & Tokyo",
      review: "Wanderly redesigned the way my husband and I travel. The AI itinerary generator built a flawless 5-day Tokyo schedule that balanced shrine visits with top ramen spots!"
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Adventure Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      destination: "Bali & Cape Town",
      review: "The live weather telemetry and local place highlights were 100% accurate. Being able to check conditions before heading to Table Mountain made all the difference."
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Culture Explorer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      destination: "Rome & London",
      review: "Clean, elegant, and completely intuitive. Wanderly feels like having a private luxury travel concierge right in your pocket. Truly a benchmark product!"
    }
  ];

  return (
    <section className="testimonials-section section-spacing">
      <div className="container">
        <div className="section-title-wrapper text-center">
          <span className="eyebrow">TRAVELER STORIES</span>
          <h2 className="section-title">Loved by Travelers Worldwide</h2>
          <p className="lead-text">Read authentic feedback from explorers who craft memories with Wanderly.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <Quote className="quote-icon" size={32} />
              
              <div className="testimonial-rating">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" className="star-icon" />
                ))}
              </div>

              <p className="testimonial-text">"{item.review}"</p>

              <div className="testimonial-author-row">
                <img src={item.avatar} alt={item.name} className="author-avatar" />
                <div>
                  <h4 className="author-name">{item.name}</h4>
                  <p className="author-meta">{item.role} • <span className="text-ocean">{item.destination}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
