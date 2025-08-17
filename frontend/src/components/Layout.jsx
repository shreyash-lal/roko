import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/' || location.pathname === '/roko' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/verify-otp';

  return (
    <>
      {!hideNavFooter && <Nav />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
};

export default Layout;
