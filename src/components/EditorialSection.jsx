import React from 'react';
import { ShieldCheck, Compass, Sparkles, HeartHandshake, Globe } from 'lucide-react';
import './EditorialSection.css';

export default function EditorialSection() {
  const pillars = [
    {
      icon: <Compass size={24} className="pillar-icon" />,
      title: "Curated Discovery",
      description: "We bypass tourist cliches to reveal authentic cultural landmarks and quiet neighborhood retreats."
    },
    {
      icon: <Sparkles size={24} className="pillar-icon" />,
      title: "AI Concierge Intelligence",
      description: "Tailored daily schedules crafted in seconds around your pacing, dietary preferences, and travel style."
    },
    {
      icon: <Globe size={24} className="pillar-icon" />,
      title: "Live Atmospheric Insights",
      description: "Real-time weather telemetry and seasonal guides ensuring you arrive during peak golden hour conditions."
    }
  ];

  return (
    <section className="editorial-section">
      <div className="container">
        {/* Main Editorial Banner */}
        <div className="editorial-hero-banner">
          <div className="editorial-text-col">
            <span className="eyebrow">THE WANDERLY PHILOSOPHY</span>
            <h2 className="editorial-heading">
              Travel is not about visiting places. It is about <em>collecting moments</em> that linger.
            </h2>
            <p className="editorial-body">
              Designed for discerning explorers who crave editorial clarity, intuitive AI assistance, 
              and authentic local experiences across the world’s most iconic landscapes.
            </p>
          </div>

          <div className="editorial-stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Production Quality Experience</div>
            <p className="stat-subtext">Integrated with real-time weather, Pexels imagery, and Gemini AI technology.</p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="editorial-pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon-box">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
