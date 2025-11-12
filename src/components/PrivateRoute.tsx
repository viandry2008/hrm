// src/components/PrivateRoute.tsx
import { useAuthStore } from "@/api/auth/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
