import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import Loader from '../../components/Loader';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate an API call to fetch dashboard data
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating a 1 second delay
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      if (!res.data.token || !res.data.user) {
        toast.error('Invalid login response');
        return;
      }

      const userData = res.data.user;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(userData));

      toast.success('Login successful');

      setTimeout(() => {
        if (userData.role === 'writer') {
          navigate('/writer-dashboard');
        } else if (userData.role === 'user') {
          navigate('/dashboard');
        } else {
          navigate('/unauthorized');
        }
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="loginpage-container-unik">
      <nav className="loginpage-navbar-unik">
        <div className="loginpage-logo-unik">
          <h1 className="loginpage-brand-unik oxygen-regular">
            <a href="/" className="oxygen-regular">
              ROKO
            </a>
          </h1>
        </div>
        <div className="loginpage-links-unik oxygen-regular">
          <a href="/about" className="loginpage-link-unik oxygen-regular">
            About
          </a>
          <a href="/services" className="loginpage-link-unik oxygen-regular">
            Services
          </a>
          <a href="/contact" className="loginpage-link-unik oxygen-regular">
            Contact
          </a>
          <a href="/register" className="loginpage-link-unik oxygen-regular">
            Register
          </a>
        </div>
      </nav>

      <div className="loginpage-form-wrapper-unik">
        <form className="loginpage-form-unik" onSubmit={handleSubmit}>
          <input
            className="loginpage-input-unik oxygen-regular"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="loginpage-input-unik oxygen-regular"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="loginpage-btn-unik oxygen-regular" type="submit">
            Login
          </button>
        </form>

        {/* <div className="loginpage-alt-login-unik">
          <p className="loginpage-alt-text-unik oxygen-regular">
            Or register with:
          </p>
          <button className="loginpage-google-btn-unik">
            <i className="fab fa-google"></i>
          </button>
          <button className="loginpage-github-btn-unik">
            <i className="fa-brands fa-github"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
