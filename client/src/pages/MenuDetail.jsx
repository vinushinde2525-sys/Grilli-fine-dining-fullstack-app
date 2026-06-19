import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Flame, ShoppingBag, Heart, Check } from 'lucide-react';
import { useMenuItem } from '../hooks/useApi';
import { addToCart, openCartDrawer, selectIsInCart } from '../store';
import { toggleWishlist, selectIsWishlisted } from '../store';
import { addRecentlyViewed } from '../store';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function MenuDetail() {
  var params   = useParams();
  var dispatch = useDispatch();
  var result   = useMenuItem(params.id);
  var item     = result.data;

  // Selectors keyed on the actual item id (string _id normalized to id)
  var itemId   = item ? item.id : null;
  var inCart   = useSelector(selectIsInCart(itemId));
  var isWished = useSelector(selectIsWishlisted(itemId));

  useEffect(function() {
    if (item) dispatch(addRecentlyViewed(item.id));
  }, [item]);

  var handleAdd = function() {
    if (!item) return;
    dispatch(addToCart(item));
    dispatch(openCartDrawer());
    toast.success(item.name + ' added to cart!');
  };
  var handleWish = function() {
    if (!item) return;
    dispatch(toggleWishlist(item));
    toast(isWished ? 'Removed from favourites' : 'Saved to favourites');
  };

  if (result.isLoading) {
    return (
      <div className="min-h-screen bg-eerie-1 pt-32 pb-24">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          <div className="skeleton aspect-square" />
          <div className="space-y-5 pt-4">
            {[60,80,40,60,100,40].map(function(w,i) {
              return <div key={i} className="h-6 skeleton" style={{ width: w+'%' }} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  if (result.isError || !item) {
    return (
      <div className="min-h-screen bg-eerie-1 flex items-center justify-center">
        <div className="text-center">
          <p className="font-forum text-gold" style={{ fontSize: '8rem', lineHeight: 1 }}>404</p>
          <h2 className="font-forum text-white text-3xl mb-4">Dish Not Found</h2>
          <Link to="/menu" className="btn-grilli inline-flex">Back to Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24 lg:pb-12">
      <div className="wrap">
        <div className="mb-10">
          <Link to="/menu" className="inline-flex items-center gap-2 text-quick-silver text-sm hover:text-gold transition-colors">
            <ArrowLeft size={14} /> Back to Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
            <div className="aspect-square overflow-hidden w-full">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -inset-3 xl:-inset-5 border border-gold/20 -z-10" />
            {item.badge && (
              <div className="absolute top-6 left-6 bg-gold text-eerie-1 font-bold uppercase tracking-wider text-xs px-5 py-2 font-forum">
                {item.badge}
              </div>
            )}
            <button onClick={handleWish}
              className={'absolute top-6 right-6 w-11 h-11 flex items-center justify-center border-2 transition-all duration-200 ' +
                (isWished ? 'bg-red-500 border-red-500 text-white' : 'border-white/30 bg-black/30 text-white/60 hover:border-gold hover:text-gold')}>
              <Heart size={20} fill={isWished ? 'currentColor' : 'none'} />
            </button>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-6 lg:py-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-gold text-xs font-bold uppercase tracking-widest border border-gold/40 px-4 py-1.5 capitalize">{item.category}</span>
              {item.isVeg && <span className="text-xs font-bold uppercase tracking-wider border border-green-600/50 text-green-500 px-4 py-1.5">Vegetarian</span>}
              {(item.tags || []).map(function(tag) {
                return <span key={tag} className="text-xs font-bold uppercase tracking-wider border border-white/10 text-quick-silver px-3 py-1.5">{tag}</span>;
              })}
            </div>

            <h1 className="font-forum text-white leading-tight" style={{ fontSize: 'clamp(2.6rem, 4vw, 4.5rem)' }}>{item.name}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map(function(_, i) {
                  return <Star key={i} size={18} className={i < Math.floor(item.rating || 4) ? 'text-gold fill-gold' : 'text-white/20'} />;
                })}
              </div>
              <span className="text-white font-bold">{item.rating || 4.5}</span>
              <span className="text-quick-silver text-sm">({item.reviewCount || 0} reviews)</span>
            </div>

            <div className="flex gap-8 py-5 border-y border-white/10">
              {item.prepTime && <div className="flex items-center gap-2.5"><Clock size={16} className="text-gold" /><span className="text-quick-silver">{item.prepTime} min prep</span></div>}
              {item.calories && <div className="flex items-center gap-2.5"><Flame size={16} className="text-gold" /><span className="text-quick-silver">{item.calories} cal</span></div>}
            </div>

            <p className="text-quick-silver leading-relaxed text-base lg:text-lg">{item.description}</p>

            <div className="flex items-baseline gap-5">
              <span className="font-forum text-gold" style={{ fontSize: 'clamp(2.8rem, 4vw, 4rem)' }}>{formatCurrency(item.price)}</span>
              {item.originalPrice && <span className="font-forum text-davys-grey text-2xl line-through">{formatCurrency(item.originalPrice)}</span>}
            </div>

            <div className="flex gap-4 pt-2">
              <button onClick={handleAdd}
                className={'inline-flex items-center justify-center gap-2 flex-1 py-4 text-sm font-bold uppercase tracking-widest border-2 transition-all ' +
                  (inCart ? 'bg-green-700 border-green-700 text-white' : 'bg-gold border-gold text-smoky-1 hover:bg-white hover:border-white')}>
                {inCart ? <><Check size={18}/> In Cart</> : <><ShoppingBag size={18}/> Add to Cart</>}
              </button>
              <button onClick={handleWish}
                className={'w-14 h-14 border-2 flex items-center justify-center transition-all duration-200 ' +
                  (isWished ? 'bg-red-500 border-red-500 text-white' : 'border-white/20 text-white/50 hover:border-gold hover:text-gold')}>
                <Heart size={22} fill={isWished ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex items-start gap-3 p-4 lg:p-5 border border-gold/20 bg-gold/5">
              <span className="text-gold text-xl mt-0.5">✦</span>
              <div>
                <p className="text-white font-semibold text-sm">Dine-in or Order Online</p>
                <p className="text-quick-silver text-xs mt-1">Free delivery on orders above $50 · Est. 30 min</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
