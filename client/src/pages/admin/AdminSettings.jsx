import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/authSlice';
import { useUpdateProfile, useChangePassword } from '../../hooks/useApi';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  var user     = useSelector(selectCurrentUser);
  var profile  = useUpdateProfile();
  var password = useChangePassword();
  var pForm    = useForm({ defaultValues: { name: user&&user.name||'', phone: user&&user.phone||'' }});
  var pwForm   = useForm({ defaultValues: { currentPassword:'', newPassword:'' }});

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="font-forum text-white text-3xl">Settings</h1>

      <div className="bg-eerie-2 border border-white/5 p-6">
        <h2 className="font-forum text-white text-xl mb-5">Admin Profile</h2>
        <form onSubmit={pForm.handleSubmit(function(data){ profile.mutate(data, { onError: function(e){ toast.error(e.message); } }); })} className="space-y-4">
          <div><label className="label-xs">Name</label><input {...pForm.register('name')} className="grilli-input h-11 text-sm"/></div>
          <div><label className="label-xs">Phone</label><input {...pForm.register('phone')} className="grilli-input h-11 text-sm"/></div>
          <div className="flex items-center gap-3 py-3 border-y border-white/10">
            <span className="text-quick-silver text-sm">{user&&user.email}</span>
            <span className="text-white/30 text-xs ml-auto">Email cannot be changed</span>
          </div>
          <button type="submit" disabled={profile.isPending} className="btn-grilli-solid inline-flex text-xs px-6 py-2.5">
            {profile.isPending ? 'Saving…' : 'Save Profile'}
          </button>
        </form>
      </div>

      <div className="bg-eerie-2 border border-white/5 p-6">
        <h2 className="font-forum text-white text-xl mb-5">Change Password</h2>
        <form onSubmit={pwForm.handleSubmit(function(data){ password.mutate(data, { onError: function(e){ toast.error(e.message); } }); })} className="space-y-4">
          <div><label className="label-xs">Current Password</label><input {...pwForm.register('currentPassword',{required:true})} type="password" className="grilli-input h-11 text-sm"/></div>
          <div><label className="label-xs">New Password</label><input {...pwForm.register('newPassword',{required:true,minLength:6})} type="password" className="grilli-input h-11 text-sm"/></div>
          <button type="submit" disabled={password.isPending} className="btn-grilli-solid inline-flex text-xs px-6 py-2.5">
            {password.isPending ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="bg-eerie-2 border border-white/5 p-6">
        <h2 className="font-forum text-white text-xl mb-3">Environment Info</h2>
        <div className="space-y-2 text-xs font-mono">
          {[
            ['API',     window.location.origin + '/api'],
            ['Version', '3.0.0'],
            ['Role',    user&&user.role],
          ].map(function(r){ return <div key={r[0]} className="flex gap-4"><span className="text-quick-silver w-20">{r[0]}</span><span className="text-gold">{r[1]}</span></div>; })}
        </div>
      </div>
    </div>
  );
}
