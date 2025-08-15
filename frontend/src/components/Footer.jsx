import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaBicycle,
  FaHeart,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <FaBicycle className="footer-logo-icon" />
            <h3>CycleSport</h3>
          </div>
          <p className="footer-description">
            Your trusted partner for premium cycles. Bringing cycling dreams to
            your doorstep with quality, service, and passion.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h4>Contact Information</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <p>Gafoor Cycle Shop</p>
                <p>Penamaluru, Vijayawada</p>
                <p>Andhra Pradesh, India</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <p>+91 9876543210</p>
                <p>+91 8765432109</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <p>gafoor@cycles.com</p>
                <p>info@cyclesport.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/cycles">Our Cycles</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#warranty">Warranty</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>

        {/* Business Hours Section */}
        <div className="footer-section">
          <h4>Business Hours</h4>
          <div className="business-hours">
            <div className="hours-item">
              <span>Monday - Friday</span>
              <span>9:00 AM - 8:00 PM</span>
            </div>
            <div className="hours-item">
              <span>Saturday</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="hours-item">
              <span>Sunday</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="copyright">
            <p>
              © {currentYear} CycleSport. All rights reserved. | Designed with{" "}
              <FaHeart className="heart-icon" /> by Gafoor Cycle Shop
            </p>
          </div>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
