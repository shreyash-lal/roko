import React, { useState, useEffect } from 'react';
import '../../App.css';
import WriterNav from '../../components/WriterNav';
import Footer from '../../components/Footer';
import Loader from '../../components/Loader';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    college: '',
    collegeId: '',
    profilePic: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);
  if (loading) {
    return <Loader />;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedUser = { ...user, profilePic: imageUrl };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage('❌ New passwords do not match');
      return;
    }

    try {
      const res = await fetch(
        'https://roko-backend.onrender.com/api/users/change-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowPasswordForm(false);
      } else {
        setMessage(`'❌'${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <>
      <WriterNav />
      <div className="profile-container oxygen-regular">
        <div className="profile-card">
          <div className="profile-image-container">
            <label htmlFor="image-upload">
              <img
                src={user.profilePic || '/download.jpeg'}
                alt="Profile"
                className="profile-image"
              />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
              />
            </label>
          </div>

          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>College:</strong> {user.college}
            </p>
            <p>
              <strong>College ID:</strong> {user.collegeId}
            </p>
          </div>

          <div className="profile-buttons">
            <button
              className="btn password"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              Change Password
            </button>
            <button className="btn delete">Delete Account</button>
          </div>

          {showPasswordForm && (
            <div className="modal-overlay">
              <div className="password-form modal-content">
                <button
                  className="close-button"
                  onClick={() => setShowPasswordForm(false)}
                >
                  &times;
                </button>
                <h2>Change Password</h2>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button className="btn" onClick={handleChangePassword}>
                  Update Password
                </button>
                {message && <p className="status-message">{message}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
