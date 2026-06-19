import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

var SERVICES = [
  {
    title: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=720&fit=crop',
    link:  '/menu?category=starters',
  },
  {
    title: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&h=720&fit=crop',
    link:  '/menu?category=starters',
  },
  {
    title: 'Drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=720&fit=crop',
    link:  '/menu',
  },
];

export default function ServiceSection() {
  var rv = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 w-full bg-smoky-2 relative overflow-hidden" ref={rv.ref}>
      {/* decorative corner shapes */}
      <div className="absolute bottom-0 left-0 w-48 h-96 opacity-[0.04] border border-gold -rotate-12 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-72 opacity-[0.04] border border-gold rotate-12 pointer-events-none" />

      <div className="wrap text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-20"
        >
          <span className="section-subtitle">Flavors For Royalty</span>
          <h2 className="section-title mb-5">We Offer Top Notch</h2>
          <p className="text-quick-silver max-w-xl mx-auto leading-relaxed text-base lg:text-lg">
            Every dish is a work of art, crafted with the finest seasonal ingredients
            by our award-winning culinary team.
          </p>
        </motion.div>

        {/* 3-column grid — full width of wrap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SERVICES.map(function(svc, i) {
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 40 }}
                animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group"
              >
                <div className="overflow-hidden">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
                    <Link to={svc.link} className="card-shine block">
                      <img src={svc.image} alt={svc.title} loading="lazy"
                        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>

                  <div className="pt-6 pb-2">
                    <h3 className="font-forum text-white text-2xl lg:text-3xl mb-3 group-hover:text-gold transition-colors">
                      {svc.title}
                    </h3>
                    <Link to={svc.link}
                      className="text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-white transition-colors hover-gold mx-auto">
                      View Menu
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
