import { motion } from 'framer-motion';
import { Bell, BellOff, Check } from 'lucide-react';
import { useNotifications } from '../hooks/useApi';
import { contentApi } from '../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  var result = useNotifications();
  var qc     = useQueryClient();
  var notes  = result.data || [];

  var markAllRead = function() {
    contentApi.markNotifRead().then(function() {
      qc.invalidateQueries(['notifications']);
      toast.success('All marked as read');
    });
  };

  var unread = notes.filter(function(n) { return !n.isRead; }).length;

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-14 text-center mb-10">
        <span className="section-subtitle">Stay Updated</span>
        <h1 className="section-title">Notifications</h1>
      </div>
      <div className="wrap max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="text-quick-silver text-sm">{unread > 0 ? unread + ' unread' : 'All caught up'}</p>
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 text-xs text-gold hover:text-white transition-colors font-bold uppercase tracking-widest">
              <Check size={13} /> Mark all read
            </button>
          )}
        </div>

        {result.isLoading ? (
          <div className="space-y-3">{[1,2,3].map(function(i) { return <div key={i} className="skeleton h-16" />; })}</div>
        ) : notes.length === 0 ? (
          <div className="text-center py-24">
            <BellOff size={48} className="text-gold/30 mx-auto mb-5" />
            <h2 className="font-forum text-white text-2xl mb-3">No notifications</h2>
            <p className="text-quick-silver text-sm">You're all caught up! Order or make a reservation to get updates.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map(function(note, i) {
              return (
                <motion.div key={note._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={'flex gap-4 p-5 border transition-all ' +
                    (note.isRead ? 'bg-eerie-2 border-white/5' : 'bg-gold/5 border-gold/20')}>
                  <Bell size={16} className={'mt-0.5 flex-shrink-0 ' + (note.isRead ? 'text-quick-silver' : 'text-gold')} />
                  <div className="flex-1 min-w-0">
                    <p className={'text-sm font-bold ' + (note.isRead ? 'text-white/70' : 'text-white')}>{note.title}</p>
                    <p className="text-quick-silver text-xs mt-1 leading-relaxed">{note.message}</p>
                    <p className="text-white/30 text-xs mt-2">{formatDate(note.createdAt)}</p>
                  </div>
                  {!note.isRead && <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0 mt-1" />}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
