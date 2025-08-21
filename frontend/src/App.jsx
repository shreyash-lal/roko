import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Dashboard from './pages/user/Dashboard';
import Help from './pages/user/Help';
import Footer from './components/Footer';
import Register from './pages/auth/Register';
import Roko from './pages/auth/Roko';
import Login from './pages/auth/Login';
import OtpVerify from './pages/auth/OtpVerify';
import PrivateRoute from './components/PrivateRoute';
import Faq from './pages/user/Faq';
import Profile from './pages/user/Profile';
import Loader from './components/Loader';
import PaymentGateway from './pages/user/PaymentGateway';
import WriterDashboard from './pages/writer/WriterDashboard';
import WriterHelp from './pages/writer/WriterHelp';
import WriterProfile from './pages/writer/WriterProfile';
import React from 'react';
import MyAssignment from './pages/user/MyAssignment';
import UploadAssignment from './pages/user/UploadAssignment';
import AllAssignments from './pages/writer/AllAssignments';
import WriterNotification from './pages/writer/WriterNotification';
import Notification from './pages/user/Notification';
import Ongoing from './pages/writer/Ongoing';

// 👇 Move Layout outside of App()
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavFooter = [
    '/',
    '/roko',
    '/login',
    '/register',
    '/verify-otp',
    '/',
    '/dashboard',
    '/help',
    '/faq',
    '/profile',
    '/loader',
    '/my-assignments',
    '/upload-assignment',
    '/notifications',
    '/payment',
    '/writer-dashboard',
    '/writer-profile',
    '/writer-help',
    '/writer-faq',
    '/available-assignments',
    '/writer-notifications',
    '/ongoing-assignments',
  ].includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Nav />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Roko />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpVerify />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/help"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <Help />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <Faq />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/my-assignments"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <MyAssignment />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-assignment"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <UploadAssignment />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <Notification />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute allowedRoles={['user']}>
              <Layout>
                <PaymentGateway />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/loader"
          element={
            <PrivateRoute allowedRoles={['user', 'writer']}>
              <Layout>
                <Loader />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/writer-dashboard"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <WriterDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/writer-profile"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <WriterProfile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/writer-faq"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <WriterDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/writer-help"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <WriterHelp />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/available-assignments"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <AllAssignments />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/writer-notifications"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <WriterNotification />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ongoing-assignments"
          element={
            <PrivateRoute allowedRoles={['writer']}>
              <Layout>
                <Ongoing />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
