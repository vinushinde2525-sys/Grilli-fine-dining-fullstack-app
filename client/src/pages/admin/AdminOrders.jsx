import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, RefreshCw } from 'lucide-react';
import { useOrders, useUpdateOrderStatus } from '../../hooks/useApi';
import { formatCurrency, formatDate } from '../../utils/helpers';

var STATUSES = ['all','confirmed','preparing','out_for_delivery','delivered','cancelled'];
var STATUS_CLS = {
  confirmed:'text-blue-400 border-blue-500/30', preparing:'text-orange-400 border-orange-500/30',
  out_for_delivery:'text-purple-400 border-purple-500/30', delivered:'text-green-400 border-green-500/30',
  cancelled:'text-red-400 border-red-500/30', pending:'text-yellow-400 border-yellow-500/30',
};

export default function AdminOrders() {
  var [status, setStatus] = useState('all');
  var [search, setSearch] = useState('');
  var [page,   setPage]   = useState(1);
  var params   = status === 'all' ? { page, limit: 20 } : { status, page, limit: 20 };
  var result   = useOrders(params);
  var orders   = (result.data && result.data.data) || [];
  var total    = (result.data && result.data.count) || 0;
  var pages    = (result.data && result.data.pages) || 1;
  var updateSt = useUpdateOrderStatus();

  var filtered = search
    ? orders.filter(function(o) { return o.orderId.includes(search.toUpperCase()) || (o.customer && o.customer.name.toLowerCase().includes(search.toLowerCase())); })
    : orders;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Orders</h1>
        <span className="text-quick-silver text-xs">{total} total</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quick-silver" />
          <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search order ID or customer…"
            className="grilli-input pl-9 h-10 text-sm" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUSES.map(function(s) {
            return (
              <button key={s} onClick={function(){setStatus(s);setPage(1);}}
                className={'px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all ' +
                  (status===s ? 'bg-gold border-gold text-smoky-1' : 'border-white/15 text-quick-silver hover:border-gold hover:text-gold')}>
                {s.replace(/_/g,' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-eerie-2 border border-white/5 overflow-x-auto">
        {result.isLoading ? (
          <div className="space-y-2 p-4">{[1,2,3,4,5].map(function(i){return <div key={i} className="skeleton h-12"/>;})}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-quick-silver">No orders found</div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">
              {['Order ID','Customer','Items','Total','Payment','Status','Date','Action'].map(function(h){
                return <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-quick-silver">{h}</th>;
              })}
            </tr></thead>
            <tbody>
              {filtered.map(function(order){
                return (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3"><Link to={'/admin/orders/'+order.orderId} className="text-gold hover:text-white transition-colors font-bold">{order.orderId}</Link></td>
                    <td className="px-4 py-3 text-white">{order.customer && order.customer.name}</td>
                    <td className="px-4 py-3 text-quick-silver">{order.items && order.items.length}</td>
                    <td className="px-4 py-3 font-forum text-gold">{formatCurrency(order.total)}</td>
                    <td className="px-4 py-3 text-quick-silver capitalize">{order.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border '+(STATUS_CLS[order.status]||'text-gold border-gold/30')}>
                        {(order.status||'').replace(/_/g,' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-quick-silver text-xs">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      <select value={order.status}
                        onChange={function(e){updateSt.mutate({orderId:order.orderId,status:e.target.value});}}
                        className="bg-eerie-3 border border-white/10 text-white text-xs px-2 py-1 focus:outline-none focus:border-gold">
                        {['confirmed','preparing','out_for_delivery','delivered','cancelled'].map(function(s){
                          return <option key={s} value={s}>{s.replace(/_/g,' ')}</option>;
                        })}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex gap-2 justify-center">
          {Array.from({length:pages},function(_,i){return i+1;}).map(function(p){
            return <button key={p} onClick={function(){setPage(p);}}
              className={'w-8 h-8 text-xs font-bold border transition-all '+(page===p?'bg-gold border-gold text-smoky-1':'border-white/20 text-quick-silver hover:border-gold hover:text-gold')}>{p}</button>;
          })}
        </div>
      )}
    </div>
  );
}
