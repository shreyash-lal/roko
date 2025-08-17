import React, { useEffect, useState } from 'react';
import '../../App.css';
import Footer from '../../components/Footer';
import WriterNav from '../../components/WriterNav';
import Loader from '../../components/Loader';

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Backend se pending assignments fetch karna
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    const fetchAssignments = async () => {
      try {
        const res = await fetch(
          'https://roko-backend.onrender.com/api/assignments/pending'
        );
        const data = await res.json();
        console.log('Assignments data:', data);
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);
  if (loading) {
    return <Loader />;
  }

  // ✅ Assignment Accept
  const handleAccept = async (id) => {
    try {
      await fetch(
        `https://roko-backend.onrender.com/api/assignments/accept/${id}`,
        {
          method: 'PUT',
        }
      );
      setAssignments(assignments.filter((a) => a._id !== id));
      alert('Assignment accepted!');
    } catch (error) {
      console.error('Error accepting assignment:', error);
    }
  };

  // ✅ Assignment Deny
  const handleDeny = async (id) => {
    try {
      await fetch(
        `https://roko-backend.onrender.com/api/assignments/deny/${id}`,
        {
          method: 'PUT',
        }
      );
      setAssignments(assignments.filter((a) => a._id !== id));
      alert('Assignment denied!');
    } catch (error) {
      console.error('Error denying assignment:', error);
    }
  };

  if (loading) {
    return <div className="loader">Loading assignments...</div>;
  }

  return (
    <>
      <WriterNav />
      <div className="allassignments-container">
        <h2 className="allassignments-title oxygen-regular">
          📚 Pending Assignments
        </h2>
        {assignments.length === 0 ? (
          <p className="no-assignments oxygen-regular">
            No pending assignments available 🎉
          </p>
        ) : (
          <div className="allassignments-grid">
            {(Array.isArray(assignments) ? assignments.slice(0, 10) : []).map(
              (assignment) => (
                <div
                  key={assignment._id}
                  className="allassignment-card oxygen-regular"
                >
                  <h3 className="oxygen-regular">{assignment.title}</h3>
                  <p className="oxygen-regular">
                    <b>Subject:</b> {assignment.subject}
                  </p>
                  <p>
                    <b>Deadline:</b> {assignment.deadline.slice(0, 10)}
                  </p>
                  <p className="desc">{assignment.description}</p>
                  <div className="buttons">
                    <button
                      className="accept-btn oxygen-regular"
                      onClick={() => handleAccept(assignment._id)}
                    >
                      <i className="fas fa-check-circle"></i>Accept
                    </button>
                    <button
                      className="deny-btn oxygen-regular"
                      onClick={() => handleDeny(assignment._id)}
                    >
                      <i className="fas fa-times-circle"></i> Deny
                    </button>
                  </div>
                  <button className="details-btn oxygen-regular">
                    <i className="fas fa-info-circle"></i> View Details
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllAssignments;
