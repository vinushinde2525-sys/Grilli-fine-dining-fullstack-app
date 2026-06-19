import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Topbar      from '../components/layout/Topbar';
import Navbar      from '../components/layout/Navbar';
import Footer      from '../components/layout/Footer';
import BackToTop   from '../components/ui/PageLoader';
import CartDrawer  from '../components/cart/CartDrawer';
import MobileBottomNav from '../components/layout/MobileBottomNav';

export default function MainLayout() {
  var location = useLocation();
  return (
    <div className="min-h-screen bg-eerie-1 text-white">
      <Topbar />
      <Navbar />
      <CartDrawer />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>

      <Footer />
      <BackToTop />
      <MobileBottomNav />
    </div>
  );
}
