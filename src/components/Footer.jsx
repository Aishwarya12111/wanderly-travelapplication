import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="redesigned-footer">
      <div className="container">
        {/* Newsletter Subscription Banner */}
        <div className="footer-newsletter-box">
          <div className="newsletter-text-content">
            <h3 className="newsletter-heading">Ready for your next adventure?</h3>
            <p className="newsletter-subtext">
              Subscribe to Wanderly Journal for secret destination alerts and AI trip planning tips.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="footer-newsletter-form">
            {subscribed ? (
              <div className="newsletter-success">
                <CheckCircle2 size={18} className="text-success" />
                <span>You are subscribed to Wanderly Travel Journal!</span>
              </div>
            ) : (
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="footer-email-input"
                  required
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Multi-Column Links Layout */}
        <div className="footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <div className="logo-badge">
                <Compass size={20} />
              </div>
              <span className="brand-name">WANDERLY</span>
            </Link>

            <p className="brand-description">
              Discover beautiful destinations, plan your perfect journey, and make every trip extraordinary.
            </p>

            <span className="assessment-tag">
              Front-End Assessment — Design Esthetics / TAP Academy
            </span>
          </div>

          {/* Column 1: TRAVEL */}
          <div className="footer-col">
            <h4 className="footer-title">TRAVEL</h4>
            <ul className="footer-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Explore</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/about">Trips / Bookings</Link></li>
            </ul>
          </div>

          {/* Column 2: SUPPORT */}
          <div className="footer-col">
            <h4 className="footer-title">SUPPORT</h4>
            <ul className="footer-menu">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Concierge</a></li>
              <li><a href="#faqs">Travel FAQs</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          {/* Column 3: LEGAL */}
          <div className="footer-col">
            <h4 className="footer-title">LEGAL</h4>
            <ul className="footer-menu">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#cookies">Cookie Settings</a></li>
            </ul>
          </div>

          {/* Column 4: SOCIAL */}
          <div className="footer-col">
            <h4 className="footer-title">SOCIAL</h4>
            <ul className="footer-menu">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} WANDERLY Travel Inc. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
