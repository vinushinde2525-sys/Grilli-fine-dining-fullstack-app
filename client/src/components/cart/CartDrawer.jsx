import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import {
  selectCartItems, selectCartSubtotal, selectCartTax,
  selectDeliveryFee, selectCartTotal, selectIsDrawerOpen,
  closeCartDrawer, increaseQty, decreaseQty, removeFromCart, clearCart,
} from '../../store';
import { selectIsAuth } from '../../store/authSlice';
import { formatCurrency } from '../../utils/helpers';

export default function CartDrawer() {
  var dispatch  = useDispatch();
  var navigate  = useNavigate();
  var items     = useSelector(selectCartItems);
  var subtotal  = useSelector(selectCartSubtotal);
  var tax       = useSelector(selectCartTax);
  var delivery  = useSelector(selectDeliveryFee);
  var total     = useSelector(selectCartTotal);
  var isOpen    = useSelector(selectIsDrawerOpen);
  var isAuth    = useSelector(selectIsAuth);

  var handleCheckout = function() {
    dispatch(closeCartDrawer());
    if (!isAuth) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={function() { dispatch(closeCartDrawer()); }}
            className="fixed inset-0 bg-black/80 z-[70]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-smoky-1 z-[80] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold" />
                <h2 className="font-forum text-white text-2xl">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-gold text-smoky-1 text-[10px] font-black min-w-[20px] h-5 px-1 flex items-center justify-center">
                    {items.reduce(function(t, i) { return t + i.quantity; }, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={function() { dispatch(closeCartDrawer()); }}
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag size={48} className="text-gold/20 mb-4" />
                  <p className="font-forum text-white text-2xl mb-2">Empty Cart</p>
                  <p className="text-quick-silver text-sm mb-8">Your cart is empty. Add some dishes!</p>
                  <button
                    onClick={function() { dispatch(closeCartDrawer()); navigate('/menu'); }}
                    className="btn-grilli inline-flex text-xs px-8 py-3"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(function(item) {
                    var itemId = item.id || item._id;
                    return (
                      <motion.div
                        key={itemId}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 py-4 border-b border-white/5"
                      >
                        {/* Image */}
                        <div className="w-18 h-18 flex-shrink-0 overflow-hidden" style={{ width: '72px', height: '72px' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={function(e) {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop';
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-forum text-white leading-tight truncate">{item.name}</p>
                          <p className="text-gold text-sm font-bold mt-0.5">{formatCurrency(item.price)}</p>

                          {/* Qty controls */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={function() { dispatch(decreaseQty(itemId)); }}
                              className="w-7 h-7 border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-white font-bold w-5 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={function() { dispatch(increaseQty(itemId)); }}
                              className="w-7 h-7 border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Item total + remove */}
                        <div className="flex flex-col items-end justify-between flex-shrink-0">
                          <button
                            onClick={function() { dispatch(removeFromCart(itemId)); }}
                            className="text-white/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <p className="font-forum text-white text-lg">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer totals + checkout */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-3 flex-shrink-0 bg-eerie-1">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-quick-silver">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-quick-silver">
                    <span>Tax (5%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-quick-silver">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-400 font-bold' : ''}>
                      {delivery === 0 ? 'FREE' : formatCurrency(delivery)}
                    </span>
                  </div>
                  {delivery === 0 && subtotal > 0 && (
                    <p className="text-green-400 text-[10px]">✓ Free delivery on orders over $50</p>
                  )}
                </div>

                <div className="flex justify-between items-center py-3 border-t border-white/10">
                  <span className="font-forum text-white text-lg">Total</span>
                  <span className="font-forum text-gold text-2xl">{formatCurrency(total)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-grilli-solid w-full justify-center py-4 text-sm inline-flex gap-2"
                >
                  Checkout <ArrowRight size={15} />
                </button>

                <button
                  onClick={function() { dispatch(closeCartDrawer()); navigate('/menu'); }}
                  className="w-full text-center text-xs text-quick-silver hover:text-gold transition-colors py-1"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={function() { dispatch(clearCart()); }}
                  className="w-full text-center text-[10px] text-white/20 hover:text-red-400 transition-colors uppercase tracking-widest py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
