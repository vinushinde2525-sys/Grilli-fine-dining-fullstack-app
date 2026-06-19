import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ShoppingBag, Heart, User, LogOut,
  LayoutDashboard, Bell, ChevronDown, UtensilsCrossed
} from 'lucide-react';
import { toggleNav, closeNav, openCartDrawer, selectCartCount, selectWishlistCount } from '../../store';
import { selectCurrentUser, selectIsAuth, selectIsAdmin } from '../../store/authSlice';
import { useLogout } from '../../hooks/useApi';

var NAV_LINKS = [
  { to: '/',            label: 'Home',       end: true },
  { to: '/about',       label: 'About Us',   end: false },
  { to: '/menu',        label: 'Menus',      end: false },
  { to: '/events',      label: 'Events',     end: false },
  { to: '/gallery',     label: 'Gallery',    end: false },
  { to: '/contact',     label: 'Contact',    end: false },
];

export default function Navbar() {
  var dispatch   = useDispatch();
  var navigate   = useNavigate();
  var navOpen    = useSelector(function(s) { return s.ui.navOpen; });
  var cartCount  = useSelector(selectCartCount);
  var wishCount  = useSelector(selectWishlistCount);
  var user       = useSelector(selectCurrentUser);
  var isAuth     = useSelector(selectIsAuth);
  var isAdmin    = useSelector(selectIsAdmin);
  var logout     = useLogout();

  var [scrolled,  setScrolled]  = useState(false);
  var [topbarVis, setTopbarVis] = useState(true);
  var [dropOpen,  setDropOpen]  = useState(false);
  var dropRef = useRef(null);
  var lastY   = useRef(0);

  useEffect(function() {
    var onScroll = function() {
      var y = window.scrollY;
      setScrolled(y > 60);
      setTopbarVis(y < 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(function() {
    var handler = function(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return function() { document.removeEventListener('mousedown', handler); };
  }, []);

  var handleLogout = function() {
    setDropOpen(false);
    dispatch(closeNav());
    logout.mutate(undefined, { onSettled: function() { navigate('/'); } });
  };

  // Topbar is h-10 (40px). Navbar top = 40px when topbar visible, 0 when not.
  var navTop = topbarVis ? 40 : 0;

  return (
    <>
      {/* ── Desktop / Tablet Navbar ─────────────────────────── */}
      <header
        style={{ top: navTop + 'px' }}
        className={[
          'fixed left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-smoky-1/95 backdrop-blur-md shadow-xl border-b border-white/5 py-2'
            : 'bg-transparent py-4',
        ].join(' ')}
      >
        <div className="wrap-wide flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={function() { dispatch(closeNav()); }}
            className="font-forum text-3xl lg:text-4xl text-white flex-shrink-0 leading-none"
          >
            Grilli<span className="text-gold">.</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map(function(link) {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={function(p) {
                    return [
                      'text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200',
                      p.isActive ? 'text-gold' : 'text-white/80 hover:text-gold',
                    ].join(' ');
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-0.5 sm:gap-1">

            {/* Book table CTA — desktop only */}
            <Link
              to="/reservation"
              className="hidden xl:inline-flex btn-grilli text-[10px] px-6 py-2.5 mr-2"
            >
              Book Table
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-white/70 hover:text-gold transition-colors hidden sm:flex items-center"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-smoky-1 text-[9px] font-black w-3.5 h-3.5 flex items-center justify-center leading-none">
                  {wishCount > 9 ? '9+' : wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={function() { dispatch(openCartDrawer()); }}
              className="relative p-2 text-white/70 hover:text-gold transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-gold text-smoky-1 text-[9px] font-black min-w-[14px] h-3.5 px-0.5 flex items-center justify-center leading-none"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Auth — desktop dropdown */}
            {isAuth ? (
              <div className="relative hidden sm:block ml-1" ref={dropRef}>
                <button
                  onClick={function() { setDropOpen(function(p) { return !p; }); }}
                  className="flex items-center gap-1.5 py-1.5 px-1.5 text-white/70 hover:text-gold transition-colors"
                  aria-label="Account menu"
                >
                  <div className="w-7 h-7 bg-gold flex items-center justify-center">
                    <span className="font-forum text-smoky-1 text-sm font-bold leading-none">
                      {user && user.name ? user.name[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                  <ChevronDown
                    size={12}
                    className={'transition-transform duration-200 ' + (dropOpen ? 'rotate-180' : '')}
                  />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0,  scale: 1    }}
                      exit={{    opacity: 0, y: 6,  scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-smoky-1 border border-white/10 shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white text-xs font-bold truncate">{user && user.name}</p>
                        <p className="text-quick-silver text-[10px] truncate">{user && user.email}</p>
                      </div>
                      {[
                        { to: '/profile',        icon: <User          size={13} />, label: 'My Profile'   },
                        { to: '/orders',         icon: <ShoppingBag   size={13} />, label: 'My Orders'    },
                        { to: '/notifications',  icon: <Bell          size={13} />, label: 'Notifications'},
                        ...(isAdmin ? [{ to: '/admin/dashboard', icon: <LayoutDashboard size={13} />, label: 'Admin Panel' }] : []),
                      ].map(function(item) {
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={function() { setDropOpen(false); }}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-quick-silver hover:text-gold hover:bg-white/4 transition-colors"
                          >
                            {item.icon} {item.label}
                          </Link>
                        );
                      })}
                      <div className="border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400/70 hover:text-red-400 hover:bg-white/4 transition-colors w-full text-left"
                        >
                          <LogOut size={13} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 border border-gold/60 text-gold hover:bg-gold hover:text-smoky-1 transition-all text-[10px] font-bold uppercase tracking-widest px-4 py-2 ml-1"
              >
                <User size={12} /> Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={function() { dispatch(toggleNav()); }}
              className="lg:hidden p-2 text-white hover:text-gold transition-colors ml-0.5"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {navOpen ? (
                  <motion.div key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="ham" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={function() { dispatch(closeNav()); }}
              className="fixed inset-0 bg-black/80 z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-80 bg-smoky-1 z-[60] flex flex-col overflow-y-auto lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
                <Link
                  to="/"
                  onClick={function() { dispatch(closeNav()); }}
                  className="font-forum text-2xl text-white"
                >
                  Grilli<span className="text-gold">.</span>
                </Link>
                <button
                  onClick={function() { dispatch(closeNav()); }}
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile user pill */}
              {isAuth && user && (
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold flex items-center justify-center flex-shrink-0">
                    <span className="font-forum text-smoky-1 font-bold text-lg">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-bold truncate">{user.name}</p>
                    <p className="text-gold text-[10px] capitalize font-bold uppercase tracking-wider">{user.role}</p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <nav className="flex-1 py-2">
                {NAV_LINKS.map(function(link) {
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.end}
                      onClick={function() { dispatch(closeNav()); }}
                      className={function(p) {
                        return [
                          'flex items-center gap-3 px-6 py-3.5 border-b border-white/5 text-xs font-bold uppercase tracking-[0.15em] transition-colors',
                          p.isActive ? 'text-gold bg-gold/5 border-l-2 border-l-gold' : 'text-white/70 hover:text-gold hover:bg-white/3',
                        ].join(' ');
                      }}
                    >
                      <span className="w-1.5 h-1.5 border border-current rotate-45 flex-shrink-0 opacity-60" />
                      {link.label}
                    </NavLink>
                  );
                })}

                {/* Auth links in mobile */}
                {isAuth && (
                  <div className="border-t border-white/10 mt-2 pt-2">
                    {[
                      { to: '/profile',       label: 'My Profile'    },
                      { to: '/orders',        label: 'My Orders'     },
                      { to: '/notifications', label: 'Notifications' },
                      ...(isAdmin ? [{ to: '/admin/dashboard', label: 'Admin Panel' }] : []),
                    ].map(function(link) {
                      return (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          onClick={function() { dispatch(closeNav()); }}
                          className={function(p) {
                            return 'flex items-center gap-3 px-6 py-3 border-b border-white/5 text-xs font-bold uppercase tracking-[0.15em] transition-colors ' +
                              (p.isActive ? 'text-gold' : 'text-white/50 hover:text-gold');
                          }}
                        >
                          <span className="w-1 h-1 bg-gold opacity-60" />
                          {link.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </nav>

              {/* Bottom actions */}
              <div className="px-6 py-5 border-t border-white/10 space-y-3 flex-shrink-0">
                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={13} /> Sign Out
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to="/login"
                      onClick={function() { dispatch(closeNav()); }}
                      className="btn-grilli text-xs px-6 py-3 inline-flex"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={function() { dispatch(closeNav()); }}
                      className="btn-grilli-solid text-xs px-6 py-3 inline-flex"
                    >
                      Register
                    </Link>
                  </div>
                )}
                <Link
                  to="/reservation"
                  onClick={function() { dispatch(closeNav()); }}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors"
                >
                  <UtensilsCrossed size={13} /> Book a Table
                </Link>
                <div className="pt-3 border-t border-white/10">
                  <a
                    href="tel:+11234567890"
                    className="font-forum text-xl text-gold hover:text-white transition-colors block"
                  >
                    +1 123 456 7890
                  </a>
                  <p className="text-quick-silver text-xs mt-1">Mon–Sun 8:00am – 10:00pm</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
