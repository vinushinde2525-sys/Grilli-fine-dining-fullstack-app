import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { useAnalytics } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/helpers';

var GOLD   = 'hsl(38,61%,73%)';
var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AdminAnalytics() {
  var result    = useAnalytics();
  var analytics = result.data || {};
  var monthly   = (analytics.monthlyOrders||[]).map(function(m){ return { name:MONTHS[(m._id.month||1)-1], Orders:m.count, Revenue:Math.round(m.revenue) }; });
  var popular   = (analytics.popularItems||[]).slice(0,8);

  if (result.isLoading) return <div className="space-y-4"><div className="skeleton h-12"/><div className="skeleton h-64"/><div className="skeleton h-64"/></div>;

  return (
    <div className="space-y-6">
      <h1 className="font-forum text-white text-3xl">Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Revenue',     value: formatCurrency(analytics.totalRevenue||0) },
          { label:'Orders',      value: analytics.totalOrders||0 },
          { label:'Reservations',value: analytics.totalReservations||0 },
          { label:'Customers',   value: analytics.totalUsers||0 },
        ].map(function(s){
          return (
            <div key={s.label} className="bg-eerie-2 border border-white/5 p-5 text-center">
              <p className="text-quick-silver text-[10px] uppercase tracking-widest mb-2">{s.label}</p>
              <p className="font-forum text-gold text-2xl">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-eerie-2 border border-white/5 p-6">
        <h3 className="font-forum text-white text-xl mb-5">Monthly Orders & Revenue</h3>
        {monthly.length === 0 ? <p className="text-quick-silver text-center py-10">No order data yet</p> : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
              <XAxis dataKey="name" tick={{fill:'#888',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'#888',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:'#111',border:'1px solid rgba(255,255,255,0.1)',borderRadius:0}} labelStyle={{color:GOLD}} itemStyle={{color:'#fff'}}/>
              <Bar dataKey="Orders"  fill={GOLD}      radius={[2,2,0,0]} maxBarSize={28}/>
              <Bar dataKey="Revenue" fill="rgba(201,169,110,0.25)" radius={[2,2,0,0]} maxBarSize={28}/>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-eerie-2 border border-white/5 p-6">
        <h3 className="font-forum text-white text-xl mb-5">Top Dishes by Orders</h3>
        {popular.length === 0 ? <p className="text-quick-silver text-center py-10">No data yet</p> : (
          <div className="space-y-3">
            {popular.map(function(p,i){
              var pct = Math.round((p.count / (popular[0]&&popular[0].count||1)) * 100);
              return (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-quick-silver text-xs w-4 flex-shrink-0">{i+1}</span>
                  <span className="text-white text-sm flex-1 truncate">{p._id}</span>
                  <div className="w-32 h-1.5 bg-white/10 flex-shrink-0">
                    <div className="h-full bg-gold" style={{width:pct+'%'}}/>
                  </div>
                  <span className="text-gold text-xs font-bold w-8 text-right">{p.count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
