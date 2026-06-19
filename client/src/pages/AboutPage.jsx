import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useStats } from '../hooks/useApi';

var TEAM = [
  { name: 'Marco Rossi',    role: 'Executive Chef',      img: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Sophie Laurent', role: 'Sous Chef',           img: 'https://i.pravatar.cc/300?img=47' },
  { name: 'James Chen',     role: 'Pastry Chef',         img: 'https://i.pravatar.cc/300?img=33' },
  { name: 'Aisha Patel',    role: 'Sommelier',           img: 'https://i.pravatar.cc/300?img=25' },
];

export default function AboutPage() {
  var rv    = useScrollReveal();
  var stats = useStats();
  var s     = stats.data || { years: 12, satisfied: 20000, chefs: 15, awards: 50 };

  return (
    <div className="min-h-screen bg-eerie-1 pt-28 lg:pt-32 pb-24">

      {/* Hero */}
      <div className="w-full bg-smoky-1 py-20 text-center mb-0 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=400&fit=crop"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10">
          <span className="section-subtitle">Our Story</span>
          <h1 className="section-title">About Grilli</h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 lg:py-32" ref={rv.ref}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={rv.isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}
              className="relative">
              <div className="relative ml-8 lg:ml-14">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop"
                  alt="About Grilli" className="w-full aspect-square object-cover" />
                <div className="absolute -inset-4 border border-gold/20 -z-10" />
              </div>
              <div className="absolute -bottom-12 left-0 w-40 sm:w-56 border-4 border-eerie-1">
                <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop"
                  alt="Chef" className="w-full aspect-square object-cover" />
              </div>
              <div className="absolute -top-6 right-0 w-28 h-28 bg-gold flex items-center justify-center">
                <div className="text-center text-smoky-1">
                  <p className="font-forum text-3xl font-bold leading-none">{s.years}+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider leading-tight mt-1">Years of<br/>Excellence</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={rv.isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center lg:text-left mt-12 lg:mt-0">
              <span className="section-subtitle lg:text-left block">Our Story</span>
              <h2 className="section-title mb-6">Every Flavor<br /><span className="text-gold">Tells a Story</span></h2>
              <p className="text-quick-silver leading-relaxed mb-5 text-base lg:text-lg">
                Founded in {new Date().getFullYear() - s.years}, Grilli was born from a passion for bringing the finest dining
                experience to our guests. Our journey began with a simple belief: that exceptional food, crafted with love
                and the finest ingredients, has the power to create unforgettable memories.
              </p>
              <p className="text-quick-silver leading-relaxed mb-8 text-base lg:text-lg">
                Over the years, we have welcomed guests from across the world, earning a reputation for our commitment
                to quality, creativity, and impeccable service. Every dish we serve reflects decades of culinary expertise.
              </p>
              <Link to="/reservation" className="btn-grilli inline-flex">Book A Table</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-smoky-1">
        <div className="wrap">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: s.years + '+', label: 'Years of Experience' },
              { value: (s.satisfied / 1000).toFixed(0) + 'K+', label: 'Happy Customers' },
              { value: s.chefs + '+', label: 'Master Chefs' },
              { value: s.awards + '+', label: 'Awards Won' },
            ].map(function(stat) {
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}>
                  <p className="font-forum text-gold" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>{stat.value}</p>
                  <p className="text-quick-silver text-xs uppercase tracking-widest mt-2">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="wrap text-center">
          <span className="section-subtitle">The People Behind the Food</span>
          <h2 className="section-title mb-14">Our Culinary Team</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TEAM.map(function(member, i) {
              return (
                <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} animate={rv.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }} className="group">
                  <div className="relative overflow-hidden aspect-[3/4] mb-4">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-forum text-white text-xl">{member.name}</h3>
                  <p className="text-gold text-xs font-bold uppercase tracking-widest mt-1">{member.role}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
