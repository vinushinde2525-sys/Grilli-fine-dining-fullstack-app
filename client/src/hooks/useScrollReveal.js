import { useEffect, useRef, useState } from 'react';

export var useScrollReveal = function(options) {
  var ref       = useRef(null);
  var state     = useState(false);
  var isVisible = state[0];
  var setVisible = state[1];

  useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(el);
      }
    }, Object.assign({ threshold: 0.12 }, options || {}));
    observer.observe(el);
    return function() { observer.disconnect(); };
  }, []);

  return { ref: ref, isVisible: isVisible };
};
