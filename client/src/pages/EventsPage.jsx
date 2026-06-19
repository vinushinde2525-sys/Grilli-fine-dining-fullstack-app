import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useEvents } from '../hooks/useApi';
import { formatDate } from '../utils/helpers';

export default function EventsPage() {
  var result = useEvents();
  var events = result.data || [];

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-16 lg:py-20 text-center mb-14">
        <span className="section-subtitle">Recent Updates</span>
        <h1 className="section-title">Upcoming Events</h1>
      </div>

      <div className="wrap">
        {result.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1,2,3].map(function(i) { return <div key={i} className="skeleton aspect-[350/450]" />; })}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-forum text-white text-2xl mb-4">No events currently scheduled</p>
            <p className="text-quick-silver mb-8">Check back soon for upcoming events.</p>
            <Link to="/" className="btn-grilli inline-flex">Back to Home</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map(function(ev, i) {
              return (
                <motion.div
                  key={ev.id || ev._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={'/events/' + (ev.id || ev._id)}
                    className="group relative overflow-hidden card-shine cursor-pointer block h-full"
                  >
                    <div className="aspect-[350/450] overflow-hidden">
                      <img
                        src={ev.image} alt={ev.title} loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-overlay" />
                    <div className="absolute top-6 left-6 bg-black/80 px-3 py-1 flex items-center gap-2">
                      <Calendar size={11} className="text-gold" />
                      <time className="text-gold text-xs font-bold tracking-widest">{formatDate(ev.date)}</time>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2">{ev.category}</p>
                      <h3 className="font-forum text-white text-xl leading-snug mb-3">{ev.title}</h3>
                      <span className="inline-flex items-center gap-1 text-white/50 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read More <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/reservation" className="btn-grilli-solid inline-flex px-12 py-4 text-sm">
            Book For An Event
          </Link>
        </div>
      </div>
    </div>
  );
}
