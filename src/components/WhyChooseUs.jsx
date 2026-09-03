import React from 'react';
import { Globe, Plane, CircleDollarSign, ShieldCheck } from 'lucide-react';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <Globe size={26} className="benefit-icon" />,
      title: "Explore Everywhere",
      desc: "Discover amazing destinations around the globe with curated travel recommendations."
    },
    {
      icon: <Plane size={26} className="benefit-icon" />,
      title: "Easy Trip Planning",
      desc: "Plan your complete journey in minutes using AI concierge and real-time weather."
    },
    {
      icon: <CircleDollarSign size={26} className="benefit-icon" />,
      title: "Best Travel Options",
      desc: "Find suitable options for your budget with full transparency and zero hidden fees."
    },
    {
      icon: <ShieldCheck size={26} className="benefit-icon" />,
      title: "Safe & Reliable",
      desc: "Travel with confidence backed by 24/7 verified guide telemetry and expert support."
    }
  ];

  return (
    <section className="why-choose-us-section section-spacing">
      <div className="container">
        <div className="section-title-wrapper text-center">
          <span className="eyebrow">THE WANDERLY ADVANTAGE</span>
          <h2 className="section-title">Why Travelers Choose Us</h2>
          <p className="lead-text">Crafted for discerning explorers who expect seamless travel intelligence.</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((item, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon-box">{item.icon}</div>
              <h3 className="benefit-title">{item.title}</h3>
              <p className="benefit-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
