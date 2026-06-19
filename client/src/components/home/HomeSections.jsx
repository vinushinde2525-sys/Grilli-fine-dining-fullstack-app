import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTestimonials, useEvents } from '../../hooks/useApi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatDate } from '../../utils/helpers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ── Testimonials ──────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  var rv     = useScrollReveal();
  var result = useTestimonials();
  var items  = result.data || [];
  var [idx, setIdx] = useState(0);
  var item = items[idx] || items[0];

  return (
    <section
      className="py-28 lg:py-36 w-full relative text-center overflow-hidden"
      ref={rv.ref}
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&h=700&fit=crop)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/78" />
      <div className="relative z-10 wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-forum text-gold leading-none mb-6" style={{ fontSize: '7rem' }}>"</p>

          <AnimatePresence mode="wait">
            {item && (
              <motion.p key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="font-forum text-white leading-relaxed mb-10 max-w-4xl mx-auto"
                style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.8rem)' }}>
                {item.text}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex justify-center gap-1 mb-10">
            {[0, 1, 2].map(function(i) {
              return <div key={i} className="w-2 h-2 border border-gold rotate-45 animate-rotate" style={{ animationDelay: i * 0.3 + 's' }} />;
            })}
          </div>

          {item && (
            <AnimatePresence mode="wait">
              <motion.div key={idx + '-p'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-20 h-20 rounded-full object-cover border-2 border-gold" />
                <p className="text-gold font-bold text-sm uppercase tracking-[0.2em]">{item.name}</p>
                <p className="text-quick-silver text-xs uppercase tracking-widest">{item.role}</p>
              </motion.div>
            </AnimatePresence>
          )}

          {items.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              <button onClick={function() { setIdx(function(i) { return i === 0 ? items.length - 1 : i - 1; }); }}
                className="w-9 h-9 border border-gold text-gold rotate-45 flex items-center justify-center hover:bg-gold hover:text-smoky-1 transition-all">
                <ChevronLeft size={15} className="-rotate-45" />
              </button>
              <button onClick={function() { setIdx(function(i) { return (i + 1) % items.length; }); }}
                className="w-9 h-9 border border-gold text-gold rotate-45 flex items-center justify-center hover:bg-gold hover:text-smoky-1 transition-all">
                <ChevronRight size={15} className="-rotate-45" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
var FEATURES = [
  { title: 'Hygienic Food',     text: 'All ingredients sourced fresh daily, prepared in our spotless kitchen.',  icon: '🥗' },
  { title: 'Fresh Environment', text: 'A warm, elegant ambiance crafted to make every visit unforgettable.',    icon: '🌿' },
  { title: 'Skilled Chefs',     text: 'Decades of fine-dining expertise brought to every plate we serve.',       icon: '👨‍🍳' },
  { title: 'Event & Party',     text: 'Private dining rooms and bespoke event packages for every occasion.',    icon: '🎉' },
];

export function FeaturesSection() {
  var rv = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 w-full relative overflow-hidden text-center" ref={rv.ref}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}} className="mb-14">
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">Our Strength</h2>
        </motion.div>

        {/* 4-column grid on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map(function(f, i) {
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={['group p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1',
                  i % 2 === 0 ? 'bg-eerie-3' : 'bg-smoky-3'].join(' ')}>
                <div className="text-5xl lg:text-6xl mb-5 transition-transform duration-500 group-hover:scale-[-1] group-hover:rotate-180">
                  {f.icon}
                </div>
                <h3 className="font-forum text-white text-2xl lg:text-2xl mb-4">{f.title}</h3>
                <p className="text-quick-silver text-sm lg:text-base leading-relaxed">{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Events ────────────────────────────────────────────────────────────────────
export function EventsSection() {
  var rv     = useScrollReveal();
  var result = useEvents();
  var events = result.data || [];

  return (
    <section className="py-24 lg:py-32 w-full bg-smoky-2 relative overflow-hidden" ref={rv.ref}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14">
          <span className="section-subtitle">Recent Updates</span>
          <h2 className="section-title">Upcoming Events</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {result.isLoading
            ? Array.from({ length: 3 }).map(function(_, i) {
                return <div key={i} className="skeleton aspect-[350/450]" />;
              })
            : events.map(function(ev, i) {
                return (
                  <motion.div key={ev._id || ev.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.12 }}>
                    <Link to="/events" className="group relative overflow-hidden card-shine cursor-pointer block">
                      <div className="aspect-[350/450] overflow-hidden">
                        <img src={ev.image} alt={ev.title} loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-overlay" />
                      <div className="absolute top-6 left-6 bg-black px-3 py-1">
                        <time className="text-gold text-xs font-bold tracking-widest">{formatDate(ev.date)}</time>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                        <p className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2">{ev.category}</p>
                        <h3 className="font-forum text-white text-xl leading-snug">{ev.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
        </div>

        <div className="text-center mt-12">
          <Link to="/events" className="btn-grilli inline-flex">View All Events</Link>
        </div>
      </div>
    </section>
  );
}
