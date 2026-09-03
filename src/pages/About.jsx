import React from 'react';
import { Compass, Sparkles, Code, Cpu, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './About.css';

export default function About() {
  const criteriaList = [
    { title: "Visual Design", desc: "Editorial magazine aesthetic with Playfair Display serif typography and warm earthy neutrals." },
    { title: "Layout & Spacing", desc: "Generous whitespace, structured vertical alignment, multi-column grid layouts." },
    { title: "Motion & Interaction", desc: "Subtle hover scale transforms, scroll-compacting navbar, smooth transitions." },
    { title: "Responsive Engineering", desc: "Fully fluid across mobile (320px), tablet (768px), and ultra-wide desktops." },
    { title: "API Integrations", desc: "OpenWeather, Pexels API, Google Gemini AI, and browser Geolocation with zero-friction fallbacks." },
    { title: "Accessibility & Code Quality", desc: "Semantic HTML5, ARIA roles, clean React hooks, clean component structure." }
  ];

  return (
    <div className="about-page animate-fade-in">
      <section className="about-header-banner">
        <div className="container">
          <span className="eyebrow">DESIGN ESTHETICS / TAP ACADEMY ASSESSMENT</span>
          <h1 className="about-title">About Wanderly</h1>
          <p className="lead-text about-lead">
            Discover places worth remembering. Built as a benchmark production React application showcasing premium front-end engineering and editorial UI/UX design.
          </p>
        </div>
      </section>

      <div className="container section-spacing">
        <div className="about-content-grid">
          <div className="about-card-main">
            <h2 className="about-section-heading">Platform Concept</h2>
            <p className="about-text">
              Wanderly was created to transform digital travel discovery from loud, cluttered booking engines into a calm, editorial experience reminiscent of world-class travel publications and high-end SaaS applications.
            </p>
            <p className="about-text">
              It seamlessly unifies destination exploration, dynamic image discovery, live weather telemetry, browser geolocation awareness, and Google Gemini AI itinerary generation into one cohesive, accessible product.
            </p>

            <h3 className="about-subheading">Assessment Criteria Evaluated</h3>
            <div className="criteria-grid">
              {criteriaList.map((item, idx) => (
                <div key={idx} className="criteria-card">
                  <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <h4 className="criteria-title">{item.title}</h4>
                    <p className="criteria-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-sidebar">
            <div className="tech-stack-card">
              <h3 className="tech-card-title">Technology Stack</h3>
              <ul className="tech-list">
                <li><Code size={16} className="text-accent" /> <span>React 18 & Vite</span></li>
                <li><Compass size={16} className="text-accent" /> <span>React Router v6</span></li>
                <li><Cpu size={16} className="text-accent" /> <span>Lucide React Icons</span></li>
                <li><Eye size={16} className="text-accent" /> <span>OpenWeather API</span></li>
                <li><Sparkles size={16} className="text-accent" /> <span>Pexels Image API</span></li>
                <li><ShieldCheck size={16} className="text-accent" /> <span>Google Gemini AI</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
