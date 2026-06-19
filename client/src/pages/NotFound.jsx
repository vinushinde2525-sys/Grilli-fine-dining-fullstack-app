import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-eerie-1 flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <p className="font-forum text-gold" style={{ fontSize: '10rem', lineHeight: 1 }}>404</p>
        <h1 className="font-forum text-white text-4xl mb-4">Page Not Found</h1>
        <p className="text-quick-silver mb-10 leading-relaxed">
          This page seems to have left the table early. Let us guide you back to something delicious.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/"    className="btn-grilli inline-flex">Go Home</Link>
          <Link to="/menu" className="btn-grilli-solid inline-flex">View Menu</Link>
        </div>
      </motion.div>
    </div>
  );
}
