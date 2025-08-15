import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBicycle,
  FaInfoCircle,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import "./Header.css";

function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isDarkMode ? "dark" : "light"}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <FaBicycle className="logo-icon" />
            <span className="logo-text">CycleSport</span>
          </Link>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <FaHome className="nav-icon" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/cycles" onClick={() => setIsMobileMenuOpen(false)}>
                <FaBicycle className="nav-icon" />
                Cycles
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <FaInfoCircle className="nav-icon" />
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
