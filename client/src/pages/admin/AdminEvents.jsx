import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, X } from 'lucide-react';
import { useEvents } from '../../hooks/useApi';
import { contentApi } from '../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminEvents() {
  var [showForm, setShowForm] = useState(false);
  var result = useEvents();
  var events = result.data || [];
  var qc     = useQueryClient();
  var form   = useForm({ defaultValues: { title:'', category:'Dining', date:'', description:'', image:'' }});

  var onSubmit = function(data) {
    contentApi.createEvent(data).then(function(){
      qc.invalidateQueries(['events']); toast.success('Event created'); setShowForm(false); form.reset();
    }).catch(function(e){ toast.error(e.message); });
  };

  var del = function(id) {
    if (!confirm('Delete event?')) return;
    contentApi.deleteEvent(id).then(function(){ qc.invalidateQueries(['events']); toast.success('Deleted'); }).catch(function(e){ toast.error(e.message); });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-forum text-white text-3xl">Events</h1>
        <button onClick={function(){setShowForm(true);}} className="btn-grilli-solid inline-flex text-xs px-5 py-2.5 gap-2">
          <Plus size={14}/> Add Event
        </button>
      </div>

      {showForm && (
        <div className="bg-eerie-2 border border-gold/20 p-6 relative">
          <button onClick={function(){setShowForm(false);}} className="absolute top-4 right-4 text-quick-silver hover:text-gold"><X size={16}/></button>
          <h2 className="font-forum text-white text-xl mb-4">New Event</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label-xs">Title *</label><input {...form.register('title',{required:true})} className="grilli-input h-11 text-sm"/></div>
            <div><label className="label-xs">Category</label><input {...form.register('category')} className="grilli-input h-11 text-sm"/></div>
            <div><label className="label-xs">Date *</label><input {...form.register('date',{required:true})} type="date" className="grilli-input h-11 text-sm"/></div>
            <div><label className="label-xs">Image URL *</label><input {...form.register('image',{required:true})} className="grilli-input h-11 text-sm"/></div>
            <div className="sm:col-span-2"><label className="label-xs">Description</label><textarea {...form.register('description')} rows={2} className="grilli-input h-auto py-3 text-sm resize-none"/></div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="btn-grilli-solid inline-flex text-xs px-6 py-2.5">Create</button>
              <button type="button" onClick={function(){setShowForm(false);}} className="btn-grilli inline-flex text-xs px-6 py-2.5">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.isLoading ? [1,2,3].map(function(i){return <div key={i} className="skeleton aspect-video"/>;}) :
         events.map(function(ev){
          return (
            <div key={ev._id} className="bg-eerie-2 border border-white/5 overflow-hidden group">
              <div className="aspect-video relative overflow-hidden">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <button onClick={function(){del(ev._id);}} className="absolute top-2 right-2 w-7 h-7 bg-black/60 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={13}/>
                </button>
              </div>
              <div className="p-4">
                <p className="text-gold text-[10px] font-bold uppercase tracking-widest">{ev.category} · {formatDate(ev.date)}</p>
                <p className="text-white text-sm font-bold mt-1 line-clamp-2">{ev.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
