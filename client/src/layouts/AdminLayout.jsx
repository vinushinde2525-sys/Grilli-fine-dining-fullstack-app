import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar,
  Users, Megaphone, Star, BarChart3, Settings, LogOut,
  Bell, Menu, X, ChevronRight
} from 'lucide-react';
import { useLogout, useNotifications } from '../hooks/useApi';
import { selectCurrentUser } from '../store/authSlice';

var LINKS = [
  { to: '/admin/dashboard',    label: 'Dashboard',    icon: <LayoutDashboard size={17} /> },
  { to: '/admin/orders',       label: 'Orders',       icon: <ShoppingBag     size={17} /> },
  { to: '/admin/reservations', label: 'Reservations', icon: <Calendar        size={17} /> },
  { to: '/admin/menu',         label: 'Menu',         icon: <UtensilsCrossed size={17} /> },
  { to: '/admin/users',        label: 'Users',        icon: <Users           size={17} /> },
  { to: '/admin/events',       label: 'Events',       icon: <Megaphone       size={17} /> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <Star            size={17} /> },
  { to: '/admin/analytics',    label: 'Analytics',    icon: <BarChart3       size={17} /> },
  { to: '/admin/settings',     label: 'Settings',     icon: <Settings        size={17} /> },
];

export default function AdminLayout() {
  var [sideOpen, setSideOpen] = useState(false);
  var user      = useSelector(selectCurrentUser);
  var logout    = useLogout();
  var navigate  = useNavigate();
  var notifs    = useNotifications();
  var unread    = ((notifs.data) || []).filter(function(n) { return !n.isRead; }).length;

  var handleLogout = function() {
    logout.mutate(undefined, { onSettled: function() { navigate('/'); } });
  };

  var Sidebar = function({ mobile }) {
    return (
      <aside className={'flex flex-col h-full bg-smoky-1 border-r border-white/5 ' + (mobile ? 'w-64' : 'w-60')}>
        <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="font-forum text-2xl text-white">Grilli<span className="text-gold">.</span></Link>
          {mobile && (
            <button onClick={function() { setSideOpen(false); }} className="text-white/60 hover:text-gold">
              <X size={18} />
            </button>
          )}
        </div>
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold flex items-center justify-center flex-shrink-0">
              <span className="font-forum text-smoky-1 font-bold">{user && user.name ? user.name[0] : 'A'}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{user && user.name}</p>
              <p className="text-gold text-[10px] uppercase tracking-widest">Administrator</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {LINKS.map(function(link) {
            return (
              <NavLink key={link.to} to={link.to}
                onClick={function() { setSideOpen(false); }}
                className={function(p) {
                  return 'flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors ' +
                    (p.isActive ? 'text-gold bg-gold/5 border-r-2 border-gold' : 'text-white/50 hover:text-gold hover:bg-white/3');
                }}>
                {link.icon} {link.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-gold transition-colors py-1">
            <ChevronRight size={13} /> Back to Site
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-400/70 hover:text-red-400 transition-colors py-1 uppercase tracking-widest">
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>
    );
  };

  return (
    <div className="flex h-screen bg-eerie-1 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sideOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={function() { setSideOpen(false); }} />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden flex">
            <Sidebar mobile />
          </div>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-smoky-1 border-b border-white/5 px-4 lg:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <button onClick={function() { setSideOpen(true); }} className="lg:hidden text-white/60 hover:text-gold p-1">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/admin/settings" className="relative p-2 text-white/50 hover:text-gold transition-colors">
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-smoky-1 text-[9px] font-black flex items-center justify-center">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
