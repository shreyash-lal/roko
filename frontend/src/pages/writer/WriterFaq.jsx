import React, { useState, useEffect } from 'react';
import '../../App.css';
import Layout from '../../components/Layout';
const WriterFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="faq-container oxygen-regular">
      <h1 className="oxygen-regular">Frequently Asked Questions</h1>
      <div className="faq-item oxygen-regular">
        <h2 onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}>
          How can I upload an assignment?
        </h2>
        {openIndex === 0 && (
          <p>
            You can upload your assignment by clicking on the "Upload" button on
            the assignment page.
          </p>
        )}
      </div>
      <div className="faq-item oxygen-regular">
        <h2 onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}>
          What is the deadline for submissions?
        </h2>
        {openIndex === 1 && (
          <p>The deadline for submissions is every Friday at 5 PM.</p>
        )}
      </div>
      <div className="faq-item oxygen-regular">
        <h2 onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}>
          How can I check my grades?
        </h2>
        {openIndex === 2 && (
          <p>
            You can check your grades by navigating to the "Grades" section in
            your dashboard.
          </p>
        )}
      </div>
      <div className="faq-item oxygen-regular">
        <h2 onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}>
          Who can I contact for technical support?
        </h2>
        {openIndex === 3 && (
          <p>
            You can contact technical support by emailing support@example.com.
          </p>
        )}
      </div>
    </div>
  );
};

export default WriterFaq;
