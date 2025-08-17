import React, { useState, useEffect } from 'react';
import '../../App.css';
import Faq from './Faq';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
const Help = () => {
  const [loading, setLoading] = useState(true);

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
    <>
      <Nav />
      <div className="help-container">
        <h1 className="oxygen-regular">Help & Support</h1>
        <p className="oxygen-regular">
          If you have any questions or need assistance, please reach out to our
          support team.
        </p>
        <div className="box-container oxygen-regular">
          <div className="box">
            <i className="fas fa-phone"></i>
            <h3>Call Us</h3>
            <a href="tel:1234567890">123-456-7890</a>
            <a href="tel:1231238899">123-123-8899</a>
          </div>

          <div className="box">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <a href="mailto:edupjile1@gmail.com">roko1@gmail.com</a>
            <a href="mailto:edupjile2@gmail.com">roko2@gmail.com</a>
          </div>

          <div className="box">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Office Address</h3>
            <a href="#">Salt Lake, Sector-V, Kolkata</a>
          </div>
        </div>

        <div className="form">
          <h2 className="oxygen-regular">Contact Form</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <Faq />
      </div>
      <Footer />
    </>
  );
};

export default Help;
