import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import Loader from '../../components/Loader';

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    college: '',
    collegeId: '',
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
        'https://roko-backend.onrender.com/api/auth/register',
        formData
      );
      alert('OTP sent to your email');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/verify-otp', { state: { userData: formData } });
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <nav className="regNav-container hover:text-blue-400 transition duration-300">
        <div>
          <h1 className="regNav-logo oxygen-regular">
            <a href="/">ROKO</a>
          </h1>
        </div>

        <div className="regNav-links oxygen-regular">
          <a href="/about" className="regNav-link oxygen-regular">
            About
          </a>
          <a href="/services" className="regNav-link oxygen-regular">
            Services
          </a>
          <a href="/contact" className="regNav-link oxygen-regular">
            Contact
          </a>
          <a href="/login" className="regNav-link oxygen-regular">
            Login
          </a>
        </div>
      </nav>

      <div className="regForm-container">
        <form onSubmit={handleSubmit} className="regForm-box">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="regForm-input oxygen-regular"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="regForm-input oxygen-regular"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="regForm-input oxygen-regular"
          />

          <div className="regSelect-container oxygen-regular">
            <select
              name="role"
              onChange={handleChange}
              className="regSelect-box oxygen-regular"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="writer">Writer</option>
              <option value="admin">Admin</option>
            </select>
            <select
              name="college"
              onChange={handleChange}
              className="regSelect-box oxygen-regular"
            >
              <option value="">Select College</option>
              <option value="TMSL">TMSL</option>
              <option value="IEM">IEM</option>
              <option value="JIS">JIS</option>
              <option value="HIT, KOLKATA">HIT, Kolkata</option>
              <option value="HALDIA INSTITUTE OF TECHNOLOGY">
                Haldia Institute of Technology
              </option>
              <option value="BIT, KOLKATA">
                Bengal College of Engineering and Technology
              </option>
              <option value="TIU">Techno India University</option>
            </select>
          </div>

          <input
            type="text"
            name="collegeId"
            placeholder="College ID"
            onChange={handleChange}
            className="regForm-input oxygen-regular"
          />

          <button type="submit" className="regForm-submitBtn">
            Register
          </button>
        </form>

        {/*         <div className="regSocial-container oxygen-regular">
          <p>Or register with:</p>
          <button className="regSocial-btn">
            <i className="fab fa-google"></i>
          </button>
          <button className="regSocial-btn">
            <i className="fa-brands fa-github"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
