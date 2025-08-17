import React, { useState, useEffect } from 'react';
import '../../App.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { use } from 'react';

const Dashboard = () => {
  const UserName = JSON.parse(localStorage.getItem('user'))?.name || 'User';
  const navigate = useNavigate();
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
      <div className="dashboard-container">
        <h1 className="oxygen-regular">Hi {UserName}🖐....</h1>
        <p className="oxygen-regular">Welcome to your dashboard !</p>

        <div className="dashboard-cards">
          <div className="dashboard-card upload">
            <div className="dashboard-content">
              <h2 className="oxygen-regular">Upload Assignments</h2>
              <p className="oxygen-regular">
                Here you can manage your assignments, view your activity, and
                more.
              </p>
              <a
                href="#"
                className="oxygen-regular"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/upload-assignment');
                }}
              >
                <i className="fas fa-upload"></i>Upload
              </a>
            </div>
          </div>

          <div className="dashboard-card assignments">
            <div className="dashboard-content">
              <h2 className="oxygen-regular">My Assignments</h2>
              <p className="oxygen-regular">
                Here you can view your assignments, check deadlines, and more.
              </p>
              <a
                href="#"
                className="oxygen-regular"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/my-assignments');
                }}
              >
                <i className="fas fa-file-alt"></i>My Assignments
              </a>
            </div>
          </div>

          <div className="dashboard-card earnings">
            <div className="dashboard-content">
              <h2 className="oxygen-regular">Earnings</h2>
              <p className="oxygen-regular">
                Here you can manage your account settings, update your profile,
                and more.
              </p>
              <a href="/earnings" className="oxygen-regular">
                <i className="fa-solid fa-indian-rupee-sign"></i>Earnings
              </a>
            </div>
          </div>

          <div className="dashboard-card history">
            <div className="dashboard-content">
              <h2 className="oxygen-regular">History</h2>
              <p className="oxygen-regular">
                Here you can view your earnings, track your progress, and more.
              </p>
              <a href="/history" className="oxygen-regular">
                <i className="fas fa-history"></i>History
              </a>
            </div>
          </div>
        </div>

        <section className="recent-activity">
          <h2 className="oxygen-regular">Recent Activity</h2>
          <ul className="activity-list">
            <li className="activity-item oxygen-regular">
              <i className="fas fa-upload"></i>Uploaded Assignment 1
            </li>
            <li className="activity-item oxygen-regular">
              <i className="fas fa-check"></i>Submitted Assignment 2
            </li>
            <li className="activity-item oxygen-regular">
              <i className="fas fa-eye"></i>Viewed Feedback for Assignment 1
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
