// src/components/PrivateRoute.tsx
import { useAuthStore } from "@/api/auth/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated, token } = useAuthStore();

  // Prevent blank screen on reload
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
