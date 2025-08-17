import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader';

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
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

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        'https://roko-backend.onrender.com/api/auth/verify-otp',
        {
          ...userData,
          otp,
        }
      );

      // ✅ Store the verified user info (you can use res.data.user if returned from backend)
      localStorage.setItem('user', JSON.stringify(userData));

      alert('Registered Successfully');

      // ✅ Redirect based on role
      if (userData.role === 'writer') {
        navigate('/writer-dashboard');
      } else if (userData.role === 'user') {
        navigate('/dashboard');
      } else {
        navigate('/unauthorized');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'OTP Verification failed');
    }
  };

  return (
    <div className="otp-verify">
      <h2 className="oxygen-regular">OTP Verification</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerify} className="oxygen-regular">
        Verify OTP
      </button>
    </div>
  );
};

export default OtpVerify;
