import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Star, X } from 'lucide-react';
import { useTestimonials } from '../../hooks/useApi';
import { contentApi } from '../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function AdminTestimonials() {
  var [showForm, setShowForm] = useState(false);
  var result  = useTestimonials();
  var items   = result.data || [];
  var qc      = useQueryClient();
  var form    = useForm({ defaultValues: { name:'', role:'Guest', text:'', rating:5, avatar:'' }});

  var onSubmit = function(data) {
    contentApi.createTestimonial(Object.assign({},data,{rating:parseInt(data.rating)})).then(function(){
      qc.invalidateQueries(['testimonials']); toast.success('Testimonial added'); setShowForm(false); form.reset();
    }).catch(function(e){ toast.error(e.message); });
  };

  var del = function(id) {
    if(!confirm('Delete?')) return;
    contentApi.deleteTestimonial(id).then(function(){ qc.invalidateQueries(['testimonials']); toast.success('Deleted'); }).catch(function(e){ toast.error(e.message); });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Testimonials</h1>
        <button onClick={function(){setShowForm(true);}} className="btn-grilli-solid inline-flex text-xs px-5 py-2.5 gap-2">
          <Plus size={14}/> Add
        </button>
      </div>

      {showForm && (
        <div className="bg-eerie-2 border border-gold/20 p-6 relative">
          <button onClick={function(){setShowForm(false);}} className="absolute top-4 right-4 text-quick-silver hover:text-gold"><X size={16}/></button>
          <h2 className="font-forum text-white text-xl mb-4">New Testimonial</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label-xs">Name *</label><input {...form.register('name',{required:true})} className="grilli-input h-11 text-sm"/></div>
            <div><label className="label-xs">Role</label><input {...form.register('role')} className="grilli-input h-11 text-sm"/></div>
            <div><label className="label-xs">Rating (1-5)</label><input {...form.register('rating')} type="number" min="1" max="5" className="grilli-input h-11 text-sm"/></div>
            <div><label className="label-xs">Avatar URL</label><input {...form.register('avatar')} className="grilli-input h-11 text-sm"/></div>
            <div className="sm:col-span-2"><label className="label-xs">Testimonial Text *</label><textarea {...form.register('text',{required:true})} rows={3} className="grilli-input h-auto py-3 text-sm resize-none"/></div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="btn-grilli-solid inline-flex text-xs px-6 py-2.5">Add</button>
              <button type="button" onClick={function(){setShowForm(false);}} className="btn-grilli inline-flex text-xs px-6 py-2.5">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.isLoading ? [1,2,3].map(function(i){return <div key={i} className="skeleton h-40"/>;}) :
         items.map(function(item){
          return (
            <div key={item._id} className="bg-eerie-2 border border-white/5 p-5 relative group">
              <button onClick={function(){del(item._id);}} className="absolute top-3 right-3 text-red-400/50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14}/>
              </button>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(function(s){return <Star key={s} size={12} className={s<=item.rating?'text-gold fill-gold':'text-white/20'}/>;} )}
              </div>
              <p className="text-quick-silver text-sm leading-relaxed mb-4 line-clamp-3">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                {item.avatar && <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover"/>}
                <div>
                  <p className="text-white text-sm font-bold">{item.name}</p>
                  <p className="text-gold text-[10px] uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
