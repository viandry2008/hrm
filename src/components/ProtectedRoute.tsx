import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/api/auth/auth.store";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};