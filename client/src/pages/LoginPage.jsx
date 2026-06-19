import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectCurrentUser } from '../store/authSlice';
import { useLogin } from '../hooks/useApi';
import toast from 'react-hot-toast';

export default function LoginPage() {
  var [showPw, setShowPw] = useState(false);
  var isAuth   = useSelector(selectIsAuth);
  var user     = useSelector(selectCurrentUser);
  var navigate = useNavigate();
  var location = useLocation();
  var from     = (location.state && location.state.from && location.state.from.pathname) || null;
  var login    = useLogin();
  var form     = useForm({ defaultValues: { email: '', password: '' } });
  var errors   = form.formState.errors;

  // Single source of truth for post-login redirect: only this effect reacts to isAuth.
  // (Removed the duplicate navigate() that used to also fire in onSuccess —
  // two navigate() calls for one login event corrupted the history stack.)
  useEffect(function() {
    if (!isAuth) return;
    if (user && user.role === 'admin') { navigate('/admin/dashboard', { replace: true }); return; }
    navigate(from || '/', { replace: true });
  }, [isAuth]);

  var onSubmit = function(data) {
    login.mutate(data, {
      onError: function(err) { toast.error(err.message); },
    });
  };

  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-28">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link to="/" className="font-forum text-4xl text-white">Grilli<span className="text-gold">.</span></Link>
          <p className="section-subtitle mt-4">Welcome Back</p>
          <h1 className="section-title text-3xl">Sign In</h1>
        </div>

        <div className="bg-eerie-2 border border-white/5 p-8 lg:p-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                <input {...form.register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })}
                  type={showPw ? 'text' : 'password'} placeholder="Password" className="grilli-input pl-11 pr-11" />
                <button type="button" onClick={function() { setShowPw(!showPw); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-quick-silver hover:text-gold transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-quick-silver hover:text-gold transition-colors">Forgot password?</Link>
            </div>

            <button type="submit" disabled={login.isPending} className="btn-grilli-solid w-full justify-center py-4 text-sm inline-flex">
              {login.isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-quick-silver text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            {/* Demo login hint */}
            <div className="bg-gold/5 border border-gold/20 p-3 text-left">
              <p className="text-xs text-gold font-bold mb-1">Demo Admin</p>
              <p className="text-xs text-quick-silver">admin@grilli.com / admin123</p>
            </div>
            <p className="text-quick-silver text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold hover:text-white transition-colors font-bold">Register</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
