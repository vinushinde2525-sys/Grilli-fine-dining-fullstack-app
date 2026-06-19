import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center">
      <div className="text-center px-6">
        <ShieldX size={64} className="text-gold mx-auto mb-6 opacity-60" />
        <p className="font-forum text-gold text-2xl mb-2">403</p>
        <h1 className="font-forum text-white text-4xl mb-4">Access Denied</h1>
        <p className="text-quick-silver mb-8">You don't have permission to view this page.</p>
        <Link to="/" className="btn-grilli inline-flex">Go Home</Link>
      </div>
    </div>
  );
}
