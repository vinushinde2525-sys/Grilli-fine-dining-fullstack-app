import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function AboutSection() {
  var rv = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" id="about" ref={rv.ref}>
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={rv.isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative ml-8 lg:ml-14">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop"
                alt="About Grilli"
                loading="lazy"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute -inset-4 border border-gold/20 -z-10" />
            </div>

            {/* Floating small image */}
            <div className="absolute -bottom-12 left-0 w-40 sm:w-56 lg:w-64 border-4 border-eerie-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop"
                  alt="Chef preparing food"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gold/10"
                  style={{ backgroundImage: 'radial-gradient(circle, hsl(38,61%,73%) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -top-6 right-0 w-28 h-28 lg:w-32 lg:h-32 bg-gold flex items-center justify-center">
              <div className="text-center text-smoky-1">
                <p className="font-forum text-3xl lg:text-4xl font-bold leading-none">12+</p>
                <p className="text-[10px] font-bold uppercase tracking-wider leading-tight mt-1">Years of<br/>Excellence</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={rv.isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center lg:text-left mt-12 lg:mt-0"
          >
            <span className="section-subtitle lg:text-left block">Our Story</span>
            <h2 className="section-title mb-6">
              Every Flavor<br />
              <span className="text-gold">Tells a Story</span>
            </h2>
            <p className="text-quick-silver leading-relaxed mb-5 text-base lg:text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry standard since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <p className="text-quick-silver leading-relaxed mb-8 text-base lg:text-lg">
              It has survived not only five centuries, but also the leap into electronic
              typesetting — a testament to enduring quality and timeless craftsmanship.
            </p>

            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Book Through Call</p>
              <a href="tel:+804001234567" className="font-forum text-3xl lg:text-4xl text-gold hover-gold inline-block">
                +80 (400) 123 4567
              </a>
            </div>

            <Link to="/reservation" className="btn-grilli inline-flex">Book A Table</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
