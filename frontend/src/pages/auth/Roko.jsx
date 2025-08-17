import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

function Roko() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleClick = () => {
    Navigate('/register');
  };

  useEffect(() => {
    // Simulate an API call to fetch dashboard data
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating a 1 second delay
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ROKO</div>
        <ul>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button className="btn-primary " onClick={handleClick}>
          Get Started
        </button>
      </nav>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title oxygen-regular">
              Welcome to <span>ROKO</span>
            </h1>
            <p className="hero-subtitle oxygen-regular">
              Your one-stop platform for hassle-free assignment help. Connect
              with trusted writers, track your work in real time, and pay
              securely — all in one place.
            </p>
            <button className="btn-secondary">Learn More</button>
          </div>
          <div className="hero-avatar">
            <img src="/hero.png" alt="Hero Avatar" />
          </div>
        </div>
      </header>
      {/* Features Section */}
      <section id="features" className="features">
        <div className="feature-card oxygen-regular">
          <img src="/11.png" alt="Fast" />
          <h3>⚡ Quick Match</h3>
          <p>
            Find the right writer for your assignment in seconds. ROKO instantly
            connects you with verified experts from your own college, ensuring
            smooth communication and better understanding.
          </p>
        </div>
        <div className="feature-card oxygen-regular">
          <img src="/3.png" alt="Beautiful" />
          <h3>📊 Live Tracking</h3>
          <p>
            Stay updated every step of the way. From approval to final
            submission, track your assignment’s progress in real time with our
            easy-to-use dashboard.
          </p>
        </div>
        <div className="feature-card oxygen-regular">
          <img src="/2.png" alt="Secure" />
          <h3>🔒 Secure Payments</h3>
          <p>
            Pay your way — UPI or Cash on Delivery. With secure transactions and
            payment protection, your money is safe until your work is completed.
          </p>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="about">
        <h2 className="oxygen-regular">About Us</h2>
        <p>
          We are passionate about creating websites that look modern, feel
          smooth, and perform amazingly well. Our team loves playing with
          colors, animations, and interactivity to give the best user
          experience.
        </p>
      </section>
      {/* Footer */}
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
    </div>
  );
}

export default Roko;
