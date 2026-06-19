import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ContactPage() {
  var form = useForm({ defaultValues: { name: '', email: '', subject: '', message: '' } });

  var onSubmit = function(data) {
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    form.reset();
  };

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-16 text-center mb-0">
        <span className="section-subtitle">Get In Touch</span>
        <h1 className="section-title">Contact Us</h1>
      </div>

      <div className="wrap py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="font-forum text-white text-3xl mb-6">Find Us</h2>
              {[
                { icon: <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />, label: 'Address', content: 'Restaurant St, Delicious City, London 9578, UK' },
                { icon: <Phone size={18} className="text-gold mt-0.5 flex-shrink-0" />, label: 'Phone', content: '+88-123-123456' },
                { icon: <Mail size={18} className="text-gold mt-0.5 flex-shrink-0" />, label: 'Email', content: 'booking@grilli.com' },
                { icon: <Clock size={18} className="text-gold mt-0.5 flex-shrink-0" />, label: 'Hours', content: 'Mon–Sun: 09:00 am — 01:00 am' },
              ].map(function(item) {
                return (
                  <div key={item.label} className="flex gap-4 py-5 border-b border-white/10">
                    {item.icon}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{item.label}</p>
                      <p className="text-quick-silver">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 bg-eerie-2 border border-white/5 p-8 lg:p-12">
            <h2 className="font-forum text-white text-2xl lg:text-3xl mb-6">Send a Message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input {...form.register('name', { required: true })} placeholder="Your Name" className="grilli-input" />
                <input {...form.register('email', { required: true })} type="email" placeholder="Email Address" className="grilli-input" />
              </div>
              <input {...form.register('subject')} placeholder="Subject" className="grilli-input" />
              <textarea {...form.register('message', { required: true })} rows={5} placeholder="Your message..." className="grilli-input h-auto py-4 resize-none" />
              <button type="submit" className="btn-grilli-solid inline-flex py-4 px-10 text-sm">Send Message</button>
            </form>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 w-full aspect-[16/5] bg-eerie-3 border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={40} className="text-gold mx-auto mb-3 opacity-40" />
            <p className="text-quick-silver text-sm">Restaurant St, Delicious City, London</p>
          </div>
        </div>
      </div>
    </div>
  );
}
