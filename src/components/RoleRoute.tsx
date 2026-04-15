import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/api/auth/auth.store";

interface Props {
  allowedRoles: string[];
}

export const RoleRoute = ({ allowedRoles }: Props) => {
  const user = useAuthStore((s) => s.user);
  const userRole = user?.role?.slug_role || "";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};