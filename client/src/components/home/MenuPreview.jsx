import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useMenu } from '../../hooks/useApi';
import { addToCart, openCartDrawer, selectIsInCart } from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import toast from 'react-hot-toast';

function MenuRow({ item, index, isVisible }) {
  var dispatch = useDispatch();
  var inCart   = useSelector(selectIsInCart(item.id || item._id));

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div className="group flex items-center gap-5 py-3 px-4 -mx-4 hover:bg-white/5 transition-colors rounded cursor-pointer">
        {/* Thumbnail */}
        <Link to={'/menu/' + (item.id || item._id)} className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-eerie-4">
            <img src={item.image} alt={item.name} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-70" />
          </div>
        </Link>

        {/* Name + dotted line + price */}
        <div className="flex-1 min-w-0 flex items-center gap-3 flex-wrap">
          <Link to={'/menu/' + (item.id || item._id)}
            className="font-forum text-white text-xl lg:text-2xl hover:text-gold transition-colors">
            {item.name}
          </Link>
          {item.badge && (
            <span className="bg-gold text-eerie-1 text-[9px] font-bold uppercase px-2 py-0.5 font-forum">{item.badge}</span>
          )}
          <span className="flex-1 flex items-center gap-3 text-gold font-forum text-lg lg:text-xl min-w-0">
            <span className="flex-1 h-px border-t border-white/10" />
            {formatCurrency(item.price)}
          </span>
        </div>

        {/* Cart button */}
        <button
          onClick={function() { dispatch(addToCart(item)); dispatch(openCartDrawer()); toast.success(item.name + ' added!'); }}
          className={'flex-shrink-0 w-9 h-9 lg:w-10 lg:h-10 border flex items-center justify-center transition-all ' +
            (inCart
              ? 'border-green-600 text-green-500 bg-green-900/20'
              : 'border-gold/30 text-gold hover:bg-gold hover:text-smoky-1')}
        >
          <ShoppingBag size={14} />
        </button>
      </div>
    </motion.li>
  );
}

export default function MenuPreview() {
  var rv     = useScrollReveal();
  var result = useMenu({ limit: 6 });
  var items  = result.data || [];

  return (
    <section className="py-24 lg:py-32 w-full relative overflow-hidden" id="menu" ref={rv.ref}>
      {/* Subtle diagonal grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, hsl(38,61%,73%) 0, hsl(38,61%,73%) 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />

      <div className="wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16"
        >
          <div>
            <span className="section-subtitle">Special Selection</span>
            <h2 className="section-title">Delicious Menu</h2>
          </div>
          <Link to="/menu" className="text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors inline-flex items-center gap-2 self-start sm:self-auto">
            View Full Menu <ArrowRight size={14} />
          </Link>
        </motion.div>

        {result.isLoading ? (
          /* Skeleton — 2 columns */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-3">
            {Array.from({ length: 6 }).map(function(_, i) {
              return (
                <div key={i} className="flex gap-5 py-3">
                  <div className="w-20 h-20 skeleton rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-2 pt-2">
                    <div className="h-5 skeleton w-3/4" />
                    <div className="h-3 skeleton w-1/2" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Two-column list on lg+ */
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-1">
            {items.map(function(item, i) {
              return <MenuRow key={item.id || item._id} item={item} index={i} isVisible={rv.isVisible} />;
            })}
          </ul>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={rv.isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-quick-silver text-sm lg:text-base mt-12 mb-10"
        >
          Dinner service nightly from{' '}
          <span className="text-gold font-bold">6:00 pm</span> to{' '}
          <span className="text-gold font-bold">10:00 pm</span>
        </motion.p>

        <div className="text-center">
          <Link to="/menu" className="btn-grilli inline-flex">View All Menu</Link>
        </div>
      </div>
    </section>
  );
}
