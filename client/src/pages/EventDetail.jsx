import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEvent } from '../hooks/useApi';
import { formatDate } from '../utils/helpers';

export default function EventDetail() {
  var { id } = useParams();
  var result = useEvent(id);
  var event  = result.data;

  if (result.isLoading) {
    return (
      <div className="min-h-screen bg-eerie-1 pt-28 pb-24">
        <div className="wrap max-w-3xl mx-auto space-y-4">
          <div className="skeleton h-80" />
          <div className="skeleton h-8 w-2/3" />
          <div className="skeleton h-4 w-full" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-eerie-1 flex items-center justify-center">
        <div className="text-center">
          <p className="font-forum text-gold text-6xl mb-4">404</p>
          <h2 className="font-forum text-white text-3xl mb-4">Event Not Found</h2>
          <Link to="/events" className="btn-grilli inline-flex">All Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="wrap max-w-4xl mx-auto">
        <Link to="/events" className="inline-flex items-center gap-2 text-quick-silver hover:text-gold transition-colors mb-8 text-sm">
          <ArrowLeft size={14} /> All Events
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-[16/7] overflow-hidden mb-8">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
            <div className="absolute bottom-0 left-0 p-6 flex items-center gap-3">
              <Calendar size={14} className="text-gold" />
              <time className="text-gold text-sm font-bold tracking-widest">{formatDate(event.date)}</time>
              <span className="text-white/40 text-xs mx-2">·</span>
              <span className="text-white/60 text-xs uppercase tracking-widest">{event.category}</span>
            </div>
          </div>

          <h1 className="section-title mb-6">{event.title}</h1>
          <p className="text-quick-silver leading-relaxed text-lg mb-10">{event.description || 'Join us for this special evening of culinary excellence. Reserve your spot early to avoid disappointment.'}</p>

          <div className="flex gap-4">
            <Link to="/reservation" className="btn-grilli-solid inline-flex px-10 py-4 text-sm">Book a Table</Link>
            <Link to="/events" className="btn-grilli inline-flex px-10 py-4 text-sm">All Events</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
