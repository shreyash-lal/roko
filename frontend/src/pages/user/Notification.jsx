import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';
import '../../App.css';

// Notification component

const Notification = () => {
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
      <div>
        <h1 className="oxygen-regular">Notifications</h1>
        <p className="oxygen-regular">You have no new notifications.</p>
      </div>
      <Footer />
    </>
  );
};

export default Notification;
