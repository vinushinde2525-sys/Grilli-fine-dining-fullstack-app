import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Clock, MapPin, CreditCard } from 'lucide-react';
import { useOrders, useOrder } from '../hooks/useApi';
import { formatCurrency, formatDate } from '../utils/helpers';

var STATUS_STEPS = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];

function StatusBar({ status }) {
  var idx = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-0 mb-8">
      {STATUS_STEPS.map(function(s, i) {
        var done   = i <= idx;
        var active = i === idx;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={'w-8 h-8 flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 ' +
              (active ? 'border-gold bg-gold text-smoky-1' : done ? 'border-gold/50 bg-gold/20 text-gold' : 'border-white/20 text-white/30')}>
              {i + 1}
            </div>
            <p className={'text-[10px] font-bold uppercase tracking-wider hidden sm:block ml-2 ' + (done ? 'text-gold' : 'text-white/30')}>
              {s.replace(/_/g, ' ')}
            </p>
            {i < STATUS_STEPS.length - 1 && (
              <div className={'flex-1 h-px mx-3 ' + (i < idx ? 'bg-gold/40' : 'bg-white/10')} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function OrderHistoryPage() {
  var result = useOrders();
  var orders = (result.data && Array.isArray(result.data.data)) ? result.data.data : [];

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-14 text-center mb-10">
        <span className="section-subtitle">Your History</span>
        <h1 className="section-title">My Orders</h1>
      </div>
      <div className="wrap">
        {result.isLoading ? (
          <div className="space-y-4">{[1,2,3].map(function(i) { return <div key={i} className="skeleton h-20" />; })}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <Package size={56} className="text-gold/30 mx-auto mb-6" />
            <h2 className="font-forum text-white text-3xl mb-4">No orders yet</h2>
            <p className="text-quick-silver mb-8">Your order history will appear here.</p>
            <Link to="/menu" className="btn-grilli inline-flex">Browse Menu</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(function(order, i) {
              var items   = Array.isArray(order.items) ? order.items : [];
              var status  = order.status || 'pending';
              var total   = typeof order.total === 'number' ? order.total : 0;
              var orderId = order.orderId || order.id || ('order-' + i);
              return (
                <motion.div key={orderId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={'/orders/' + orderId}
                    className="block bg-eerie-2 border border-white/5 hover:border-gold/40 transition-all p-5 lg:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-forum text-white text-xl">{orderId}</p>
                        <p className="text-quick-silver text-xs mt-1">{formatDate(order.createdAt)}</p>
                        <p className="text-quick-silver text-xs mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-forum text-gold text-2xl">{formatCurrency(total)}</p>
                        <span className={'inline-block mt-2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest border ' +
                          (status === 'delivered' ? 'border-green-500/40 text-green-400' :
                           status === 'cancelled' ? 'border-red-500/40 text-red-400' : 'border-gold/40 text-gold')}>
                          {status.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function OrderDetailPage() {
  var { orderId } = useParams();
  var result      = useOrder(orderId);
  var order       = result.data;

  if (result.isLoading) {
    return (
      <div className="min-h-screen bg-eerie-1 pt-32 pb-24">
        <div className="wrap space-y-4">{[1,2,3].map(function(i) { return <div key={i} className="skeleton h-24" />; })}</div>
      </div>
    );
  }
  if (!order) {
    return (
      <div className="min-h-screen bg-eerie-1 flex items-center justify-center">
        <div className="text-center">
          <p className="font-forum text-gold text-6xl mb-4">404</p>
          <h2 className="font-forum text-white text-3xl mb-4">Order Not Found</h2>
          <Link to="/orders" className="btn-grilli inline-flex">Back to Orders</Link>
        </div>
      </div>
    );
  }

  // Defensive defaults — every field below is guaranteed non-throwing
  // regardless of what shape the API actually returned.
  var items         = Array.isArray(order.items) ? order.items : [];
  var customer      = order.customer && typeof order.customer === 'object' ? order.customer : {};
  var status        = order.status || 'pending';
  var subtotal      = typeof order.subtotal === 'number' ? order.subtotal : 0;
  var tax           = typeof order.tax === 'number' ? order.tax : 0;
  var deliveryFee   = typeof order.deliveryFee === 'number' ? order.deliveryFee : 0;
  var total         = typeof order.total === 'number' ? order.total : 0;
  var address       = order.address || 'Not specified';
  var paymentMethod = order.paymentMethod || 'COD';
  var paymentStatus = order.paymentStatus || 'pending';
  var estimatedTime = order.estimatedTime || '25-35 min';
  var displayId     = order.orderId || order.id || orderId;

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-14 text-center mb-10">
        <span className="section-subtitle">Order Details</span>
        <h1 className="section-title">{displayId}</h1>
      </div>
      <div className="wrap">
        <Link to="/orders" className="inline-flex items-center gap-2 text-quick-silver text-sm hover:text-gold transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Orders
        </Link>

        {status !== 'cancelled' && <StatusBar status={status} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 bg-eerie-2 border border-white/5 p-6 lg:p-8">
            <h2 className="font-forum text-white text-xl mb-5">Order Items</h2>
            {items.length === 0 ? (
              <p className="text-quick-silver text-sm">No item details available for this order.</p>
            ) : (
              <div className="space-y-4">
                {items.map(function(item, i) {
                  var name     = item && item.name ? item.name : 'Item';
                  var price    = item && typeof item.price === 'number' ? item.price : 0;
                  var quantity = item && typeof item.quantity === 'number' ? item.quantity : 1;
                  return (
                    <div key={i} className="flex gap-4 items-center py-3 border-b border-white/5 last:border-0">
                      {item && item.image && <img src={item.image} alt={name} className="w-14 h-14 object-cover flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-forum text-white">{name}</p>
                        <p className="text-quick-silver text-xs">×{quantity}</p>
                      </div>
                      <p className="text-gold font-bold">{formatCurrency(price * quantity)}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-5 pt-5 border-t border-white/10 space-y-2 text-sm">
              <div className="flex justify-between text-quick-silver"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-quick-silver"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
              <div className="flex justify-between text-quick-silver"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span></div>
              <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                <span>Total</span><span className="font-forum text-gold text-xl">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="space-y-4">
            <div className="bg-eerie-2 border border-white/5 p-6">
              <h3 className="font-forum text-white text-lg mb-4">Customer</h3>
              <p className="text-white text-sm">{customer.name || 'Guest'}</p>
              <p className="text-quick-silver text-xs mt-1">{customer.email || '—'}</p>
              <p className="text-quick-silver text-xs">{customer.phone || '—'}</p>
            </div>
            <div className="bg-eerie-2 border border-white/5 p-6">
              <div className="flex items-start gap-3 mb-3">
                <MapPin size={15} className="text-gold mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Delivery Address</p>
                  <p className="text-quick-silver text-sm">{address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard size={15} className="text-gold" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Payment</p>
                  <p className="text-quick-silver text-sm">{paymentMethod} — {paymentStatus}</p>
                </div>
              </div>
            </div>
            <div className="bg-eerie-2 border border-white/5 p-6">
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-gold" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Estimated</p>
                  <p className="text-quick-silver text-sm">{estimatedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
