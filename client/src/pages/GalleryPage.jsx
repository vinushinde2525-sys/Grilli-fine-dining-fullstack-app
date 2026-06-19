import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

var GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop', category: 'Dining' },
  { id: 2, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop', category: 'Food' },
  { id: 3, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=600&fit=crop', category: 'Ambiance' },
  { id: 4, src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=600&fit=crop', category: 'Food' },
  { id: 5, src: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600&h=600&fit=crop', category: 'Food' },
  { id: 6, src: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=600&fit=crop', category: 'Food' },
  { id: 7, src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=600&fit=crop', category: 'Specials' },
  { id: 8, src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=600&fit=crop', category: 'Food' },
  { id: 9, src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=600&fit=crop', category: 'Desserts' },
  { id: 10,src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop', category: 'Food' },
  { id: 11,src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=600&fit=crop', category: 'Drinks' },
  { id: 12,src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=600&fit=crop', category: 'Ambiance' },
];
var CATS = ['All', 'Food', 'Ambiance', 'Drinks', 'Desserts', 'Specials', 'Dining'];

export default function GalleryPage() {
  var [cat,     setCat]     = useState('All');
  var [lightbox,setLightbox]= useState(null);

  var filtered = cat === 'All' ? GALLERY : GALLERY.filter(function(g) { return g.category === cat; });

  var navLightbox = function(dir) {
    var idx = filtered.findIndex(function(g) { return g.id === lightbox.id; });
    var next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next]);
  };

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">
      <div className="w-full bg-smoky-1 py-16 text-center mb-10">
        <span className="section-subtitle">Visual Journey</span>
        <h1 className="section-title">Our Gallery</h1>
      </div>

      <div className="wrap">
        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {CATS.map(function(c) {
            return (
              <button key={c} onClick={function() { setCat(c); }}
                className={'px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all ' +
                  (cat === c ? 'bg-gold border-gold text-smoky-1' : 'border-white/15 text-quick-silver hover:border-gold hover:text-gold')}>
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map(function(img, i) {
              return (
                <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative aspect-square overflow-hidden cursor-pointer"
                  onClick={function() { setLightbox(img); }}>
                  <img src={img.src} alt={img.category} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{img.category}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={function() { setLightbox(null); }} className="fixed inset-0 bg-black/95 z-[80]" />
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
              <button onClick={function() { setLightbox(null); }} className="absolute top-4 right-4 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all">
                <X size={18} />
              </button>
              <button onClick={function() { navLightbox(-1); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all rotate-45">
                <ChevronLeft size={18} className="-rotate-45" />
              </button>
              <motion.img key={lightbox.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                src={lightbox.src} alt="" className="max-h-[85vh] max-w-[90vw] object-contain" />
              <button onClick={function() { navLightbox(1); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all rotate-45">
                <ChevronRight size={18} className="-rotate-45" />
              </button>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
