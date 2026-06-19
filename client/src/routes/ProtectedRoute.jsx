import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsAdmin } from '../store/authSlice';

export function ProtectedRoute({ children }) {
  var isAuth   = useSelector(selectIsAuth);
  var location = useLocation();
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

export function AdminRoute({ children }) {
  var isAuth   = useSelector(selectIsAuth);
  var isAdmin  = useSelector(selectIsAdmin);
  var location = useLocation();
  if (!isAuth)  return <Navigate to="/login"        state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/unauthorized" replace />;
  return children;
}
