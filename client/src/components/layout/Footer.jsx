import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';

var QUICK_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'About Us',    to: '/about' },
  { label: 'Our Menus',   to: '/menu' },
  { label: 'Events',      to: '/events' },
  { label: 'Gallery',     to: '/gallery' },
  { label: 'Contact',     to: '/contact' },
  { label: 'Book A Table',to: '/reservation' },
];

var ACCOUNT_LINKS = [
  { label: 'Sign In',      to: '/login' },
  { label: 'Register',     to: '/register' },
  { label: 'My Profile',   to: '/profile' },
  { label: 'My Orders',    to: '/orders' },
  { label: 'Wishlist',     to: '/wishlist' },
  { label: 'Notifications',to: '/notifications' },
];

export default function Footer() {
  var [email, setEmail] = useState('');

  var handleSubscribe = function(e) {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed! Enjoy 25% off your next visit.');
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-smoky-1 text-center pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 w-3 opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, hsl(38,61%,73%) 0, hsl(38,61%,73%) 1px, transparent 1px, transparent 8px)' }} />
      <div className="absolute top-0 right-0 bottom-0 w-3 opacity-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, hsl(38,61%,73%) 0, hsl(38,61%,73%) 1px, transparent 1px, transparent 8px)' }} />

      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-10 pb-16 border-b border-white/10 text-left">

          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="font-forum text-4xl lg:text-5xl text-white block">
              Grilli<span className="text-gold">.</span>
            </Link>
            <p className="text-quick-silver text-sm leading-relaxed">Restaurant St, Delicious City, London 9578, UK</p>
            <a href="mailto:booking@grilli.com" className="block text-sm text-quick-silver hover:text-gold transition-colors">booking@grilli.com</a>
            <a href="tel:+88123123456" className="block text-sm text-quick-silver hover:text-gold transition-colors">+88-123-123456</a>
            <p className="text-quick-silver text-sm">Open: 09:00 am — 01:00 am</p>
            <div className="flex gap-1 pt-2">
              {[0,1,2].map(function(i) {
                return <div key={i} className="w-2 h-2 border border-gold rotate-45 animate-rotate" style={{ animationDelay: i*0.3+'s' }} />;
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-forum text-2xl text-white mb-6">Quick Links</p>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map(function(item) {
                return (
                  <li key={item.to}>
                    <Link to={item.to} className="text-xs font-bold uppercase tracking-[0.3em] text-quick-silver hover:text-gold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <p className="font-forum text-2xl text-white mb-6">My Account</p>
            <ul className="space-y-3.5">
              {ACCOUNT_LINKS.map(function(item) {
                return (
                  <li key={item.to}>
                    <Link to={item.to} className="text-xs font-bold uppercase tracking-[0.3em] text-quick-silver hover:text-gold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-forum text-2xl lg:text-3xl text-white mb-2">Get News & Offers</p>
            <p className="text-quick-silver text-sm mb-5">Subscribe & Get <span className="text-gold">25% Off.</span></p>
            <form onSubmit={handleSubscribe} className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
              <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); }}
                placeholder="Your email" className="grilli-input pl-10 pr-28 text-sm" />
              <button type="submit" className="absolute right-0 top-0 bottom-0 btn-grilli-solid px-4 text-xs">
                Subscribe
              </button>
            </form>
            <div className="mt-8 space-y-2">
              <p className="text-quick-silver text-xs uppercase tracking-widest font-bold">Opening Hours</p>
              <p className="text-quick-silver text-sm">Monday – Friday: 08:00 – 23:00</p>
              <p className="text-quick-silver text-sm">Weekends: 09:00 – 01:00</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-quick-silver text-sm">&copy; {new Date().getFullYear()} Grilli Restaurant. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/contact" className="text-xs text-quick-silver hover:text-gold transition-colors">Contact</Link>
            <Link to="/about"   className="text-xs text-quick-silver hover:text-gold transition-colors">About</Link>
            <Link to="/menu"    className="text-xs text-quick-silver hover:text-gold transition-colors">Menu</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
