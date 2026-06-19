import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { ShoppingBag, Calendar, Users, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { useAnalytics } from '../../hooks/useApi';
import { formatCurrency, formatDate } from '../../utils/helpers';

var GOLD    = 'hsl(38,61%,73%)';
var COLORS  = [GOLD, '#6b7280', '#374151', '#1f2937'];
var MONTHS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var StatCard = function({ icon, label, value, sub, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-eerie-2 border border-white/5 p-5 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-quick-silver text-xs uppercase tracking-widest mb-3">{label}</p>
          <p className="font-forum text-white" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>{value}</p>
          {sub && <p className="text-quick-silver text-xs mt-1">{sub}</p>}
        </div>
        <div className={'p-3 ' + (color || 'bg-gold/10')}>
          <span className="text-gold">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
};

var CustomTooltip = function({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-smoky-1 border border-white/10 px-4 py-2 text-xs">
      <p className="text-gold mb-1">{label}</p>
      {payload.map(function(p, i) {
        return <p key={i} className="text-white">{p.name}: {typeof p.value === 'number' && p.name === 'Revenue' ? formatCurrency(p.value) : p.value}</p>;
      })}
    </div>
  );
};

var STATUS_COLORS = {
  pending: 'text-yellow-400 border-yellow-500/30',
  confirmed: 'text-blue-400 border-blue-500/30',
  preparing: 'text-orange-400 border-orange-500/30',
  out_for_delivery: 'text-purple-400 border-purple-500/30',
  delivered: 'text-green-400 border-green-500/30',
  cancelled: 'text-red-400 border-red-500/30',
};

export default function AdminDashboard() {
  var result    = useAnalytics();
  var analytics = result.data || {};

  var monthlyData = (analytics.monthlyOrders || []).map(function(m) {
    return { name: MONTHS[(m._id.month || 1) - 1], Orders: m.count, Revenue: Math.round(m.revenue) };
  });

  var popularData = (analytics.popularItems || []).map(function(p) {
    return { name: (p._id || '').slice(0, 16), value: p.count };
  });

  if (result.isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(function(i) { return <div key={i} className="skeleton h-28" />; })}
        </div>
        <div className="skeleton h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-forum text-white text-3xl">Dashboard</h1>
          <p className="text-quick-silver text-xs mt-1">Real-time restaurant metrics</p>
        </div>
        <span className="text-[10px] text-gold border border-gold/20 px-3 py-1 uppercase tracking-widest">
          Live
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<DollarSign size={18} />} label="Total Revenue"    value={formatCurrency(analytics.totalRevenue || 0)} />
        <StatCard icon={<ShoppingBag size={18} />} label="Total Orders"    value={analytics.totalOrders || 0} sub="All time" />
        <StatCard icon={<Calendar size={18} />}    label="Reservations"    value={analytics.totalReservations || 0} sub="All time" />
        <StatCard icon={<Users size={18} />}       label="Customers"       value={analytics.totalUsers || 0} sub="Registered" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly orders bar chart */}
        <div className="lg:col-span-2 bg-eerie-2 border border-white/5 p-5 lg:p-6">
          <h3 className="font-forum text-white text-lg mb-5">Monthly Performance</h3>
          {monthlyData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-quick-silver text-sm">No data yet — place some orders!</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="Orders" fill={GOLD} radius={[2,2,0,0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Popular dishes pie */}
        <div className="bg-eerie-2 border border-white/5 p-5 lg:p-6">
          <h3 className="font-forum text-white text-lg mb-5">Top Dishes</h3>
          {popularData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-quick-silver text-sm">No orders yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={popularData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                    {popularData.map(function(_, i) { return <Cell key={i} fill={COLORS[i % COLORS.length]} />; })}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-3">
                {popularData.slice(0,4).map(function(d, i) {
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-quick-silver truncate flex-1">{d.name}</span>
                      <span className="text-white font-bold">{d.value}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent orders + order statuses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-eerie-2 border border-white/5 p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-forum text-white text-lg">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs text-gold hover:text-white transition-colors uppercase tracking-widest">View All</Link>
          </div>
          <div className="space-y-3">
            {(analytics.recentOrders || []).length === 0 && (
              <p className="text-quick-silver text-sm text-center py-8">No orders yet</p>
            )}
            {(analytics.recentOrders || []).map(function(order) {
              return (
                <Link key={order._id} to={'/admin/orders/' + order.orderId}
                  className="flex items-center gap-4 p-3 hover:bg-white/3 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold">{order.orderId}</p>
                    <p className="text-quick-silver text-xs truncate">{order.customer && order.customer.name} · {formatDate(order.createdAt)}</p>
                  </div>
                  <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ' + (STATUS_COLORS[order.status] || 'text-gold border-gold/30')}>
                    {(order.status || '').replace(/_/g,' ')}
                  </span>
                  <span className="font-forum text-gold text-sm flex-shrink-0">{formatCurrency(order.total)}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="bg-eerie-2 border border-white/5 p-5 lg:p-6">
          <h3 className="font-forum text-white text-lg mb-5">Order Statuses</h3>
          <div className="space-y-3">
            {(analytics.orderStatuses || []).map(function(s) {
              return (
                <div key={s._id} className="flex items-center justify-between">
                  <span className={'text-xs font-bold uppercase tracking-widest ' + (STATUS_COLORS[s._id] || 'text-gold').split(' ')[0]}>
                    {(s._id || 'unknown').replace(/_/g,' ')}
                  </span>
                  <span className="font-forum text-white text-lg">{s.count}</span>
                </div>
              );
            })}
            {(analytics.orderStatuses || []).length === 0 && (
              <p className="text-quick-silver text-sm">No orders yet</p>
            )}
          </div>
          <div className="mt-6 pt-5 border-t border-white/10">
            <Link to="/admin/orders" className="btn-grilli w-full justify-center text-xs py-3 inline-flex">
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
