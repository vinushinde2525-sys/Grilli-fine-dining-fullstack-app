import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/authSlice';
import { useRegister } from '../hooks/useApi';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  var [showPw, setShowPw] = useState(false);
  var isAuth    = useSelector(selectIsAuth);
  var navigate  = useNavigate();
  var register  = useRegister();
  var form      = useForm({ defaultValues: { name: '', email: '', password: '' } });
  var errors    = form.formState.errors;

  useEffect(function() { if (isAuth) navigate('/', { replace: true }); }, [isAuth]);

  var onSubmit = function(data) {
    register.mutate(data, {
      onError: function(err) { toast.error(err.message); },
    });
  };

  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-28">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-forum text-4xl text-white">Grilli<span className="text-gold">.</span></Link>
          <p className="section-subtitle mt-4">Join Us</p>
          <h1 className="section-title text-3xl">Create Account</h1>
        </div>

        <div className="bg-eerie-2 border border-white/5 p-8 lg:p-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                <input {...form.register('name', { required: 'Name required', minLength: { value: 2, message: 'Min 2 chars' } })}
                  placeholder="Full Name" className="grilli-input pl-11" />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                <input {...form.register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                  type="email" placeholder="Email address" className="grilli-input pl-11" />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                <input {...form.register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  type={showPw ? 'text' : 'password'} placeholder="Password (min 6 chars)" className="grilli-input pl-11 pr-11" />
                <button type="button" onClick={function() { setShowPw(!showPw); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-quick-silver hover:text-gold transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={register.isPending} className="btn-grilli-solid w-full justify-center py-4 text-sm inline-flex">
              {register.isPending ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-quick-silver text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:text-white transition-colors font-bold">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
