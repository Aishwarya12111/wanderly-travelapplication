import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Search, Bell, User, Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* LEFT: Logo */}
        <Link to="/" className="navbar-logo" aria-label="Wanderly Home">
          <div className="logo-badge">
            <Compass size={22} className="logo-compass-icon" />
          </div>
          <span className="logo-brand-name">WANDERLY</span>
        </Link>

        {/* CENTER: Navigation Links */}
        <nav className="navbar-center-menu" aria-label="Main Navigation">
          <Link to="/" className={`nav-item-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/destinations" className={`nav-item-link ${location.pathname === '/destinations' ? 'active' : ''}`}>
            Explore
          </Link>
          <Link to="/destinations" className="nav-item-link">
            Destinations
          </Link>
          <Link to="/about" className={`nav-item-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
        </nav>

        {/* RIGHT: Actions (Search, Notifications, Login Profile) */}
        <div className="navbar-right-actions">
          <button 
            onClick={() => navigate('/destinations')} 
            className="action-icon-btn" 
            aria-label="Search destinations"
          >
            <Search size={19} />
          </button>

          <div className="notification-wrapper">
            <button className="action-icon-btn" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot"></span>
            </button>
          </div>

          <button 
            onClick={() => navigate('/destinations')} 
            className="btn btn-primary btn-nav-login"
          >
            <User size={16} />
            <span>Profile / Plan</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu animate-fade-in">
          <nav className="mobile-links-wrapper">
            <Link to="/" className="mobile-link">Home</Link>
            <Link to="/destinations" className="mobile-link">Explore Destinations</Link>
            <Link to="/about" className="mobile-link">About Wanderly</Link>
            <button 
              onClick={() => { navigate('/destinations'); setMobileMenuOpen(false); }} 
              className="btn btn-primary mobile-cta-btn"
            >
              <span>Plan Your Trip</span>
              <ArrowUpRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
