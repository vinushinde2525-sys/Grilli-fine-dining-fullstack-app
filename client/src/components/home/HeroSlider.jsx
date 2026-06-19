import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

var SLIDES = [
  {
    id: 1,
    subtitle: 'Traditional & Hygienic',
    title: 'For the love of\ndelicious food',
    text: 'Come with family & feel the joy of mouthwatering food',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop',
  },
  {
    id: 2,
    subtitle: 'Delightful Experience',
    title: 'Flavors Inspired by\nthe Seasons',
    text: 'Every dish tells a story of craftsmanship and passion',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop',
  },
  {
    id: 3,
    subtitle: 'Amazing & Delicious',
    title: 'Where every flavor\ntells a story',
    text: 'Come with family & feel the joy of mouthwatering food',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop',
  },
];

export default function HeroSlider() {
  var [current, setCurrent] = useState(0);
  var [paused,  setPaused]  = useState(false);

  var next = useCallback(function() {
    setCurrent(function(c) { return (c + 1) % SLIDES.length; });
  }, []);
  var prev = function() {
    setCurrent(function(c) { return c === 0 ? SLIDES.length - 1 : c - 1; });
  };

  useEffect(function() {
    if (paused) return;
    var t = setInterval(next, 7000);
    return function() { clearInterval(t); };
  }, [paused, next]);

  var slide = SLIDES[current];

  return (
    /* Full viewport, no horizontal constraints */
    <section className="relative w-full min-h-screen overflow-hidden" id="home">

      {/* Background — always covers full viewport */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 7, ease: 'linear' }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </motion.div>
      </AnimatePresence>

      {/* Content — centred within wrap-wide */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-6">
        <div className="w-full wrap-wide flex flex-col items-center pt-28">
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }} className="space-y-6 max-w-4xl mx-auto">

              <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }} className="section-subtitle">
                {slide.subtitle}
              </motion.p>

              <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="font-forum text-white leading-tight"
                style={{ fontSize: 'clamp(3.6rem, 8vw, 8rem)' }}>
                {slide.title.split('\n').map(function(line, i) {
                  return <span key={i} className="block">{line}</span>;
                })}
              </motion.h1>

              <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-white/70 text-lg lg:text-xl max-w-lg mx-auto">
                {slide.text}
              </motion.p>

              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.6 }}>
                <Link to="/menu" className="btn-grilli inline-flex">View Our Menu</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next — positioned at viewport edges */}
      <button onClick={function() { prev(); setPaused(true); }}
        onMouseEnter={function() { setPaused(true); }} onMouseLeave={function() { setPaused(false); }}
        className="absolute left-4 xl:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-gold text-gold flex items-center justify-center rotate-45 hover:bg-gold hover:text-smoky-1 transition-all duration-200"
        aria-label="Previous">
        <ChevronLeft size={20} className="-rotate-45" />
      </button>
      <button onClick={function() { next(); setPaused(true); }}
        onMouseEnter={function() { setPaused(true); }} onMouseLeave={function() { setPaused(false); }}
        className="absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-gold text-gold flex items-center justify-center rotate-45 hover:bg-gold hover:text-smoky-1 transition-all duration-200"
        aria-label="Next">
        <ChevronRight size={20} className="-rotate-45" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map(function(_, i) {
          return (
            <button key={i} onClick={function() { setCurrent(i); }}
              className={'border border-gold rotate-45 transition-all duration-300 ' +
                (i === current ? 'bg-gold w-3 h-3 scale-110' : 'w-2.5 h-2.5 bg-transparent opacity-60')} />
          );
        })}
      </div>

      {/* Book badge */}
      <Link to="/reservation"
        className="absolute bottom-8 right-6 xl:right-12 z-20 w-24 h-24 bg-gold flex flex-col items-center justify-center text-center p-3 hover:bg-white transition-colors duration-200 group">
        <span className="text-[10px] font-bold uppercase tracking-widest text-smoky-1 leading-tight">Book A Table</span>
        <div className="w-4 h-4 border border-smoky-1 rotate-45 mt-2 animate-rotate" />
      </Link>
    </section>
  );
}
