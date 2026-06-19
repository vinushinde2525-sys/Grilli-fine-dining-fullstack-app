import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingBag, Heart, Star, X, ChevronDown } from 'lucide-react';
import { useMenu, useMenuCategories } from '../hooks/useApi';
import { addToCart, openCartDrawer, selectIsInCart } from '../store';
import { toggleWishlist, selectIsWishlisted } from '../store';
import { formatCurrency, truncate } from '../utils/helpers';
import toast from 'react-hot-toast';

var SORT_OPTIONS = [
  { value: 'default',    label: 'Featured'      },
  { value: 'price_asc',  label: 'Price: Low–High' },
  { value: 'price_desc', label: 'Price: High–Low' },
  { value: 'rating',     label: 'Top Rated'     },
  { value: 'newest',     label: 'Newest'        },
];

// Single menu card component
function MenuCard({ item }) {
  var dispatch = useDispatch();
  var inCart   = useSelector(selectIsInCart(item.id || item._id));
  var isWished = useSelector(selectIsWishlisted(item.id || item._id));

  var normalizedItem = useMemo(function() {
    return Object.assign({}, item, { id: item.id || item._id });
  }, [item]);

  var handleAdd = function(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(normalizedItem));
    dispatch(openCartDrawer());
    toast.success(item.name + ' added!');
  };
  var handleWish = function(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(normalizedItem));
    toast(isWished ? 'Removed from favourites' : '❤️ Saved!', { icon: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-eerie-2 border border-white/5 hover:border-gold/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <Link to={'/menu/' + (item.id || item._id)} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={function(e) {
            // Fallback to Unsplash if local image fails
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';
          }}
        />
        {item.badge && (
          <span className="absolute top-3 left-3 bg-gold text-smoky-1 text-[10px] font-black uppercase tracking-widest px-3 py-1">
            {item.badge}
          </span>
        )}
        <button
          onClick={handleWish}
          className={'absolute top-3 right-3 w-8 h-8 flex items-center justify-center border transition-all duration-200 ' +
            (isWished ? 'bg-red-500 border-red-500 text-white' : 'bg-black/60 border-white/20 text-white hover:border-gold hover:text-gold')}
          aria-label="Toggle wishlist"
        >
          <Heart size={13} fill={isWished ? 'currentColor' : 'none'} />
        </button>
        {item.isVeg && (
          <span className="absolute bottom-3 left-3 border border-green-500 bg-black/70 text-green-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
            Veg
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold capitalize">{item.category}</span>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-gold fill-gold" />
            <span className="text-white/70 text-[10px] font-bold">{item.rating}</span>
            <span className="text-white/30 text-[10px]">({item.reviewCount})</span>
          </div>
        </div>

        <Link to={'/menu/' + (item.id || item._id)}>
          <h3 className="font-forum text-white text-xl leading-tight mb-2 hover:text-gold transition-colors line-clamp-1">
            {item.name}
          </h3>
        </Link>

        <p className="text-quick-silver text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {truncate(item.description, 90)}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="font-forum text-gold text-2xl">{formatCurrency(item.price)}</span>
            {item.originalPrice && (
              <span className="text-davys-grey text-sm line-through">{formatCurrency(item.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={'flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-200 flex-shrink-0 ' +
              (inCart
                ? 'bg-gold/20 border-gold text-gold'
                : 'border-gold text-gold hover:bg-gold hover:text-smoky-1')}
          >
            <ShoppingBag size={13} />
            {inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryFilter({ categories, active, onSelect }) {
  var all = [{ id: 'all', name: 'All', count: null }, ...(categories || [])];
  return (
    <div className="flex gap-2 flex-wrap">
      {all.map(function(cat) {
        return (
          <button key={cat.id} onClick={function() { onSelect(cat.id); }}
            className={'px-5 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 ' +
              (active === cat.id
                ? 'bg-gold border-gold text-smoky-1'
                : 'border-white/15 text-quick-silver hover:border-gold hover:text-gold')}>
            {cat.name}
            {cat.count !== null && <span className="ml-1.5 opacity-60">({cat.count})</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function MenuPage() {
  var [category, setCategory] = useState('all');
  var [search,   setSearch]   = useState('');
  var [sort,     setSort]     = useState('default');
  var [vegOnly,  setVegOnly]  = useState(false);
  var [showSort, setShowSort] = useState(false);

  var params = useMemo(function() {
    var p = {};
    if (category !== 'all') p.category = category;
    if (search.trim())       p.search   = search.trim();
    if (sort !== 'default')  p.sort     = sort;
    if (vegOnly)             p.isVeg    = 'true';
    return p;
  }, [category, search, sort, vegOnly]);

  var menuResult = useMenu(params);
  var catResult  = useMenuCategories();

  var items      = menuResult.data || [];
  var categories = catResult.data  || [];
  var isLoading  = menuResult.isLoading;
  var isError    = menuResult.isError;

  var clearFilters = useCallback(function() {
    setCategory('all'); setSearch(''); setSort('default'); setVegOnly(false);
  }, []);

  var hasFilters = category !== 'all' || search || sort !== 'default' || vegOnly;

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      {/* Page header */}
      <div className="w-full bg-smoky-1 py-14 text-center mb-10">
        <span className="section-subtitle">Explore Our</span>
        <h1 className="section-title">Full Menu</h1>
      </div>

      <div className="wrap">
        {/* Filters bar */}
        <div className="mb-8 space-y-5">
          {/* Search + Sort */}
          <div className="flex gap-3 items-stretch">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={function(e) { setSearch(e.target.value); }}
                placeholder="Search dishes..."
                className="grilli-input pl-11 w-full h-12"
              />
              {search && (
                <button onClick={function() { setSearch(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-quick-silver hover:text-gold">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button onClick={function() { setShowSort(!showSort); }}
                className="h-12 px-5 border border-white/15 text-quick-silver hover:border-gold hover:text-gold transition-all flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">{SORT_OPTIONS.find(function(o) { return o.value === sort; })?.label || 'Sort'}</span>
                <ChevronDown size={12} className={showSort ? 'rotate-180' : ''} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-full mt-1 bg-smoky-1 border border-white/10 z-20 min-w-[180px] shadow-2xl">
                    {SORT_OPTIONS.map(function(opt) {
                      return (
                        <button key={opt.value} onClick={function() { setSort(opt.value); setShowSort(false); }}
                          className={'w-full text-left px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors ' +
                            (sort === opt.value ? 'text-gold bg-gold/5' : 'text-quick-silver hover:text-gold hover:bg-white/5')}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Veg toggle */}
            <button onClick={function() { setVegOnly(!vegOnly); }}
              className={'h-12 px-4 border transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap ' +
                (vegOnly ? 'bg-green-700 border-green-700 text-white' : 'border-white/15 text-quick-silver hover:border-green-500 hover:text-green-400')}>
              🌱 Veg
            </button>
          </div>

          {/* Category tabs */}
          {!catResult.isLoading && (
            <CategoryFilter categories={categories} active={category} onSelect={setCategory} />
          )}

          {/* Active filters summary */}
          {hasFilters && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-quick-silver">{items.length} result{items.length !== 1 ? 's' : ''}</span>
              <button onClick={clearFilters} className="text-gold hover:text-white transition-colors font-bold uppercase tracking-widest flex items-center gap-1">
                <X size={11} /> Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map(function(_, i) {
              return <div key={i} className="skeleton aspect-[4/5]" />;
            })}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="font-forum text-white text-2xl mb-3">Unable to load menu</p>
            <p className="text-quick-silver text-sm mb-6">Please ensure the backend server is running on port 3001.</p>
            <button onClick={function() { menuResult.refetch(); }} className="btn-grilli inline-flex">Try Again</button>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-forum text-white text-2xl mb-3">No dishes found</p>
            <p className="text-quick-silver text-sm mb-6">Try adjusting your search or filters.</p>
            <button onClick={clearFilters} className="btn-grilli inline-flex">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            <AnimatePresence>
              {items.map(function(item, i) {
                return (
                  <motion.div key={item.id || item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.3) }}>
                    <MenuCard item={item} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Count */}
        {!isLoading && !isError && items.length > 0 && (
          <p className="text-center text-quick-silver text-xs mt-10 uppercase tracking-widest">
            Showing {items.length} dish{items.length !== 1 ? 'es' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
