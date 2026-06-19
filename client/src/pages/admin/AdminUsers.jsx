import { useState } from 'react';
import { Search, Trash2, ShieldCheck } from 'lucide-react';
import { useAdminUsers, useDeleteUser } from '../../hooks/useApi';
import { adminApi } from '../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  var [search, setSearch] = useState('');
  var [page,   setPage]   = useState(1);
  var result   = useAdminUsers({ page, limit: 20 });
  var users    = (result.data && result.data.data) || [];
  var total    = (result.data && result.data.count) || 0;
  var pages    = (result.data && result.data.pages) || 1;
  var delUser  = useDeleteUser();
  var qc       = useQueryClient();

  var filtered = search ? users.filter(function(u){ return u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase()); }) : users;

  var toggleRole = function(user) {
    var newRole = user.role === 'admin' ? 'customer' : 'admin';
    if (!confirm('Change ' + user.name + ' to ' + newRole + '?')) return;
    adminApi.updateUser(user._id, { role: newRole }).then(function(){ qc.invalidateQueries(['admin-users']); toast.success('Role updated'); }).catch(function(e){ toast.error(e.message); });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Users</h1>
        <span className="text-quick-silver text-xs">{total} total</span>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quick-silver" />
        <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search users…" className="grilli-input pl-9 h-10 text-sm" />
      </div>

      <div className="bg-eerie-2 border border-white/5 overflow-x-auto">
        {result.isLoading ? (
          <div className="space-y-2 p-4">{[1,2,3,4,5].map(function(i){return <div key={i} className="skeleton h-12"/>;})}</div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">
              {['User','Email','Role','Joined','Actions'].map(function(h){
                return <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-quick-silver">{h}</th>;
              })}
            </tr></thead>
            <tbody>
              {filtered.map(function(user){
                return (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-gold flex items-center justify-center text-smoky-1 font-bold text-xs flex-shrink-0">
                          {user.name ? user.name[0].toUpperCase() : '?'}
                        </div>
                        <span className="text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-quick-silver">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border '+(user.role==='admin'?'text-gold border-gold/40':'text-quick-silver border-white/20')}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-quick-silver text-xs">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={function(){toggleRole(user);}} title="Toggle role"
                          className="p-1.5 text-quick-silver hover:text-gold transition-colors border border-white/10 hover:border-gold">
                          <ShieldCheck size={13} />
                        </button>
                        <button onClick={function(){if(confirm('Delete '+user.name+'?')){delUser.mutate(user._id);}}}
                          className="p-1.5 text-quick-silver hover:text-red-400 transition-colors border border-white/10 hover:border-red-500/40">
                          <Trash2 size={13} />
                        </button>
                      </div>
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
