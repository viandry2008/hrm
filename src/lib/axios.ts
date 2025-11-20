import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/api/auth/auth.store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Tambahkan token dari localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Jangan logout kalau error dari request login
        const isLoginRequest = originalRequest?.url?.includes("/login");

        const isUnauthorized = error.response?.status === 401;

        // Hanya logout untuk 401 dan tidak untuk login
        if (isUnauthorized && !isLoginRequest) {
            useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    }
);

export default api;
