import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const UploadAssignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    pages: '',
    deadline: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first.');
      return;
    }

    if (!file) {
      alert('Please upload a file.');
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('file', file);

      const res = await axios.post(
        'https://roko-backend.onrender.com/api/upload-assignment',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 201) {
        alert('Assignment uploaded successfully!');
        setFormData({
          title: '',
          subject: '',
          description: '',
          pages: '',
          deadline: '',
        });
        setFile(null);
        document.querySelector('input[type="file"]').value = ''; // reset file input
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading assignment.');
    }
  };

  return (
    <>
      <Nav />
      <div className="upload-form-container oxygen-regular">
        <h1>Upload Assignment</h1>
        <form
          className="upload-form oxygen-regular"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Assignment Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Describe"
              name="description"
              className="oxygen-regular"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="pages"
              placeholder="Enter No. of pages"
              value={formData.pages}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Enter Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <button className="submit-btn" type="submit">
            Submit Assignment
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UploadAssignment;
