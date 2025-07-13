import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

interface PrivateRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const PrivateRoute = ({ 
  children, 
  requireAdmin = false 
}: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== 'admin' && user?.role !== 'vendor') {
    return <Navigate to="/" replace />;
  }

  return children;
};