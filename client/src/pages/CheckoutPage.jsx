import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Package } from 'lucide-react';
import {
  selectCartItems, selectCartSubtotal, selectCartTax,
  selectDeliveryFee, selectCartTotal, clearCart,
} from '../store';
import { useCreateOrder } from '../hooks/useApi';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

var PAYMENT_METHODS = [
  { id: 'COD',  label: 'Cash on Delivery', icon: '💵' },
  { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'UPI',  label: 'UPI / Online', icon: '📱' },
];

export default function CheckoutPage() {
  var navigate = useNavigate();
  var dispatch = useDispatch();
  var items    = useSelector(selectCartItems);
  var subtotal = useSelector(selectCartSubtotal);
  var tax      = useSelector(selectCartTax);
  var delivery = useSelector(selectDeliveryFee);
  var total    = useSelector(selectCartTotal);
  var mutation = useCreateOrder();

  var form = useForm({
    defaultValues: {
      name: '', email: '', phone: '', address: '', city: '', pincode: '',
      orderType: 'delivery', paymentMethod: 'COD',
    },
  });
  var errors  = form.formState.errors;
  var watched = form.watch();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-eerie-1 flex items-center justify-center">
        <div className="text-center">
          <p className="font-forum text-gold mb-4" style={{ fontSize: '6rem', lineHeight: 1 }}>∅</p>
          <h2 className="font-forum text-white text-3xl mb-4">Cart is empty</h2>
          <Link to="/menu" className="btn-grilli inline-flex">Browse Menu</Link>
        </div>
      </div>
    );
  }

  var onSubmit = function(data) {
    mutation.mutate({
      items: items.map(function(i) {
        return { id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image };
      }),
      customer:      { name: data.name, email: data.email, phone: data.phone },
      address:       data.orderType === 'delivery'
        ? (data.address + ', ' + data.city + ' ' + data.pincode).trim()
        : 'Pickup from restaurant',
      orderType:     data.orderType,
      paymentMethod: data.paymentMethod,
      subtotal, tax, deliveryFee: delivery, total,
    }, {
      onSuccess: function(res) {
        dispatch(clearCart());
        toast.success('Order placed! Ref: ' + res.data.orderId);
        navigate('/order-success/' + res.data.orderId);
      },
      onError: function(err) { toast.error(err.message || 'Order failed.'); },
    });
  };

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24 lg:pb-12">
      <div className="w-full bg-smoky-1 py-14 lg:py-16 text-center mb-10">
        <span className="section-subtitle">Secure Checkout</span>
        <h1 className="section-title">Complete Your Order</h1>
      </div>

      <div className="wrap">
        <Link to="/menu" className="inline-flex items-center gap-2 text-quick-silver text-sm hover:text-gold transition-colors mb-8">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">

            {/* ── Forms (3/5) ──────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Customer Info */}
              <div className="bg-eerie-2 border border-white/5 p-6 lg:p-8">
                <h2 className="font-forum text-white text-xl lg:text-2xl mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-gold" /> Customer Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input {...form.register('name', { required: 'Name required' })}
                      placeholder="Full Name" className="grilli-input text-sm" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...form.register('phone', { required: 'Phone required' })}
                      placeholder="Phone Number" type="tel" className="grilli-input text-sm" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <input {...form.register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                      placeholder="Email Address" type="email" className="grilli-input text-sm" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
              </div>

              {/* Order Type */}
              <div className="bg-eerie-2 border border-white/5 p-6 lg:p-8">
                <h2 className="font-forum text-white text-xl lg:text-2xl mb-5 flex items-center gap-2">
                  <Package size={18} className="text-gold" /> Order Type
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[{ id: 'delivery', label: 'Home Delivery', icon: '🛵' }, { id: 'pickup', label: 'Pickup', icon: '🏃' }].map(function(ot) {
                    return (
                      <label key={ot.id}
                        className={'flex items-center gap-3 p-4 border-2 cursor-pointer transition-all ' +
                          (watched.orderType === ot.id ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/30')}>
                        <input type="radio" value={ot.id} {...form.register('orderType')} className="hidden" />
                        <span className="text-2xl">{ot.icon}</span>
                        <span className={'font-bold text-sm ' + (watched.orderType === ot.id ? 'text-gold' : 'text-white')}>{ot.label}</span>
                      </label>
                    );
                  })}
                </div>
                {watched.orderType === 'delivery' && (
                  <div className="space-y-3">
                    <input {...form.register('address', { required: 'Address required' })}
                      placeholder="Street Address" className="grilli-input text-sm" />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                    <div className="grid grid-cols-2 gap-3">
                      <input {...form.register('city')} placeholder="City" className="grilli-input text-sm" />
                      <input {...form.register('pincode')} placeholder="Zip / Pincode" className="grilli-input text-sm" />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="bg-eerie-2 border border-white/5 p-6 lg:p-8">
                <h2 className="font-forum text-white text-xl lg:text-2xl mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(function(pm) {
                    return (
                      <label key={pm.id}
                        className={'flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ' +
                          (watched.paymentMethod === pm.id ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/20')}>
                        <input type="radio" value={pm.id} {...form.register('paymentMethod')} className="hidden" />
                        <div className={'w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ' +
                          (watched.paymentMethod === pm.id ? 'border-gold bg-gold' : 'border-white/30')}>
                          {watched.paymentMethod === pm.id && <div className="w-2 h-2 bg-smoky-1" />}
                        </div>
                        <span className="text-xl">{pm.icon}</span>
                        <span className={'text-sm font-medium ' + (watched.paymentMethod === pm.id ? 'text-gold' : 'text-white')}>{pm.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Summary (2/5) ─────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-eerie-2 border border-white/5 p-6 lg:p-8 sticky top-28">
                <h2 className="font-forum text-white text-xl lg:text-2xl mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                  {items.map(function(item) {
                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{item.name}</p>
                          <p className="text-quick-silver text-xs">×{item.quantity}</p>
                        </div>
                        <p className="text-gold text-sm font-bold flex-shrink-0">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 text-sm border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between text-quick-silver"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className="flex justify-between text-quick-silver"><span>Tax (5%)</span><span>{formatCurrency(tax)}</span></div>
                  <div className="flex justify-between text-quick-silver">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-400 font-semibold' : ''}>
                      {delivery === 0 ? 'FREE' : formatCurrency(delivery)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="font-forum text-gold text-xl">{formatCurrency(total)}</span>
                  </div>
                </div>

                <button type="submit" disabled={mutation.isPending}
                  className="btn-grilli-solid w-full justify-center py-4 text-sm inline-flex">
                  {mutation.isPending ? 'Placing Order...' : ('Place Order — ' + formatCurrency(total))}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
