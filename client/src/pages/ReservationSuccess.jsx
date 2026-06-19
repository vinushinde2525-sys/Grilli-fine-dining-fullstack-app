import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReservation } from '../hooks/useApi';
import { formatDate } from '../utils/helpers';

export default function ReservationSuccess() {
  var params = useParams();
  var result = useReservation(params.ref);
  var res    = result.data;

  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-24">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18 }}
        className="max-w-md w-full text-center"
      >
        {/* Gold checkmark */}
        <div className="w-20 h-20 border-2 border-gold flex items-center justify-center mx-auto mb-8 rotate-45">
          <div className="text-gold text-3xl -rotate-45">✓</div>
        </div>

        <h1 className="font-forum text-white mb-3" style={{ fontSize: '3rem' }}>
          Table Reserved!
        </h1>
        <p className="text-quick-silver mb-8">
          We look forward to welcoming you at Grilli.
        </p>

        {/* Ref badge */}
        <div className="border border-gold/30 bg-gold/5 p-5 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Reservation Ref</p>
          <p className="font-forum text-gold text-2xl">{params.ref}</p>
        </div>

        {/* Details */}
        {res && (
          <div className="space-y-3 text-sm mb-10 text-left border border-white/10 p-6">
            {[
              { label: 'Name',    value: res.name },
              { label: 'Date',    value: formatDate(res.date) },
              { label: 'Time',    value: res.time },
              { label: 'Persons', value: res.persons },
              { label: 'Status',  value: res.status, gold: true },
            ].map(function(row) {
              return (
                <div key={row.label} className="flex justify-between border-b border-white/5 pb-3 last:border-0">
                  <span className="text-quick-silver uppercase tracking-wider text-xs font-bold">{row.label}</span>
                  <span className={row.gold ? 'text-gold font-bold capitalize' : 'text-white'}>{row.value}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Decorative dots */}
        <div className="flex justify-center gap-1 mb-8">
          {[0,1,2].map(function(i) {
            return <div key={i} className="w-2 h-2 border border-gold rotate-45 animate-rotate" style={{ animationDelay: i * 0.3 + 's' }} />;
          })}
        </div>

        <div className="flex gap-4">
          <Link to="/"    className="btn-grilli flex-1 justify-center py-4">Home</Link>
          <Link to="/menu" className="btn-grilli-solid flex-1 justify-center py-4">View Menu</Link>
        </div>
      </motion.div>
    </div>
  );
}
