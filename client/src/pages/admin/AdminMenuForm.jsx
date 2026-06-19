import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { useMenuItem, useCreateMenuItem, useUpdateMenuItem } from '../../hooks/useApi';
import toast from 'react-hot-toast';

var CATS = ['starters','mains','specials','desserts','drinks'];

export default function AdminMenuForm() {
  var { id }  = useParams();
  var isEdit  = !!id && id !== 'new';
  var nav     = useNavigate();
  var existing = useMenuItem(isEdit ? id : null);
  var create  = useCreateMenuItem();
  var update  = useUpdateMenuItem();
  var form    = useForm({ defaultValues: {
    name:'', category:'mains', price:'', description:'', image:'',
    badge:'', isVeg:false, isAvailable:true, isFeatured:false, isPopular:false,
    rating:4.5, prepTime:20,
  }});

  useEffect(function() {
    if (isEdit && existing.data) {
      var d = existing.data;
      form.reset({
        name:d.name||'', category:d.category||'mains', price:d.price||'',
        description:d.description||'', image:d.image||'', badge:d.badge||'',
        isVeg:d.isVeg||false, isAvailable:d.isAvailable!==false, isFeatured:d.isFeatured||false,
        isPopular:d.isPopular||false, rating:d.rating||4.5, prepTime:d.prepTime||20,
      });
    }
  }, [existing.data]);

  var onSubmit = function(data) {
    var payload = Object.assign({}, data, { price: parseFloat(data.price), rating: parseFloat(data.rating), prepTime: parseInt(data.prepTime) });
    var mutation = isEdit ? update : create;
    var args     = isEdit ? Object.assign({ _id: id }, payload) : payload;
    mutation.mutate(args, {
      onSuccess: function() { toast.success(isEdit ? 'Updated!' : 'Created!'); nav('/admin/menu'); },
      onError:   function(e) { toast.error(e.message); },
    });
  };

  if (isEdit && existing.isLoading) return <div className="skeleton h-96" />;

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/admin/menu" className="text-quick-silver hover:text-gold transition-colors"><ArrowLeft size={18} /></Link>
        <h1 className="font-forum text-white text-3xl">{isEdit ? 'Edit Item' : 'New Menu Item'}</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-eerie-2 border border-white/5 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Name *</label>
            <input {...form.register('name',{required:true})} className="grilli-input h-11 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Category *</label>
            <select {...form.register('category')} className="grilli-input h-11 text-sm">
              {CATS.map(function(c){return <option key={c} value={c}>{c}</option>;})}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Price ($) *</label>
            <input {...form.register('price',{required:true})} type="number" step="0.01" className="grilli-input h-11 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Badge</label>
            <input {...form.register('badge')} placeholder="e.g. New, Special" className="grilli-input h-11 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Rating</label>
            <input {...form.register('rating')} type="number" step="0.1" min="0" max="5" className="grilli-input h-11 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Prep Time (min)</label>
            <input {...form.register('prepTime')} type="number" className="grilli-input h-11 text-sm" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Image URL *</label>
          <input {...form.register('image',{required:true})} placeholder="https://..." className="grilli-input h-11 text-sm" />
          {form.watch('image') && <img src={form.watch('image')} className="mt-2 w-24 h-24 object-cover border border-white/10" onError={function(e){e.target.style.display='none';}} />}
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-quick-silver mb-1.5 block">Description *</label>
          <textarea {...form.register('description',{required:true})} rows={3} className="grilli-input h-auto py-3 text-sm resize-none" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[{key:'isAvailable',label:'Available'},{key:'isFeatured',label:'Featured'},{key:'isPopular',label:'Popular'},{key:'isVeg',label:'Vegetarian'}].map(function(f){
            return (
              <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                <input {...form.register(f.key)} type="checkbox" className="accent-gold w-4 h-4" />
                <span className="text-xs text-quick-silver">{f.label}</span>
              </label>
            );
          })}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={create.isPending||update.isPending} className="btn-grilli-solid inline-flex text-xs px-8 py-3">
            {create.isPending||update.isPending ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
          <Link to="/admin/menu" className="btn-grilli inline-flex text-xs px-8 py-3">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
