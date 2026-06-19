import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useReservations, useUpdateReservationStatus } from '../../hooks/useApi';
import { formatDate } from '../../utils/helpers';

var STATUSES = ['all','pending','confirmed','completed','cancelled'];
var ST_CLS = { confirmed:'text-green-400 border-green-500/30', pending:'text-yellow-400 border-yellow-500/30', completed:'text-blue-400 border-blue-500/30', cancelled:'text-red-400 border-red-500/30' };

export default function AdminReservations() {
  var [filter, setFilter] = useState('all');
  var [search, setSearch] = useState('');
  var [page,   setPage]   = useState(1);
  var params   = filter === 'all' ? { page, limit: 20 } : { status: filter, page, limit: 20 };
  var result   = useReservations(params);
  var list     = (result.data && result.data.data) || [];
  var total    = (result.data && result.data.count) || 0;
  var pages    = (result.data && result.data.pages) || 1;
  var updateSt = useUpdateReservationStatus();

  var filtered = search ? list.filter(function(r){ return r.name.toLowerCase().includes(search.toLowerCase()) || r.refId.includes(search.toUpperCase()); }) : list;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Reservations</h1>
        <span className="text-quick-silver text-xs">{total} total</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quick-silver" />
          <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search name or ref ID…" className="grilli-input pl-9 h-10 text-sm" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUSES.map(function(s){
            return <button key={s} onClick={function(){setFilter(s);setPage(1);}}
              className={'px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all '+(filter===s?'bg-gold border-gold text-smoky-1':'border-white/15 text-quick-silver hover:border-gold hover:text-gold')}>{s}</button>;
          })}
        </div>
      </div>

      <div className="bg-eerie-2 border border-white/5 overflow-x-auto">
        {result.isLoading ? (
          <div className="space-y-2 p-4">{[1,2,3,4].map(function(i){return <div key={i} className="skeleton h-12"/>;})}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-quick-silver">No reservations found</div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">
              {['Ref','Name','Phone','Date','Time','Persons','Status','Update'].map(function(h){
                return <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-quick-silver">{h}</th>;
              })}
            </tr></thead>
            <tbody>
              {filtered.map(function(r){
                return (
                  <tr key={r._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3"><span className="text-gold font-bold text-xs">{r.refId}</span></td>
                    <td className="px-4 py-3 text-white">{r.name}</td>
                    <td className="px-4 py-3 text-quick-silver">{r.phone}</td>
                    <td className="px-4 py-3 text-quick-silver text-xs">{formatDate(r.date)}</td>
                    <td className="px-4 py-3 text-quick-silver">{r.time}</td>
                    <td className="px-4 py-3 text-quick-silver">{r.persons}</td>
                    <td className="px-4 py-3">
                      <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border '+(ST_CLS[r.status]||'text-gold border-gold/30')}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select value={r.status} onChange={function(e){updateSt.mutate({refId:r.refId,status:e.target.value});}}
                        className="bg-eerie-3 border border-white/10 text-white text-xs px-2 py-1 focus:outline-none focus:border-gold">
                        {['pending','confirmed','completed','cancelled'].map(function(s){return <option key={s} value={s}>{s}</option>;})}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
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
