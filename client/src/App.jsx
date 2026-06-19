import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout   from './layouts/MainLayout';
import AdminLayout  from './layouts/AdminLayout';
import { ProtectedRoute, AdminRoute } from './routes/ProtectedRoute';

// Public pages
import Home               from './pages/Home';
import MenuPage           from './pages/MenuPage';
import MenuDetail         from './pages/MenuDetail';
import AboutPage          from './pages/AboutPage';
import EventsPage         from './pages/EventsPage';
import EventDetail        from './pages/EventDetail';
import GalleryPage        from './pages/GalleryPage';
import ContactPage        from './pages/ContactPage';
import ReservationPage    from './pages/ReservationPage';
import ReservationSuccess from './pages/ReservationSuccess';
import WishlistPage       from './pages/WishlistPage';
import NotFound           from './pages/NotFound';
import Unauthorized       from './pages/Unauthorized';

// Auth pages
import LoginPage          from './pages/LoginPage';
import RegisterPage       from './pages/RegisterPage';
import { ForgotPasswordPage, ResetPasswordPage } from './pages/AuthPages';

// Protected customer pages
import CheckoutPage       from './pages/CheckoutPage';
import { OrderHistoryPage, OrderDetailPage } from './pages/OrderPages';
import ProfilePage        from './pages/ProfilePage';
import NotificationsPage  from './pages/NotificationsPage';
import OrderSuccess       from './pages/OrderSuccess';

// Admin pages
import AdminDashboard     from './pages/admin/AdminDashboard';
import AdminMenu          from './pages/admin/AdminMenu';
import AdminMenuForm      from './pages/admin/AdminMenuForm';
import AdminCategories    from './pages/admin/AdminCategories';
import AdminOrders        from './pages/admin/AdminOrders';
import AdminReservations  from './pages/admin/AdminReservations';
import AdminUsers         from './pages/admin/AdminUsers';
import AdminEvents        from './pages/admin/AdminEvents';
import AdminTestimonials  from './pages/admin/AdminTestimonials';
import AdminAnalytics     from './pages/admin/AdminAnalytics';
import AdminSettings      from './pages/admin/AdminSettings';

// Scroll restoration
function ScrollToTop() {
  var location = useLocation();
  useEffect(function() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ── Public / Customer ──────────────────────────────── */}
        <Route element={<MainLayout />}>
          <Route path="/"                          element={<Home />} />
          <Route path="/about"                     element={<AboutPage />} />
          <Route path="/menu"                      element={<MenuPage />} />
          <Route path="/menu/:id"                  element={<MenuDetail />} />
          <Route path="/specials"                  element={<Navigate to="/menu?category=specials" replace />} />
          <Route path="/events"                    element={<EventsPage />} />
          <Route path="/events/:id"                element={<EventDetail />} />
          <Route path="/gallery"                   element={<GalleryPage />} />
          <Route path="/contact"                   element={<ContactPage />} />
          <Route path="/reservation"               element={<ReservationPage />} />
          <Route path="/reservation/success/:ref"  element={<ReservationSuccess />} />
          <Route path="/wishlist"                  element={<WishlistPage />} />

          {/* Auth */}
          <Route path="/login"                     element={<LoginPage />} />
          <Route path="/register"                  element={<RegisterPage />} />
          <Route path="/forgot-password"           element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token"     element={<ResetPasswordPage />} />
          <Route path="/unauthorized"              element={<Unauthorized />} />

          {/* Protected customer routes */}
          <Route path="/checkout"    element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/orders"      element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
          <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
          <Route path="/order-success/:orderId" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/profile"     element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ── Admin ──────────────────────────────────────────── */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index                 element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"      element={<AdminDashboard />} />
          <Route path="menu"           element={<AdminMenu />} />
          <Route path="menu/new"       element={<AdminMenuForm />} />
          <Route path="menu/:id/edit"  element={<AdminMenuForm />} />
          <Route path="categories"     element={<AdminCategories />} />
          <Route path="orders"         element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<AdminOrders />} />
          <Route path="reservations"   element={<AdminReservations />} />
          <Route path="reservations/:refId" element={<AdminReservations />} />
          <Route path="users"          element={<AdminUsers />} />
          <Route path="events"         element={<AdminEvents />} />
          <Route path="testimonials"   element={<AdminTestimonials />} />
          <Route path="analytics"      element={<AdminAnalytics />} />
          <Route path="settings"       element={<AdminSettings />} />
        </Route>
      </Routes>
    </>
  );
}
