import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, UtensilsCrossed, Heart, ShoppingBag, CalendarCheck } from 'lucide-react';
import { selectCartCount, openCartDrawer } from '../../store';

var LINKS = [
  { to: '/',            icon: Home,           label: 'Home',   end: true },
  { to: '/menu',        icon: UtensilsCrossed, label: 'Menu',  end: false },
  { to: '/wishlist',    icon: Heart,          label: 'Saved',  end: false },
  { to: '/reservation', icon: CalendarCheck,  label: 'Book',   end: false },
];

export default function MobileBottomNav() {
  var dispatch  = useDispatch();
  var cartCount = useSelector(selectCartCount);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-eerie-4/95 backdrop-blur-sm border-t border-white/10">
      <div className="flex items-center justify-around h-16 px-2">
        {LINKS.map(function(link) {
          return (
            <NavLink key={link.to} to={link.to} end={link.end}
              className={function(p) {
                return 'flex flex-col items-center gap-0.5 px-3 py-2 transition-colors ' +
                  (p.isActive ? 'text-gold' : 'text-white/40 hover:text-white/70');
              }}>
              {function(p) {
                var Icon = link.icon;
                return (
                  <>
                    <Icon size={20} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">{link.label}</span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
        <button
          onClick={function() { dispatch(openCartDrawer()); }}
          className="relative flex flex-col items-center gap-0.5 px-3 py-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <ShoppingBag size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-gold text-smoky-1 text-[9px] font-black w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
