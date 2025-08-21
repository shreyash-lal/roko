import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Loader from '../../components/Loader';
import axios from 'axios';

// Stripe imports
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

// ✅ Payment Form Component
const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 🔑 Create PaymentIntent from backend
      const { data } = await axios.post(
        'https://roko-backend.onrender.com/pay',
        {
          amount,
        }
      );

      const clientSecret = data.clientSecret;

      // 💳 Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert('Payment failed: ' + result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          alert('✅ Payment successful!');
        }
      }
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Error: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement className="border p-2 rounded mb-2" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="pay bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </form>
  );
};

const MyAssignment = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Nav />
      <div className="assignments-container oxygen-regular">
        <h1>My Assignments</h1>
        {/* Tabs */}
        <div className="tab-btn">
          <button
            onClick={() => handleTabClick('pending')}
            className={`p-btn ${
              activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => handleTabClick('completed')}
            className={`c-btn ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Completed Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'pending' && (
            <div className="pending-content oxygen-regular">
              <div className="pbox">
                <h2>No Pending Assignments</h2>
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="complete-content oxygen-regular">
              <div className="abox">
                <div className="cbox">
                  <h2>Artificial Intelligence</h2>
                  <div className="c-btns">
                    <button className="details">View Details</button>
                    {/* Stripe Payment Form */}
                    <Elements stripe={stripePromise}>
                      <CheckoutForm amount={100} />
                    </Elements>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAssignment;
