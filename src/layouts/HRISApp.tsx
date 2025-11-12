import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { Bell, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_CONFIG } from "@/config";
import { useAuthStore } from "@/api/auth/auth.store";
import { useLogout } from "@/api/auth/auth.query";

export const HRISApp = () => {
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* SIDEBAR */}
      <div
        className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out w-64 bg-white shadow-md`}
      >
        <Sidebar
          currentPath={location.pathname.split("/").pop() || ""}
          onLogout={() => logoutMutation.mutate()}
        // onCloseMobileMenu={() => setIsMobileMenuMenuOpen(false)}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-30 bg-white px-4 py-3 shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 size={28} color="#2794eb" />
            <h1 className="font-extrabold text-2xl text-[#2794eb]">
              {APP_CONFIG.companyName}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              className="text-white text-sm rounded-md px-3 py-1.5 hover:opacity-90"
              style={{ backgroundColor: "#2794eb" }}
            >
              Jadwalkan Demo
            </Button>

            <Bell className="w-5 h-5 cursor-pointer text-gray-700" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src="https://randomuser.me/api/portraits/men/19.jpg"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-sm font-medium hidden sm:block text-gray-700">
                    Halo, {user?.name || "Pengguna"}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md mt-2 text-black">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => logoutMutation.mutate()}
                >
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
