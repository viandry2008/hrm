import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LoginResponse } from "./auth.types";

type AuthState = {
    user: LoginResponse["data"] | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (data: LoginResponse) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setAuth: (data) => {
                const token = data?.data?.token;
                const user = data?.data;

                if (token) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("user_id", String(user?.id));
                    localStorage.setItem("username", user?.username || "");
                    localStorage.setItem("user_name", user?.name || "");
                    localStorage.setItem("user_role", user?.role?.slug_role || "");
                }

                set({
                    user,
                    token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
                localStorage.removeItem("username");
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_role");

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
