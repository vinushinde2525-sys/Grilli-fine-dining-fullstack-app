import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { selectWishlistItems, removeFromWishlist, addToCart, openCartDrawer } from '../store';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  var dispatch = useDispatch();
  var items    = useSelector(selectWishlistItems);

  var handleAdd = function(item) {
    dispatch(addToCart(item));
    dispatch(openCartDrawer());
    toast.success(item.name + ' added to cart!');
  };

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24 lg:pb-12">

      {/* Full-bleed header */}
      <div className="w-full bg-smoky-1 py-16 lg:py-20 text-center mb-10">
        <span className="section-subtitle">My Favourites</span>
        <h1 className="section-title flex items-center justify-center gap-4">
          Wishlist <Heart className="text-red-500 fill-red-500" size={36} />
        </h1>
        <p className="text-quick-silver mt-2 text-sm">
          {items.length} saved {items.length === 1 ? 'dish' : 'dishes'}
        </p>
      </div>

      <div className="wrap">
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-28 gap-5">
              <Heart size={80} className="text-gold/15" />
              <h3 className="font-forum text-white text-3xl lg:text-4xl">Nothing saved yet</h3>
              <p className="text-quick-silver text-center max-w-sm text-base">
                Tap the heart on any dish to save it here for later.
              </p>
              <Link to="/menu" className="btn-grilli inline-flex mt-2">Browse Menu</Link>
            </motion.div>
          ) : (
            /* 5-column grid on 2xl, 4 on xl, 3 on lg, 2 on sm */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {items.map(function(item, i) {
                return (
                  <motion.div
                    key={item.id} layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-eerie-2 border border-white/5 hover:border-gold/30 transition-all group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.name} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={function() { dispatch(removeFromWishlist(item.id)); toast('Removed from favourites'); }}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500/90 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-gold text-eerie-1 text-[9px] font-bold uppercase px-2.5 py-0.5 font-forum">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-4 lg:p-5">
                      <Link to={'/menu/' + item.id}>
                        <h3 className="font-forum text-white text-lg hover:text-gold transition-colors mb-1 leading-snug">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-quick-silver text-xs mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-forum text-gold text-xl">{formatCurrency(item.price)}</span>
                        <button onClick={function() { handleAdd(item); }}
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-smoky-1 transition-all">
                          <ShoppingBag size={12} /> Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
