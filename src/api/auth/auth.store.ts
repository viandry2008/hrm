import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LoginResponse } from "./auth.types";

type AuthState = {
    user: LoginResponse["data"] | null;
    token: string | null;
    isAuthenticated: boolean;
    isManagement: boolean;
    setAuth: (data: LoginResponse, isManagement?: boolean) => void;
    setManagement: (isManagement: boolean) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isManagement: false,

            setAuth: (data, isManagement = false) => {
                const token = data?.data?.token;
                const user = data?.data;
                const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
                const currentSlug = user?.role?.slug_role?.toLowerCase() || "";
                let managementFlag = isManagement;

                if (managementFlag && (currentSlug === "karyawan" || currentSlug === "employee")) {
                    managementFlag = false;
                }

                if (token) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user_id", String(user?.id));
                    localStorage.setItem("username", user?.username || "");
                    localStorage.setItem("user_name", user?.name || "");
                    localStorage.setItem("user_role", user?.role?.slug_role || "");
                    localStorage.setItem("role", user?.role?.slug_role || "");
                    localStorage.setItem("is_management", String(managementFlag));
                    localStorage.setItem("token_expires", expiresAt.toString());
                }

                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isManagement: managementFlag,
                });
            },

            setManagement: (isManagement) => {
                localStorage.setItem("is_management", String(isManagement));
                set({ isManagement });
            },

            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("username");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_role");
                localStorage.removeItem("role");
                localStorage.removeItem("is_management");
                localStorage.removeItem("token_expires");

                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
