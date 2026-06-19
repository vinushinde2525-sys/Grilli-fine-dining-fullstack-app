import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrder } from '../hooks/useApi';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function OrderSuccess() {
  var params = useParams();
  var result = useOrder(params.orderId);
  var order  = result.data;

  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-24 pb-24 lg:pb-12">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18 }}
        className="max-w-lg w-full text-center"
      >
        {/* Gold check */}
        <div className="w-20 h-20 border-2 border-gold flex items-center justify-center mx-auto mb-8 rotate-45">
          <div className="text-gold text-3xl -rotate-45">✓</div>
        </div>

        <h1 className="font-forum text-white mb-2" style={{ fontSize: '3.2rem' }}>Order Confirmed!</h1>
        <p className="text-quick-silver mb-8">Your food is being prepared with love.</p>

        {/* Order ID */}
        <div className="border border-gold/30 bg-gold/5 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Order Reference</p>
          <p className="font-forum text-gold text-2xl">{params.orderId}</p>
        </div>

        {/* Estimated time */}
        <div className="flex justify-center gap-3 mb-8">
          <div className="border border-white/10 bg-eerie-2 px-6 py-4 text-center">
            <p className="font-forum text-gold text-3xl">30</p>
            <p className="text-quick-silver text-xs uppercase tracking-widest mt-1">Minutes</p>
          </div>
          <div className="border border-white/10 bg-eerie-2 px-6 py-4 text-center">
            <p className="font-forum text-gold text-3xl">Est.</p>
            <p className="text-quick-silver text-xs uppercase tracking-widest mt-1">Prep Time</p>
          </div>
        </div>

        {/* Order details */}
        {order && (
          <div className="border border-white/10 bg-eerie-2 p-6 text-left mb-8 space-y-3">
            <h3 className="font-forum text-white text-lg mb-4">Order Details</h3>
            {order.items && order.items.map(function(item) {
              return (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-white/5">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-quick-silver text-xs">x{item.quantity}</p>
                  </div>
                  <p className="text-gold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              );
            })}
            <div className="flex justify-between pt-3 font-bold text-white border-t border-white/10">
              <span>Total Paid</span>
              <span className="font-forum text-gold text-xl">{order.total && formatCurrency(order.total)}</span>
            </div>
            <div className="text-quick-silver text-xs space-y-1 pt-2">
              <p>Payment: <span className="text-white">{order.paymentMethod}</span></p>
              <p>Type: <span className="text-white capitalize">{order.orderType}</span></p>
              {order.address && <p>Deliver to: <span className="text-white">{order.address}</span></p>}
            </div>
          </div>
        )}

        {/* Decorative dots */}
        <div className="flex justify-center gap-1 mb-8">
          {[0,1,2].map(function(i) {
            return <div key={i} className="w-2 h-2 border border-gold rotate-45 animate-rotate" style={{ animationDelay: i * 0.3 + 's' }} />;
          })}
        </div>

        <div className="flex gap-4">
          <Link to="/orders" className="btn-grilli flex-1 justify-center py-4 text-xs inline-flex">My Orders</Link>
          <Link to="/menu"   className="btn-grilli-solid flex-1 justify-center py-4 text-xs inline-flex">Order More</Link>
        </div>
      </motion.div>
    </div>
  );
}
