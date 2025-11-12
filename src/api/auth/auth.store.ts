// src/store/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
                if (token) localStorage.setItem("token", token);
                set({
                    user: data.data,
                    token: token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                localStorage.removeItem("token");
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        { name: "auth-storage" }
    )
);
