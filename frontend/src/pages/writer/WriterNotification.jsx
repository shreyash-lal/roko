// frontend/src/pages/Writer/WriterNotification.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import WriterNav from '../../components/WriterNav';
import '../../App.css';
import Loader from '../../components/Loader';

const WriterNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const fetchNotifications = () => {
      axios
        .get('api/notifications/writer', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // <-- send token
          },
        })
        .then((res) => {
          const notifs = Array.isArray(res.data)
            ? res.data
            : res.data.notifications || [];
          setNotifications(notifs);
          console.log('Fetched notifications:', notifs); // debug log
        })
        .catch((err) => {
          console.error(
            'Error fetching notifications:',
            err.response?.data || err.message
          );
        });
    };

    fetchNotifications(); // initial load

    const interval = setInterval(fetchNotifications, 5000); // every 5 sec

    return () => clearInterval(interval); // cleanup
  }, []);
  if (loading) {
    return <Loader />;
  }

  const handleClick = (assignmentId) => {
    navigate(`/view-assignment/${assignmentId}`);
  };

  return (
    <>
      <WriterNav />
      <div className="notification-container oxygen-regular">
        <h2 className="notif-title">Notifications</h2>

        {notifications.length > 0 ? (
          notifications.map((notif, idx) => {
            const hasAssignment = notif.assignmentId && notif.assignmentId._id;
            return (
              <div
                key={notif._id || idx}
                className={`notif-card${hasAssignment ? '' : ' disabled'}`}
                onClick={() =>
                  hasAssignment && handleClick(notif.assignmentId._id)
                }
              >
                <strong className="notif-message">{notif.message}</strong>
                <p className="notif-from">
                  From: {notif.senderId?.name || 'Unknown User'}
                </p>
              </div>
            );
          })
        ) : (
          <p className="no-notifications">No notifications yet 🚀</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WriterNotification;
