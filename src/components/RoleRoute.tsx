import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/api/auth/auth.store";

interface Props {
  allowedRoles: string[];
}

export const RoleRoute = ({ allowedRoles }: Props) => {
  const user = useAuthStore((s) => s.user);
  const isManagement = useAuthStore((s) => s.isManagement);
  const userRole = user?.role?.slug_role || "";
  const effectiveRole = isManagement ? userRole : "KARYAWAN";

  if (!allowedRoles.includes(effectiveRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};