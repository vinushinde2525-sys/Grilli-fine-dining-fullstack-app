import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, Edit3 } from 'lucide-react';
import { useMenu, useMenuCategories, useDeleteMenuItem } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/helpers';

export default function AdminMenu() {
  var [search,   setSearch]   = useState('');
  var [category, setCategory] = useState('all');
  var cats    = useMenuCategories();
  var result  = useMenu(category !== 'all' ? { category } : {});
  var items   = result.data || [];
  var delItem = useDeleteMenuItem();

  var filtered = items.filter(function(i) {
    return !search || i.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Menu Items</h1>
        <Link to="/admin/menu/new" className="btn-grilli-solid inline-flex text-xs px-5 py-2.5 gap-2">
          <Plus size={14} /> Add Item
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quick-silver" />
          <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search menu items…"
            className="grilli-input pl-9 h-10 text-sm" />
        </div>
        <div className="flex gap-1 flex-wrap">
          <button onClick={function(){setCategory('all');}}
            className={'px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all '+(category==='all'?'bg-gold border-gold text-smoky-1':'border-white/15 text-quick-silver hover:border-gold hover:text-gold')}>
            All
          </button>
          {(cats.data||[]).map(function(c){
            return (
              <button key={c.id} onClick={function(){setCategory(c.id);}}
                className={'px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all '+(category===c.id?'bg-gold border-gold text-smoky-1':'border-white/15 text-quick-silver hover:border-gold hover:text-gold')}>
                {c.name} ({c.count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-eerie-2 border border-white/5 overflow-x-auto">
        {result.isLoading ? (
          <div className="space-y-2 p-4">{[1,2,3,4,5].map(function(i){return <div key={i} className="skeleton h-14"/>;})}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-quick-silver">No items found</div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10">
              {['Image','Name','Category','Price','Rating','Status','Actions'].map(function(h){
                return <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-quick-silver">{h}</th>;
              })}
            </tr></thead>
            <tbody>
              {filtered.map(function(item){
                return (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                    </td>
                    <td className="px-4 py-3 text-white font-bold">{item.name}</td>
                    <td className="px-4 py-3 text-quick-silver capitalize">{item.category}</td>
                    <td className="px-4 py-3 font-forum text-gold">{formatCurrency(item.price)}</td>
                    <td className="px-4 py-3 text-quick-silver">⭐ {item.rating}</td>
                    <td className="px-4 py-3">
                      <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border '+(item.isAvailable?'text-green-400 border-green-500/30':'text-red-400 border-red-500/30')}>
                        {item.isAvailable?'Active':'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link to={'/admin/menu/'+item._id+'/edit'}
                          className="p-1.5 text-quick-silver hover:text-gold transition-colors border border-white/10 hover:border-gold">
                          <Edit3 size={13} />
                        </Link>
                        <button onClick={function(){if(confirm('Delete '+item.name+'?')){delItem.mutate(item._id);}}}
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
    </div>
  );
}
