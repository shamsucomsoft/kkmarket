import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: ("user" | "vendor" | "admin")[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && user && !roles.includes(user.role)) {
    // Redirect based on role mismatch
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}