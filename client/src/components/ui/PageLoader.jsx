import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-gold z-[100] flex flex-col items-center justify-center gap-8">
      <div className="w-28 h-28 rounded-full border-4 border-white border-t-smoky-3 animate-spin" />
      <p className="font-forum text-4xl font-bold uppercase tracking-[0.3em] text-smoky-1">
        Grilli
      </p>
    </div>
  );
}

export default function BackToTop() {
  var [visible, setVisible] = useState(false);

  useEffect(function() {
    var onScroll = function() { setVisible(window.scrollY > 300); };
    window.addEventListener('scroll', onScroll);
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <button
      onClick={function() { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      aria-label="Back to top"
      className={[
        'fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-gold text-smoky-1',
        'flex items-center justify-center shadow-lg',
        'hover:bg-white transition-all duration-300',
        visible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4',
      ].join(' ')}
    >
      <ChevronUp size={22} />
    </button>
  );
}
