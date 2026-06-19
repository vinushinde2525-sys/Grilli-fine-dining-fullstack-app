import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSpecialDish } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/helpers';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function SpecialDish() {
  var rv     = useScrollReveal();
  var result = useSpecialDish();
  var dish   = result.data;
  var isLoading = result.isLoading;

  return (
    <section className="relative overflow-hidden" ref={rv.ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left — full-bleed image */}
        <div className="relative min-h-[500px] lg:min-h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=940&h=900&fit=crop"
            alt="Special Dish"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Right — content */}
        <div className="bg-smoky-2 flex items-center justify-center py-20 px-8 lg:px-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            {/* Floating badge pin */}
            <div className="w-7 h-10 bg-gold mx-auto mb-6 flex items-end justify-center pb-1"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)' }}>
              <div className="w-1.5 h-1.5 bg-smoky-1 rounded-full" />
            </div>

            <span className="section-subtitle text-center">Special Dish</span>

            <h2 className="section-title mb-5">
              {isLoading ? 'Lobster Tortellini' : (dish ? dish.name : 'Lobster Tortellini')}
            </h2>

            <p className="text-quick-silver leading-relaxed mb-8">
              {isLoading ? '...' : (dish ? dish.description : 'Handmade tortellini filled with fresh lobster, ricotta and herbs in a light bisque sauce.')}
            </p>

            {/* Price */}
            <div className="flex items-center justify-center gap-5 mb-10">
              {dish && dish.originalPrice && (
                <span className="font-forum text-2xl text-davys-grey line-through decoration-1">
                  {formatCurrency(dish.originalPrice)}
                </span>
              )}
              <span className="font-forum text-4xl text-gold">
                {isLoading ? '...' : (dish ? formatCurrency(dish.price) : formatCurrency(20))}
              </span>
            </div>

            <Link to="/menu" className="btn-grilli inline-flex">
              View All Menu
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
