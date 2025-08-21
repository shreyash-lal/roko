import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Assuming you have a CSS file for styles
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

const amountINR = (num) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
    num
  );

const UPI_APPS = [
  { id: 'phonepe', label: 'PhonePe', color: '#5f259f', type: 'upi' },
  { id: 'gpay', label: 'GPay', color: '#1a73e8', type: 'upi' },
  { id: 'paytm', label: 'Paytm', color: '#00baf2', type: 'upi' },
];

const BANKS = [
  'HDFC Bank',
  'ICICI Bank',
  'SBI',
  'Axis Bank',
  'Kotak',
  'Yes Bank',
  'Bank of Baroda',
];

const Tab = ({ active, onClick, icon, label }) => {
  return (
    <button
      className={`pg-tab ${active ? 'pg-tab--active' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="pg-tab__icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

const InlineIcon = ({ id, size = 20 }) => {
  // simple inline SVG icons (no external deps)
  const common = { width: size, height: size, viewBox: '0 0 24 24' };
  switch (id) {
    case 'phonepe':
      return (
        <svg {...common} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#5f259f" />
          <path
            d="M8 9.5h8M12 9.5v7"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'gpay':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Z"
            fill="#fff"
          />
          <path d="M12 2a10 10 0 0 1 8.66 5.01L12 12V2Z" fill="#1a73e8" />
          <path
            d="M20.66 7.01A10 10 0 0 1 12 22v-10l8.66-4.99Z"
            fill="#34a853"
          />
          <path d="M12 22A10 10 0 0 1 3.34 7.01L12 12v10Z" fill="#fbbc05" />
          <path d="M3.34 7.01A10 10 0 0 1 12 2v10L3.34 7.01Z" fill="#ea4335" />
        </svg>
      );
    case 'paytm':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#00baf2" />
          <path d="M7 8h10v8H7z" fill="#fff" opacity=".2" />
          <path
            d="M8 10h8M8 14h8"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'card':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="3" fill="#111827" />
          <rect x="2" y="8" width="20" height="3" fill="#374151" />
          <rect x="5" y="14" width="8" height="2" rx="1" fill="#9ca3af" />
        </svg>
      );
    case 'upi':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="4" fill="#16a34a" />
          <path
            d="M7 12h10"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 8v8"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'bank':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M3 8 12 3l9 5v2H3V8Z" fill="#0ea5e9" />
          <path d="M5 10h14v8H5z" fill="#e5e7eb" />
          <path d="M7 13h2v3H7zM11 13h2v3h-2zM15 13h2v3h-2z" fill="#9ca3af" />
        </svg>
      );
    case 'visa':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#1a237e" />
          <text x="5" y="16" fontSize="8" fill="#fff" fontWeight="700">
            VISA
          </text>
        </svg>
      );
    case 'mc':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="12" r="6" fill="#eb001b" />
          <circle cx="14" cy="12" r="6" fill="#f79e1b" opacity=".9" />
        </svg>
      );
    case 'rupay':
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#0b5ed7" />
          <text x="3" y="16" fontSize="7" fill="#fff" fontWeight="700">
            RuPay
          </text>
        </svg>
      );
    default:
      return null;
  }
};

const Field = ({ label, children, hint, right }) => (
  <label className="pg-field">
    <div className="pg-field__row">
      <span className="pg-field__label">{label}</span>
      {right}
    </div>
    <div className="pg-field__ctrl">{children}</div>
    {hint && <div className="pg-field__hint">{hint}</div>}
  </label>
);

const Divider = ({ text = 'or' }) => (
  <div className="pg-divider">
    <span>{text}</span>
  </div>
);

export default function PaymentGateway({
  amount = 99, // rupees
  orderId = 'ORD-' + Math.floor(Math.random() * 1e6),
  customer = { name: 'Shreyash', email: 'shreyash@example.com' },
}) {
  const [tab, setTab] = useState('upi'); // upi | card | bank
  const [upiApp, setUpiApp] = useState('phonepe');
  const [upiVpa, setUpiVpa] = useState('');
  const [bank, setBank] = useState(BANKS[0]);
  const [card, setCard] = useState({
    number: '',
    name: customer.name,
    expiry: '',
    cvv: '',
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [processing, setProcessing] = useState(false);

  const payDisabled = useMemo(() => {
    if (processing) return true;
    if (tab === 'upi') return !(upiVpa || upiApp);
    if (tab === 'card')
      return !(
        card.number.replace(/\s/g, '').length >= 12 &&
        card.name.trim().length > 0 &&
        /\d{2}\/\d{2}/.test(card.expiry) &&
        card.cvv.length >= 3
      );
    if (tab === 'bank') return !bank;
    return true;
  }, [tab, upiApp, upiVpa, card, bank, processing]);

  const fakeWait = (ms) => new Promise((r) => setTimeout(r, ms));

  const handlePay = async () => {
    setProcessing(true);
    setStatus(null);
    // purely simulated latency
    await fakeWait(1200);

    // simple deterministic success bias for better UX
    const successChance = tab === 'card' ? 0.85 : tab === 'upi' ? 0.9 : 0.8;
    const ok = Math.random() < successChance;

    setProcessing(false);
    setStatus(ok ? 'success' : 'failed');
  };

  const maskCard = (val) =>
    val
      .replace(/[^\d]/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();

  return (
    <>
      <Nav />
      <div className="pg-wrap">
        <div className="pg-card pg-animate-up">
          <header className="pg-header">
            <div className="pg-brand">
              <span className="pg-dot" />
              <span className="pg-title oxygen-regular">
                Roko • Secure Checkout
              </span>
            </div>
            <div className="pg-amount">{amountINR(amount)}</div>
          </header>

          {/* Tabs */}
          <div className="pg-tabs">
            <Tab
              active={tab === 'upi'}
              onClick={() => setTab('upi')}
              icon={<InlineIcon id="upi" />}
              label="UPI"
            />
            <Tab
              active={tab === 'card'}
              onClick={() => setTab('card')}
              icon={<InlineIcon id="card" />}
              label="Card"
            />
            <Tab
              active={tab === 'bank'}
              onClick={() => setTab('bank')}
              icon={<InlineIcon id="bank" />}
              label="NetBanking"
            />
            <span
              className="pg-tabs__glider"
              data-active={tab}
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="pg-body">
            {tab === 'upi' && (
              <section className="pg-pane pg-pane--active">
                <div className="pg-grid">
                  {UPI_APPS.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      className={`pg-upi ${upiApp === u.id ? 'active' : ''}`}
                      onClick={() => setUpiApp(u.id)}
                      style={{ '--accent': u.color }}
                    >
                      <InlineIcon id={u.id} size={24} />
                      <span>{u.label}</span>
                    </button>
                  ))}
                </div>

                <Divider text="or pay via VPA" />

                <Field
                  label="Your UPI ID (VPA)"
                  hint="Example: username@okaxis"
                  right={<span className="pg-badge">Auto validate</span>}
                >
                  <input
                    className="pg-input"
                    placeholder="name@bank"
                    value={upiVpa}
                    onChange={(e) => setUpiVpa(e.target.value)}
                  />
                </Field>
              </section>
            )}

            {tab === 'card' && (
              <section className="pg-pane pg-pane--active">
                <Field
                  label="Card Number"
                  right={
                    <div className="pg-cardbrands">
                      <InlineIcon id="visa" />
                      <InlineIcon id="mc" />
                      <InlineIcon id="rupay" />
                    </div>
                  }
                >
                  <input
                    inputMode="numeric"
                    className="pg-input"
                    placeholder="1234 5678 9012 3456"
                    value={card.number}
                    onChange={(e) =>
                      setCard((c) => ({
                        ...c,
                        number: maskCard(e.target.value),
                      }))
                    }
                  />
                </Field>

                <div className="pg-row">
                  <Field label="Name on Card">
                    <input
                      className="pg-input"
                      placeholder="Full Name"
                      value={card.name}
                      onChange={(e) =>
                        setCard((c) => ({ ...c, name: e.target.value }))
                      }
                    />
                  </Field>
                </div>

                <div className="pg-row">
                  <Field label="Expiry (MM/YY)">
                    <input
                      className="pg-input"
                      inputMode="numeric"
                      placeholder="07/28"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard((c) => ({
                          ...c,
                          expiry: e.target.value
                            .replace(/[^\d/]/g, '')
                            .slice(0, 5),
                        }))
                      }
                    />
                  </Field>
                  <Field label="CVV">
                    <input
                      className="pg-input"
                      inputMode="numeric"
                      placeholder="123"
                      value={card.cvv}
                      onChange={(e) =>
                        setCard((c) => ({
                          ...c,
                          cvv: e.target.value.replace(/[^\d]/g, '').slice(0, 4),
                        }))
                      }
                    />
                  </Field>
                </div>

                <label className="pg-save">
                  <input
                    type="checkbox"
                    checked={saving}
                    onChange={(e) => setSaving(e.target.checked)}
                  />
                  <span>Securely save this card for faster checkout</span>
                </label>
              </section>
            )}

            {tab === 'bank' && (
              <section className="pg-pane pg-pane--active">
                <Field label="Choose your bank">
                  <select
                    className="pg-input"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    {BANKS.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <p className="pg-note">
                  You’ll be redirected to your bank’s login page to complete the
                  payment (simulated).
                </p>
              </section>
            )}
          </div>

          {/* Footer / CTA */}
          <footer className="pg-footer">
            <div className="pg-order">
              <div>
                <div className="pg-order__label">Order ID</div>
                <div className="pg-order__val">{orderId}</div>
              </div>
              <div>
                <div className="pg-order__label">Payable</div>
                <div className="pg-order__val">{amountINR(amount)}</div>
              </div>
            </div>

            <button
              className={`pg-paybtn ${processing ? 'loading' : ''}`}
              disabled={payDisabled}
              onClick={handlePay}
              type="button"
            >
              {processing ? (
                <span className="pg-loader" aria-hidden />
              ) : (
                'Pay Securely'
              )}
            </button>
          </footer>
        </div>

        {/* Result Toast */}
        {status && (
          <div
            className={`pg-toast ${
              status === 'success' ? 'pg-toast--ok' : 'pg-toast--err'
            }`}
            role="status"
          >
            {status === 'success'
              ? '✅ Payment Successful'
              : '❌ Payment Failed'}
            <button
              className="pg-toast__close"
              onClick={() => setStatus(null)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {/* Background animated blobs */}
        <div className="pg-blob pg-blob--one" />
        <div className="pg-blob pg-blob--two" />
      </div>
      <Footer />
    </>
  );
}
