'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from './navbar';

export default function Header({ 
  logoText = "MiSitio", 
  logoHref = "/",
  showNav = true,
  className = "" 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`header ${className}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href={logoHref} className="header-logo">
          {logoText}
        </Link>

        {/* Navigation */}
        {showNav && (
          <>
            <Nav className="desktop-nav" />
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="mobile-nav-overlay">
                <Nav 
                  className="mobile-nav" 
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}