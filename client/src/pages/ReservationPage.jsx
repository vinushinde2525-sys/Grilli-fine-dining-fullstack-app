import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useCreateReservation } from '../hooks/useApi';
import toast from 'react-hot-toast';

var PERSONS = ['1 Person','2 Persons','3 Persons','4 Persons','5 Persons','6 Persons','7+ Persons'];
var TIMES   = [
  '08:00 am','09:00 am','10:00 am','11:00 am','12:00 pm',
  '01:00 pm','02:00 pm','05:00 pm','06:00 pm','07:00 pm','08:00 pm','09:00 pm','10:00 pm',
];

export default function ReservationPage() {
  var navigate = useNavigate();
  var mutation = useCreateReservation();
  var form     = useForm({
    defaultValues: { name: '', phone: '', email: '', persons: '2 Persons', date: '', time: '07:00 pm', message: '' },
  });
  var errors = form.formState.errors;

  var onSubmit = function(data) {
    mutation.mutate(data, {
      onSuccess: function(res) {
        toast.success('Table booked! Ref: ' + res.data.refId);
        navigate('/reservation/success/' + res.data.refId);
      },
      onError: function(err) {
        toast.error(err.message || 'Booking failed. Please try again.');
      },
    });
  };

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24 lg:pb-12">

      {/* Full-bleed header */}
      <div className="w-full bg-smoky-1 py-16 lg:py-20 text-center mb-0">
        <span className="section-subtitle">Book Your Experience</span>
        <h1 className="section-title">Reserve A Table</h1>
      </div>

      {/* Form panel — no gap with header, bleeds wider */}
      <div className="wrap py-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 -mt-2">

          {/* ── Form (takes 2/3 width on lg) ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-eerie-2 p-8 lg:p-14 xl:p-16"
          >
            <h2 className="font-forum text-white text-2xl lg:text-3xl mb-3">Online Reservation</h2>
            <p className="text-quick-silver text-sm mb-8">
              Booking request{' '}
              <a href="tel:+88123123456" className="text-gold hover:text-white transition-colors">+88-123-123456</a>
              {' '}or fill out the form below.
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input {...form.register('name', { required: 'Name is required' })}
                    placeholder="Your Name" className="grilli-input" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...form.register('phone', { required: 'Phone is required' })}
                    placeholder="Phone Number" type="tel" className="grilli-input" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <input {...form.register('email')}
                placeholder="Email (optional)" type="email" className="grilli-input" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <select {...form.register('persons')} className="grilli-input cursor-pointer">
                  {PERSONS.map(function(p) { return <option key={p} value={p}>{p}</option>; })}
                </select>
                <div>
                  <input {...form.register('date', { required: 'Date is required' })}
                    type="date" className="grilli-input"
                    min={new Date().toISOString().split('T')[0]} />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                </div>
                <select {...form.register('time', { required: 'Time is required' })} className="grilli-input cursor-pointer">
                  {TIMES.map(function(t) { return <option key={t} value={t}>{t}</option>; })}
                </select>
              </div>

              <textarea {...form.register('message')} placeholder="Special requests or message..."
                rows={4} className="grilli-input h-auto py-4 resize-none" />

              <button type="submit" disabled={mutation.isPending}
                className="btn-grilli-solid w-full justify-center py-5 text-sm inline-flex">
                {mutation.isPending ? 'Booking...' : 'Book A Table'}
              </button>
            </form>
          </motion.div>

          {/* ── Contact sidebar (1/3 width on lg) ────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-smoky-1 p-8 lg:p-12 xl:p-14 text-center"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, hsla(38,61%,73%,0.07), transparent 70%)' }}
          >
            <h2 className="font-forum text-white text-2xl lg:text-3xl mb-8">Contact Us</h2>

            {[
              { label: 'Booking Request',
                content: <a href="tel:+88123123456" className="font-forum text-2xl lg:text-3xl text-gold hover-gold block">+88-123-123456</a> },
              { label: 'Location',
                content: <address className="text-quick-silver text-sm leading-relaxed not-italic">Restaurant St,<br />Delicious City, London</address> },
              { label: 'Lunch Time',
                content: <p className="text-quick-silver text-sm">Mon–Sun · 11:00 am — 2:30 pm</p> },
              { label: 'Dinner Time',
                content: <p className="text-quick-silver text-sm">Mon–Sun · 05:00 pm — 10:00 pm</p> },
            ].map(function(item, i) {
              return (
                <div key={i} className={i > 0 ? 'mt-8 pt-8 border-t border-white/10' : ''}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{item.label}</p>
                  {item.content}
                </div>
              );
            })}

            <div className="flex justify-center gap-1 mt-10">
              {[0,1,2].map(function(i) {
                return <div key={i} className="w-2 h-2 border border-gold rotate-45 animate-rotate" style={{ animationDelay: i*0.3+'s' }} />;
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
