import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Topbar() {
  var [hidden, setHidden] = useState(false);

  useEffect(function() {
    var onScroll = function() { setHidden(window.scrollY > 80); };
    window.addEventListener('scroll', onScroll);
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div className={
      'fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-smoky-1/90 backdrop-blur-sm transition-transform duration-300 ' +
      (hidden ? '-translate-y-full' : 'translate-y-0')
    }>
      <div className="wrap-wide h-10 hidden sm:flex items-center justify-center gap-8">
        <div className="flex items-center gap-2 text-quick-silver text-xs">
          <MapPin size={13} className="text-gold" />
          <span>Restaurant St, Delicious City, London 9578, UK</span>
        </div>
        <div className="w-1.5 h-1.5 border border-gold rotate-45 opacity-50" />
        <div className="flex items-center gap-2 text-quick-silver text-xs">
          <Clock size={13} className="text-gold" />
          <span>Daily: 8:00 am — 10:00 pm</span>
        </div>
        <div className="w-1.5 h-1.5 border border-gold rotate-45 opacity-50 hidden lg:block" />
        <a href="tel:+11234567890" className="hidden lg:flex items-center gap-2 text-quick-silver text-xs hover:text-gold transition-colors">
          <Phone size={13} className="text-gold" />
          <span>+1 123 456 7890</span>
        </a>
        <div className="w-1.5 h-1.5 border border-gold rotate-45 opacity-50 hidden lg:block" />
        <a href="mailto:booking@grilli.com" className="hidden lg:flex items-center gap-2 text-quick-silver text-xs hover:text-gold transition-colors">
          <Mail size={13} className="text-gold" />
          <span>booking@grilli.com</span>
        </a>
      </div>
    </div>
  );
}
