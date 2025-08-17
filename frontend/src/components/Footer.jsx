import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container oxygen-regular">
      <div className="footer-content">
        <h3>ROKO</h3>
        <p>
          Your trusted platform for academic assistance and assignment
          solutions.
        </p>
      </div>

      <div className="footer-links-container">
        <div className="footer-links">
          <h3>Links</h3>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-support">
          <h3>Support</h3>

          <ul>
            <li>
              <Link to="/support">Support Center</Link>
            </li>
            <li>
              <Link to="/help#faq">FAQs</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="/facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="/twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="/instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ROKO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
