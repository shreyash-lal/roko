import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Register from '../pages/auth/Register';

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
    navigate('/login');
  };
  return (
    <nav className="nav hover:text-blue-400 transition duration-300">
      <div>
        <h1 className="oxygen-regular">ROKO</h1>
      </div>
      <div>
        <form action="" className="search-form">
          <input
            type="text"
            className="search-bar oxygen-regular"
            placeholder="Search..."
          />
          <a href="" className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
        </form>
      </div>
      <div className="nav-links oxygen-regular">
        <Link to="/writer-dashboard" className="nav-link-a">
          <i className="fa-solid fa-house"></i>Dashboard
        </Link>
        <Link to="/writer-notifications" className="nav-link-a">
          <i className="fa-solid fa-bell"></i>Notification
        </Link>
        <Link to="/writer-help" className="nav-link-a">
          <i className="fa-solid fa-phone"></i>Help
        </Link>
        <Link to="/writer-profile" className="nav-link-a">
          <i className="fa-solid fa-circle-user"></i>Profile
        </Link>
        <button className="oxygen-regular logout" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
