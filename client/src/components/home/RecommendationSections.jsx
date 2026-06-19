import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Heart } from 'lucide-react';
import { usePopularDishes, useRecommended, useMenu } from '../../hooks/useApi';
import { selectRecentIds, addToCart, openCartDrawer, toggleWishlist, selectIsWishlisted } from '../../store';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

function DishCard({ item }) {
  var dispatch = useDispatch();
  var isWished = useSelector(selectIsWishlisted(item.id || item._id));

  return (
    <motion.div whileHover={{ y: -5 }} className="group flex-shrink-0 w-60 lg:w-64">
      <Link to={'/menu/' + (item.id || item._id)} className="block">
        <div className="bg-eerie-2 border border-white/5 group-hover:border-gold/40 transition-all overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={item.image} alt={item.name} loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {item.badge && (
              <span className="absolute top-3 left-3 bg-gold text-eerie-1 text-[9px] font-bold uppercase px-2 py-0.5">{item.badge}</span>
            )}
            <button
              onClick={function(e) { e.preventDefault(); dispatch(toggleWishlist(item)); toast(isWished ? 'Removed' : 'Saved!'); }}
              className={'absolute top-3 right-3 w-7 h-7 flex items-center justify-center transition-all backdrop-blur-sm ' +
                (isWished ? 'text-red-400 bg-black/50' : 'text-white/40 hover:text-gold bg-black/30')}>
              <Heart size={13} fill={isWished ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="p-4">
            <p className="font-forum text-white text-base group-hover:text-gold transition-colors leading-snug truncate mb-2">{item.name}</p>
            <div className="flex items-center justify-between">
              <span className="font-forum text-gold">{formatCurrency(item.price)}</span>
              <button
                onClick={function(e) { e.preventDefault(); dispatch(addToCart(item)); dispatch(openCartDrawer()); toast.success('Added!'); }}
                className="w-8 h-8 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-smoky-1 transition-all">
                <ShoppingBag size={13} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Popular ───────────────────────────────────────────────────────────────────
export function PopularSection() {
  var rv     = useScrollReveal();
  var result = usePopularDishes();
  var items  = result.data || [];

  return (
    <section className="py-20 lg:py-28 w-full bg-smoky-2 overflow-hidden" ref={rv.ref}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-10">
          <div>
            <span className="section-subtitle">Crowd Favourites</span>
            <h2 className="section-title flex items-center gap-3">
              Most Popular <TrendingUp className="text-gold" size={32} />
            </h2>
          </div>
          <Link to="/menu?sort=popular" className="text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors hidden sm:block">
            View All →
          </Link>
        </motion.div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {result.isLoading
            ? Array.from({ length: 6 }).map(function(_, i) { return <div key={i} className="skeleton flex-shrink-0 w-60 h-60" />; })
            : items.map(function(item) { return <DishCard key={item.id || item._id} item={item} />; })
          }
        </div>
      </div>
    </section>
  );
}

// ── Chef Recommendations ──────────────────────────────────────────────────────
export function RecommendedSection() {
  var rv     = useScrollReveal();
  var result = useRecommended();
  var items  = result.data || [];

  return (
    <section className="py-20 lg:py-28 w-full bg-eerie-1 overflow-hidden" ref={rv.ref}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-10">
          <div>
            <span className="section-subtitle">Curated for You</span>
            <h2 className="section-title flex items-center gap-3">
              Chef Recommendations <span className="text-3xl">👨‍🍳</span>
            </h2>
          </div>
          <Link to="/menu" className="text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors hidden sm:block">
            View All →
          </Link>
        </motion.div>

        {/* Grid — 2 on md, 4 on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {result.isLoading
            ? Array.from({ length: 4 }).map(function(_, i) { return <div key={i} className="skeleton aspect-[4/3]" />; })
            : items.map(function(item, i) {
                return (
                  <motion.div key={item.id || item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}>
                    <DishCard item={item} />
                  </motion.div>
                );
              })
          }
        </div>
      </div>
    </section>
  );
}

// ── Recently Viewed ───────────────────────────────────────────────────────────
export function RecentlyViewedSection() {
  var rv       = useScrollReveal();
  var ids      = useSelector(selectRecentIds);
  var result   = useMenu({});
  var allItems = result.data || [];
  var items    = ids.map(function(id) {
    return allItems.find(function(i) { return i.id === id; });
  }).filter(Boolean).slice(0, 8);

  if (!items.length) return null;

  return (
    <section className="py-16 w-full bg-smoky-2 overflow-hidden" ref={rv.ref}>
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}} className="mb-8">
          <span className="section-subtitle">Back for More?</span>
          <h2 className="section-title">Recently Viewed</h2>
        </motion.div>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
          {items.map(function(item) { return <DishCard key={item.id || item._id} item={item} />; })}
        </div>
      </div>
    </section>
  );
}
