import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Lock, Edit3, LogOut, ShoppingBag, Calendar } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, updateUser } from '../store/authSlice';
import { useUpdateProfile, useChangePassword, useLogout, useOrders, useReservation } from '../hooks/useApi';
import { formatCurrency, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

var TAB_LIST = ['Profile', 'Orders', 'Reservations', 'Change Password'];

export default function ProfilePage() {
  var [tab, setTab] = useState('Profile');
  var user     = useSelector(selectCurrentUser);
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var logout   = useLogout();

  var handleLogout = function() {
    logout.mutate(undefined, { onSettled: function() { navigate('/'); } });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-14 text-center mb-10">
        <span className="section-subtitle">My Account</span>
        <h1 className="section-title">Profile</h1>
      </div>

      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-eerie-2 border border-white/5 p-6 text-center mb-4">
              <div className="w-20 h-20 bg-gold flex items-center justify-center mx-auto mb-4">
                <span className="font-forum text-smoky-1 text-3xl">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
              </div>
              <h2 className="font-forum text-white text-xl">{user.name}</h2>
              <p className="text-quick-silver text-xs mt-1">{user.email}</p>
              <span className={'inline-block mt-2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest ' +
                (user.role === 'admin' ? 'bg-gold text-smoky-1' : 'border border-white/20 text-quick-silver')}>
                {user.role}
              </span>
            </div>
            <div className="bg-eerie-2 border border-white/5 divide-y divide-white/5">
              {TAB_LIST.map(function(t) {
                return (
                  <button key={t} onClick={function() { setTab(t); }}
                    className={'w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ' +
                      (tab === t ? 'text-gold bg-gold/5' : 'text-quick-silver hover:text-gold')}>
                    {t}
                  </button>
                );
              })}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard"
                  className="flex items-center gap-2 w-full px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-quick-silver hover:text-gold transition-colors">
                  <Edit3 size={13} /> Admin Panel
                </Link>
              )}
              <button onClick={handleLogout}
                className="w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {tab === 'Profile'          && <ProfileTab user={user} dispatch={dispatch} />}
            {tab === 'Orders'           && <OrdersTab />}
            {tab === 'Reservations'     && <ReservationsTab />}
            {tab === 'Change Password'  && <PasswordTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user, dispatch }) {
  var mutation = useUpdateProfile();
  var form = useForm({ defaultValues: { name: user.name || '', phone: user.phone || '', address: user.address || '' } });

  var onSubmit = function(data) {
    mutation.mutate(data, {
      onSuccess: function(res) { dispatch(updateUser(res.user)); },
      onError:   function(err) { toast.error(err.message); },
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-eerie-2 border border-white/5 p-8">
      <h2 className="font-forum text-white text-2xl mb-6">Edit Profile</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="relative">
            <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver" />
            <input {...form.register('name')} placeholder="Full Name" className="grilli-input pl-10" />
          </div>
          <div className="relative">
            <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver" />
            <input {...form.register('phone')} placeholder="Phone Number" className="grilli-input pl-10" />
          </div>
        </div>
        <div className="flex items-center gap-3 py-3 border-y border-white/10">
          <Mail size={14} className="text-quick-silver" />
          <span className="text-quick-silver text-sm">{user.email}</span>
          <span className="text-xs text-white/30 ml-auto">Cannot change email</span>
        </div>
        <div className="relative">
          <MapPin size={14} className="absolute left-4 top-4 text-quick-silver" />
          <textarea {...form.register('address')} placeholder="Delivery address" rows={2} className="grilli-input pl-10 h-auto py-3 resize-none" />
        </div>
        <button type="submit" disabled={mutation.isPending} className="btn-grilli-solid inline-flex py-3 px-8 text-sm">
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </motion.div>
  );
}

function OrdersTab() {
  var result = useOrders();
  var orders = (result.data && result.data.data) || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <h2 className="font-forum text-white text-2xl mb-4 flex items-center gap-2"><ShoppingBag size={20} className="text-gold" /> My Orders</h2>
      {result.isLoading ? <div className="skeleton h-24" /> :
       orders.length === 0 ? (
        <div className="bg-eerie-2 border border-white/5 p-10 text-center">
          <ShoppingBag size={40} className="text-gold/30 mx-auto mb-4" />
          <p className="font-forum text-white text-xl mb-2">No orders yet</p>
          <Link to="/menu" className="btn-grilli inline-flex text-xs mt-4">Browse Menu</Link>
        </div>
       ) : orders.map(function(order) {
        var items   = Array.isArray(order.items) ? order.items : [];
        var total   = typeof order.total === 'number' ? order.total : 0;
        var status  = order.status || 'pending';
        var orderId = order.orderId || order.id;
        return (
          <Link key={orderId} to={'/orders/' + orderId}
            className="block bg-eerie-2 border border-white/5 hover:border-gold/40 p-5 transition-all">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-forum text-white text-lg">{orderId}</p>
                <p className="text-quick-silver text-xs mt-1">{formatDate(order.createdAt)} · {items.length} items</p>
              </div>
              <div className="text-right">
                <p className="font-forum text-gold text-xl">{formatCurrency(total)}</p>
                <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mt-1 inline-block ' +
                  (status === 'delivered' ? 'text-green-400 border border-green-500/30' : 'text-gold border border-gold/30')}>
                  {status}
                </span>
              </div>
            </div>
          </Link>
        );
       })}
    </motion.div>
  );
}

function ReservationsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-eerie-2 border border-white/5 p-8 text-center">
      <Calendar size={40} className="text-gold/30 mx-auto mb-4" />
      <p className="font-forum text-white text-xl mb-2">Reservation History</p>
      <p className="text-quick-silver text-sm mb-6">View and manage your dining reservations</p>
      <Link to="/reservation" className="btn-grilli inline-flex text-sm">Make a Reservation</Link>
    </motion.div>
  );
}

function PasswordTab() {
  var mutation = useChangePassword();
  var form     = useForm({ defaultValues: { currentPassword: '', newPassword: '' } });

  var onSubmit = function(data) {
    mutation.mutate(data, { onError: function(err) { toast.error(err.message); } });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-eerie-2 border border-white/5 p-8">
      <h2 className="font-forum text-white text-2xl mb-6 flex items-center gap-2"><Lock size={18} className="text-gold" /> Change Password</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-md">
        <input {...form.register('currentPassword', { required: true })} type="password" placeholder="Current password" className="grilli-input" />
        <input {...form.register('newPassword', { required: true, minLength: { value: 6, message: 'Min 6 chars' } })}
          type="password" placeholder="New password (min 6 chars)" className="grilli-input" />
        <button type="submit" disabled={mutation.isPending} className="btn-grilli-solid inline-flex py-3 px-8 text-sm">
          {mutation.isPending ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </motion.div>
  );
}
