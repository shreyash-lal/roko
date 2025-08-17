import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Loader from '../../components/Loader';

const MyAssignment = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
      <div className="assignments-container oxygen-regular">
        <h1>My Assignments</h1>
        {/* Tabs */}
        <div className="tab-btn">
          <button
            onClick={() => handleTabClick('pending')}
            className={`p-btn ${
              activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => handleTabClick('completed')}
            className={`c-btn ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Completed Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'pending' && (
            <div className="pending-content oxygen-regular">
              {/* <div className="abox">
                <div className="pbox">
                  <h2>Assignment 1</h2>
                  <button className="details">View Details</button>
                  <h2 className="bill">₹ 100</h2>
                </div>
                <div className="pbox">
                  <h2>Assignment 2</h2>
                  <button className="details">View Details</button>
                  <h2 className="bill">₹ 100</h2>
                </div>
                <div className="pbox">
                  <h2>Assignment 3</h2>
                  <button className="details">View Details</button>
                  <h2 className="bill">₹ 100</h2>
                </div>
              </div> */}
              <div className="pbox">
                <h2>No Pending Assignments</h2>
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="complete-content oxygen-regular">
              <div className="abox">
                <div className="cbox">
                  <h2>Artificial Intelligence</h2>
                  <div className="c-btns">
                    <button className="details">View Details</button>
                    <button className="pay">Pay</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAssignment;
