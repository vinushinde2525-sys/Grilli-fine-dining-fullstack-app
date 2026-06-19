import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { useForgotPassword, useResetPassword } from '../hooks/useApi';
import toast from 'react-hot-toast';

export function ForgotPasswordPage() {
  var [sent, setSent] = useState(false);
  var mutation = useForgotPassword();
  var form     = useForm({ defaultValues: { email: '' } });

  var onSubmit = function(data) {
    mutation.mutate(data, {
      onSuccess: function() { setSent(true); toast.success('Reset email sent!'); },
      onError:   function(err) { toast.error(err.message); },
    });
  };

  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-28">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-forum text-4xl text-white">Grilli<span className="text-gold">.</span></Link>
          <p className="section-subtitle mt-4">Account Recovery</p>
          <h1 className="section-title text-3xl">Forgot Password</h1>
        </div>

        <div className="bg-eerie-2 border border-white/5 p-8 lg:p-10">
          {sent ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-5">
                <Mail size={28} className="text-gold" />
              </div>
              <p className="font-forum text-white text-2xl mb-3">Check Your Email</p>
              <p className="text-quick-silver text-sm mb-6">We've sent a password reset link to your email address.</p>
              <Link to="/login" className="btn-grilli inline-flex">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <p className="text-quick-silver text-sm">Enter your email and we'll send you a reset link.</p>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                <input {...form.register('email', { required: 'Email required' })}
                  type="email" placeholder="Email address" className="grilli-input pl-11" />
              </div>
              <button type="submit" disabled={mutation.isPending} className="btn-grilli-solid w-full justify-center py-4 text-sm inline-flex">
                {mutation.isPending ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center">
                <Link to="/login" className="text-quick-silver text-sm hover:text-gold transition-colors">Back to Login</Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function ResetPasswordPage() {
  var { token }  = useParams();
  var navigate   = useNavigate();
  var mutation   = useResetPassword();
  var form       = useForm({ defaultValues: { password: '', confirm: '' } });
  var errors     = form.formState.errors;

  var onSubmit = function(data) {
    if (data.password !== data.confirm) { toast.error('Passwords do not match'); return; }
    mutation.mutate({ token, password: data.password }, {
      onSuccess: function() { toast.success('Password reset! Please login.'); navigate('/login'); },
      onError:   function(err) { toast.error(err.message); },
    });
  };

  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-28">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-forum text-4xl text-white">Grilli<span className="text-gold">.</span></Link>
          <p className="section-subtitle mt-4">New Password</p>
          <h1 className="section-title text-3xl">Reset Password</h1>
        </div>
        <div className="bg-eerie-2 border border-white/5 p-8 lg:p-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                <input {...form.register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })}
                  type="password" placeholder="New password" className="grilli-input pl-11" />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver pointer-events-none" />
                <input {...form.register('confirm', { required: 'Please confirm password' })}
                  type="password" placeholder="Confirm new password" className="grilli-input pl-11" />
              </div>
              {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm.message}</p>}
            </div>
            <button type="submit" disabled={mutation.isPending} className="btn-grilli-solid w-full justify-center py-4 text-sm inline-flex">
              {mutation.isPending ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
