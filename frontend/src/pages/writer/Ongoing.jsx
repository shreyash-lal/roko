// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Footer from '../../components/Footer';
// import WriterNav from '../../components/WriterNav';
// import Loader from '../../components/Loader';
// import '../../App.css';

// const OngoingAssignment = () => {
//   const [ongoingAssignments, setOngoingAssignments] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch all ongoing assignments (accepted by writer)
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//     const fetchOngoingAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(
//           'https://roko-backend.onrender.com/api/assignments/ongoing',
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setOngoingAssignments(res.data);
//       } catch (err) {
//         console.error('Error fetching ongoing assignments:', err);
//       }
//     };
//     fetchOngoingAssignments();
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   // Mark assignment as completed
//   const markAsCompleted = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `https://roko-backend.onrender.com/api/assignments/${id}/complete`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert('Assignment marked as Completed! User will be notified.');
//       setOngoingAssignments((prev) => prev.filter((a) => a._id !== id));
//       setSelectedAssignment(null);
//     } catch (err) {
//       console.error('Error marking completed:', err);
//     }
//   };

//   return (
//     <>
//       <WriterNav />
//       <div className="ongoingassignment-container">
//         <h2 className="ongoingassignment-title">📌 Ongoing Assignments</h2>

//         <div className="ongoingassignment-list">
//           {ongoingAssignments.length === 0 ? (
//             <p className="ongoingassignment-empty">
//               No ongoing assignments yet.
//             </p>
//           ) : (
//             ongoingAssignments.map((a) => (
//               <div
//                 key={a._id}
//                 className="ongoingassignment-card"
//                 onClick={() => setSelectedAssignment(a)}
//               >
//                 <h3 className="ongoingassignment-card-title">{a.title}</h3>
//                 <p className="ongoingassignment-card-subject">{a.subject}</p>
//                 <p className="ongoingassignment-card-deadline">
//                   Deadline: {new Date(a.deadline).toLocaleDateString()}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>

//         {selectedAssignment && (
//           <div className="ongoingassignment-details">
//             <h3 className="ongoingassignment-details-title">
//               {selectedAssignment.title}
//             </h3>
//             <p>
//               <strong>Subject:</strong> {selectedAssignment.subject}
//             </p>
//             <p>
//               <strong>Description:</strong> {selectedAssignment.description}
//             </p>
//             <p>
//               <strong>Deadline:</strong>{' '}
//               {new Date(selectedAssignment.deadline).toLocaleDateString()}
//             </p>

//             {selectedAssignment.file && (
//               <div className="ongoingassignment-file">
//                 <a
//                   href={`https://roko-backend.onrender.com/uploads/${selectedAssignment.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="ongoingassignment-file-link"
//                 >
//                   📎 View Uploaded File
//                 </a>
//               </div>
//             )}

//             <button
//               className="ongoingassignment-complete-btn"
//               onClick={() => markAsCompleted(selectedAssignment._id)}
//             >
//               ✅ Mark as Completed
//             </button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OngoingAssignment;

// frontend/src/pages/OngoingAssignment.jsx
import React, { useState, useEffect } from 'react';
import '../../App.css';
import Footer from '../../components/Footer';
import WriterNav from '../../components/WriterNav';
import Loader from '../../components/Loader';

const OngoingAssignment = () => {
  const [status, setStatus] = useState('In Progress');
  const [loading, setLoading] = useState(true);

  const handleComplete = () => {
    setStatus('Completed ✅');
    alert('🎉 Assignment marked as completed! User will be notified.');
  };

  // Dummy assignment data
  const assignment = {
    title: 'Mern Stack Project',
    subject: 'Development',
    description:
      'I want to make a report on making of food delivery application in MERN Stack',
    deadline: '16th August 2025',
    fileUrl: 'https://www.ijrti.org/papers/IJRTI2304061.pdf',
    imageUrl: '/2.png',
  };

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
      <WriterNav />
      <div className="ongoingassignment-container">
        <h2 className="ongoingassignment-heading">📂 Ongoing Assignment</h2>

        <div className="ongoingassignment-card">
          <h3 className="ongoingassignment-title">{assignment.title}</h3>
          <p>
            <strong>Subject:</strong> {assignment.subject}
          </p>
          <p>
            <strong>Description:</strong> {assignment.description}
          </p>
          <p>
            <strong>Deadline:</strong> {assignment.deadline}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className="ongoingassignment-status">{status}</span>
          </p>

          <div className="ongoingassignment-files">
            <p>
              <strong>Uploaded Files:</strong>
            </p>
            <a
              href={assignment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ongoingassignment-link"
            >
              📄 View PDF
            </a>
          </div>

          <button className="ongoingassignment-btn" onClick={handleComplete}>
            Mark as Completed ✅
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OngoingAssignment;
