import { useMenuCategories } from '../../hooks/useApi';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

export default function AdminCategories() {
  var result = useMenuCategories();
  var cats   = result.data || [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Categories</h1>
        <Link to="/admin/menu/new" className="btn-grilli-solid inline-flex text-xs px-5 py-2.5">Add Menu Item</Link>
      </div>
      <p className="text-quick-silver text-sm">Categories are auto-generated from menu items. Add items to create categories.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {result.isLoading ? [1,2,3,4].map(function(i){return <div key={i} className="skeleton h-28"/>;}) :
         cats.map(function(cat){
          return (
            <Link key={cat.id} to={'/admin/menu?cat='+cat.id}
              className="bg-eerie-2 border border-white/5 hover:border-gold/40 transition-all p-6 text-center">
              <UtensilsCrossed size={24} className="text-gold mx-auto mb-3"/>
              <p className="font-forum text-white text-xl">{cat.name}</p>
              <p className="text-quick-silver text-xs mt-1">{cat.count} items</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
