import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        BlogApp
      </Link>
      <div className={styles.links}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/" onClick={closeMenu}>Blog</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div
        id="mobile-menu"
        className={
          isMobileMenuOpen ? `${styles.mobileMenu} ${styles.open}` : styles.mobileMenu
        }
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/" onClick={closeMenu}>Blog</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
      </div>
      {isMobileMenuOpen && <div className={styles.overlay} onClick={closeMenu} tabIndex={-1} aria-hidden="true" />}
    </nav>
  );
};

export default NavBar;
